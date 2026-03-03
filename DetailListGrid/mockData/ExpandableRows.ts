import { IExpandableRowsConfig } from "../types/IColumnConfig";

export const expandableRowsConfig: IExpandableRowsConfig[] = [
    {
        key: "lpnFromTss",
        title: "LPN From TSS",
        type: "fields",
        fields: [
            {
                label: "Front",
                fieldPath: "lpnFromTss.front.number",
                dataType: "string"
            },
            {
                label: "Front Country",
                fieldPath: "lpnFromTss.front.countryCode",
                dataType: "string"
            },
            {
                label: "Rear",
                fieldPath: "lpnFromTss.rear.number",
                dataType: "string"
            },
            {
                label: "Rear Country",
                fieldPath: "lpnFromTss.rear.countryCode",
                dataType: "string"
            },
            {
                label: "Manual",
                fieldPath: "lpnFromTss.manual.number",
                dataType: "string"
            },
            {
                label: "Manual Country",
                fieldPath: "lpnFromTss.manual.countryCode",
                dataType: "string"
            },
        ]
    },
    {
        key: "price",
        title: "Price Details",
        type: "fields",
        fields: [
            {
                label: "Amount without VAT",
                fieldPath: "price.amountWithoutVAT",
                dataType: "number"
            },
            {
                label: "VAT",
                fieldPath: "price.vat",
                dataType: "number"
            },
            {
                label: "Amount with VAT",
                fieldPath: "price.amountWithVAT",
                dataType: "number"
            },
            {
                label: "Currency",
                fieldPath: "price.currency",
                dataType: "currency"
            },
        ]
    }
];