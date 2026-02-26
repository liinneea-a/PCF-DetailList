export type PassageType =
  | "NotSet"
  | "PosCardOrCash"
  | "FreePassage"
  | "EvacuationOpening"
  | "OnlineTicket"
  | "Voucher"
  | "LocalAgreement_PeriodCard"
  | "LocalAgreement_BIZZ"
  | "LocalAgreement_Lpn"
  | "IssuerAgreement_BIZZ"
  | "IssuerAgreement_Lpn"
  | "NoAgreement_TailGating"
  | "NoAgreement_FreeFlow"
  | "NoAgreement_Other";

export interface ITransactionQuery {
  transactionTimeFrom?: string; // date-time
  transactionTimeTo?: string;   // date-time
  lpn?: string;
  lpnCountryCode?: string;
  personalAccountNumber?: string;
  paymentClaimReference?: string;
  localAgreementNo?: string;
  customerNumber?: string;
  credited?: boolean;
  passageType?: PassageType;
  informationRecipientId?: string;
  iTicketId?: number;
  posReceiptId?: number;
  page: number;
  pageSize: number;
  sortOrder?: string;
}

// const query: TransactionQuery = {
//   transactionTimeFrom: "2026-01-01T00:00:00Z",
//   transactionTimeTo: "2026-01-31T23:59:59Z",
//   customerNumber: "12345",
//   page: 0,
//   pageSize: 50
// };

// await api.getTransactions(query);