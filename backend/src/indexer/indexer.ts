import { Contract, EventLog, formatEther, getAddress } from "ethers";
import { MSG } from "../libs/logMessages";
import priceService from "../services/price.service";
import tokenService from "../services/token.service";
import walletService from "../services/wallet.service";
import { ResponseData } from "../types/ResponseData";
import { abi } from "./abi";
import { provider } from "./rpcProvider";

// Todo:
// check the last updated block and start fetching from there.
// check contract interface if it supports snapshot, fetch balance at given snapshot.
// improve db insertions... batch insert or csv file copy into db

export const startIndexing = async () => {
  try {
    const [{ data: walletAddresses }, { data: tokenAddresses }] =
      await Promise.all<ResponseData>([
        walletService.getWallets(),
        tokenService.getTokens(),
      ]);

    if (!walletAddresses) {
      console.log(MSG.ERROR_ADDRESS_NOT_FOUND("wallet"));
      return;
    }

    if (!tokenAddresses) {
      console.log(MSG.ERROR_ADDRESS_NOT_FOUND("token"));
      return;
    }

    for (const walletAddressRaw of walletAddresses) {
      for (const tokenAddressRaw of tokenAddresses) {
        const walletAddress = getAddress(walletAddressRaw);
        const tokenAddress = getAddress(tokenAddressRaw);

        // if (!isValidChecksumAddress(walletAddress)) {
        //   console.log(MSG.ERROR_INVALID_ADDRESS(walletAddress));
        //   continue;
        // }

        // if (!isValidChecksumAddress(tokenAddress)) {
        //   console.log(MSG.ERROR_INVALID_ADDRESS(tokenAddress));
        //   continue;
        // }

        const contract = new Contract(tokenAddress, abi, provider);
        const events = await contract.queryFilter(contract.filters.Transfer); // in case of a provider limit enter from, to values: e.g 0x0, 0x12eaf27

        let tokenBalance = BigInt(0);
        for (const event of events as EventLog[]) {
          const { from, to, value } = event.args || {};

          if (from !== walletAddress && to !== walletAddress) {
            // console.log(MSG.SKIPPING_IRRELEVANT_EVENTS(tokenAddress));
            continue;
          }

          // Calculate balance changes
          if (from === walletAddress) {
            tokenBalance -= BigInt(value);
          }
          if (to === walletAddress) {
            tokenBalance += BigInt(value);
          }

          // Convert balance to number for calculation
          const tokenBalanceNum = Number(formatEther(tokenBalance));

          // Fetch token price - mocked data
          const price = await priceService.getTokenPriceUsd();
          const tokenValueUsd = tokenBalanceNum * price;

          // Fetch block details
          const blockNumber = event.blockNumber;
          const block = await provider.getBlock(blockNumber);
          const unixTimestamp = block?.timestamp;
          const timestampMillis = unixTimestamp ? unixTimestamp * 1000 : 0;
          const date = new Date(timestampMillis);

          console.log(
            MSG.INSERTING_INDEXED_DATA(
              walletAddress,
              tokenAddress,
              tokenBalance,
              tokenValueUsd,
              blockNumber,
              date.toISOString()
            )
          );

          await walletService.upsertTokenBalance(
            walletAddress,
            tokenAddress,
            tokenBalance,
            tokenValueUsd,
            blockNumber,
            date.toISOString()
          );
        }
      }
    }
  } catch (error) {
    console.log(MSG.ERROR_INDEXING(error));
  }
};
