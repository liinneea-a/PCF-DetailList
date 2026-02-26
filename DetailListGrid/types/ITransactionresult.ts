import { OSBTransaction } from "./IOSBTransactions";

export interface TransactionResult {
  transactions?: OSBTransaction[];
  numberOfTransactions?: number;
}