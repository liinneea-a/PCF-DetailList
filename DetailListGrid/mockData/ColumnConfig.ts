import { IColumnConfig } from "../types/IColumnConfig";

export const columnsConfig: IColumnConfig[]  = [
    {
        key: "transactionId",
        fieldPath: "transactionId",
        label: "Transaction ID",
        dataType: "number",
        isPrimary: true,
        sortable: false,
        width: 100
    },
    {
        key: "transactionDateTime",
        fieldPath: "transactionDateTime",
        label: "Transaction Date",
        dataType: "date",
        isPrimary: false,
        sortable: true,
        width: 100
    },
    {
        key: "passageReportId",
        fieldPath: "passageReportId",
        label: "Passage Report ID",
        dataType: "string",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "tollEventTime",
        fieldPath: "tollEventTime",
        label: "Toll Event Time",
        dataType: "date",
        isPrimary: false,
        sortable: true,
        width: 100
    },
    {
        key: "laneNumber",
        fieldPath: "laneNumber",
        label: "Lane Number",
        dataType: "string",
        isPrimary: false,
        sortable: true,
        width: 100
    },
    {
        key: "vehicleClass",
        fieldPath: "vehicleClass",
        label: "Vehicle Class",
        dataType: "string",
        isPrimary: false,
        sortable: true,
        width: 100
    },
    {
        key: "localAgreementNumber",
        fieldPath: "localAgreementNumber",
        label: "Local Agreement Number",
        dataType: "string",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "customerNumber",
        fieldPath: "customerNumber",
        label: "Customer Number",
        dataType: "string",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "transactionType",
        fieldPath: "transactionType",
        label: "Transaction Type",
        dataType: "string",
        isPrimary: false,
        sortable: true,
        width: 100
    },
    {
        key: "lpnNumber",
        fieldPath: "lpn.number",
        label: "LPN Number",
        dataType: "string",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "lpnCountry",
        fieldPath: "lpn.countryCode",
        label: "LPN Country code",
        dataType: "string",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "personalAccountNumber",
        fieldPath: "personalAccountNumber",
        label: "Personal Account Number",
        dataType: "string",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "iTicketId",
        fieldPath: "iTicketId",
        label: "iTicket ID",
        dataType: "number",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "credited",
        fieldPath: "credited",
        label: "Credited",
        dataType: "boolean",
        isPrimary: false,
        sortable: true,
        width: 100
    },
    {
        key: "PassageTypeFriendlyName",
        fieldPath: "PassageTypeFriendlyName",
        label: "Passage Type",
        dataType: "string",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "billingDetailsAdu",
        fieldPath: "billingDetailsAdu",
        label: "Billing Details Adu",
        dataType: "number",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "paymentClaimReference",
        fieldPath: "paymentClaimReference",
        label: "Payment Claim Reference",
        dataType: "string",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "InformationrecipientIdFriendlyName",
        fieldPath: "InformationrecipientIdFriendlyName",
        label: "Information Recipient",
        dataType: "string",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "posReceiptId",
        fieldPath: "posReceiptId",
        label: "POS Receipt ID",
        dataType: "string",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "reasonCodeFriendlyName",
        fieldPath: "reasonCodeFriendlyName",
        label: "Reason Code",
        dataType: "string",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "internalRemark",
        fieldPath: "internalRemark",
        label: "Internal Remark",
        dataType: "string",
        isPrimary: false,
        sortable: false,
        width: 100
    },
    {
        key: "invoiceText",
        fieldPath: "invoiceText",
        label: "Invoice Text",
        dataType: "string",
        isPrimary: false,
        sortable: false,
        width: 100
    },
];