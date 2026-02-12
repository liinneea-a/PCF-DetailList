// enum TransactionTypes {
//     Toll = "toll",
//     TollCredit = "tollCredit",
//     ServiceFee = "serviceFee",
// }

// enum PassageType {
//     FreePassage = "FreePassage"
// }

interface ILpn {
    number: string,
    countryCode: string
}

interface IPrice {
    amountWithoutVAT: number,
    amountWithVAT: number,
    vat: number,
    currency: string;
}

export interface IMockData {
    transactionId: number,
    transactionDateTime: string,
    passageReportId: number,
    tollEventTime: string,
    laneNumber: number,
    vehicleClass: number,
    localAgreementNumber: string,
    customerNumber: string,
    transactionType: string,
    lpn: ILpn,
    personalAccountNumber: string,
    iTicketId: number | null,
    lpnFromTss: {
      front: ILpn | null,
      rear: ILpn | null,
      manual: ILpn | null
    },
    price: IPrice,
    credited: boolean,
    passageType: string,
    billingDetailsAdu: number,
    paymentClaimReferense: string,
    informationRecipientId: string
}