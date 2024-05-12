import { NextFunction, Request, Response } from "express";
import WalletService from "../services/wallet.service";

const getWallets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await WalletService.getWallets();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getBalance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { wallet_address, token_address } = req.params;
    const result = await WalletService.getBalance(
      wallet_address,
      token_address
    );
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getPrice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { wallet_address, token_address } = req.params;
    const result = await WalletService.getPrice(wallet_address, token_address);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getHistoricalBalances = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { wallet_address } = req.params;
    const result = await WalletService.getHistoricalBalances(wallet_address);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getHistoricalBalancesPerToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { wallet_address, token_address } = req.params;
    const result = await WalletService.getHistoricalBalancesPerToken(
      wallet_address,
      token_address
    );
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getWallets,
  getBalance,
  getPrice,
  getHistoricalBalances,
  getHistoricalBalancesPerToken,
};
