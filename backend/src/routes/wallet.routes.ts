import express from "express";
import WalletCtrl from '../controllers/wallet.controller';
import { awaitHandlerFactory } from "../middlewares/awaitHandlerFactory";

const router = express.Router();

// todo: make protected, add validation
router.get("/wallets/", awaitHandlerFactory(WalletCtrl.getWallets));
router.get("/wallets/:wallet_address/historical_balances/", awaitHandlerFactory(WalletCtrl.getHistoricalBalances));
router.get("/wallets/:wallet_address/token/:token_address/historical_balances/", awaitHandlerFactory(WalletCtrl.getHistoricalBalancesPerToken));
router.get("/wallets/:wallet_address/token/:token_address/balance/", awaitHandlerFactory(WalletCtrl.getBalance));
router.get("/wallets/:wallet_address/token/:token_address/price/", awaitHandlerFactory(WalletCtrl.getPrice));

export default router;
