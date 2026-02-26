
export interface Lpn {
  number?: string;
  countryCode?: string;
}

export interface Price {
  amountWithoutVAT?: number;
  amountWithVAT?: number;
  vat?: number;
  currency?: string;
}

export interface LpnFromTss {
  front?: Lpn;
  rear?: Lpn;
  manual?: Lpn;
}

export interface OSBTransaction {
  transactionId?: number;
  transactionDateTime?: string; // date-time
  passageReportId?: number;
  tollEventTime?: string; // date-time
  laneNumber?: number;
  vehicleClass?: number;
  localAgreementNumber?: string;
  customerNumber?: string;
  transactionType?: string;

  lpn?: Lpn;
  personalAccountNumber?: string;
  iTicketId?: number;

  lpnFromTss?: LpnFromTss;
  price?: Price;

  credited?: boolean;
  passageType?: string;
  PassageTypeFriendlyName?: string;

  billingDetailsAdu?: number;
  paymentClaimReference?: string;
  informationRecipientId?: string;
  InformationrecipientIdFriendlyName?: string;
  posReceiptId?: string;
  reasonCode?: string;
  reasonCodeFriendlyName?: string;
  internalRemark?: string;
  inoiceText?: string;
}