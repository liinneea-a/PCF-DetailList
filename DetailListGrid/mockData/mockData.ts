import { DataType, IMockColumn } from "../types/IMockColumn";
import { IMockData } from "../types/IMockData";

// Uppdaterad med friendly names
export const mockData: IMockData[] = [
  {
    transactionId: 400001,
    transactionDateTime: "2026-03-01T07:10:00Z",
    passageReportId: 990001,
    tollEventTime: "2026-03-01T07:09:40Z",
    laneNumber: 1,
    vehicleClass: 1,
    localAgreementNumber: "LA-2026-0001",
    customerNumber: "CUST-300001",
    transactionType: "toll",
    lpn: { number: "SE100AA", countryCode: "SE" },
    personalAccountNumber: "PAN-40000001",
    iTicketId: null,
    lpnFromTss: {
      front: { number: "SE100AA", countryCode: "SE" },
      rear: null,
      manual: null
    },
    price: { amountWithoutVAT: 20, amountWithVAT: 25, vat: 25, currency: "SEK" },
    credited: false,
    passageType: "Normal",
    PassageTypeFriendlyName: "Normal passage",
    billingDetailsAdu: 800001,
    paymentClaimReference: "PCR-300001",
    informationRecipientId: "A5001",
    InformationrecipientIdFriendlyName: "Stockholm Toll",
    posReceiptId: "POS-001",
    reasonCode: "RC01",
    reasonCodeFriendlyName: "Standard toll",
    internalRemark: "",
    invoiceText: "Congestion tax Stockholm"
  },

  {
    transactionId: 400002,
    transactionDateTime: "2026-03-01T08:15:00Z",
    passageReportId: 990002,
    tollEventTime: "2026-03-01T08:14:45Z",
    laneNumber: 2,
    vehicleClass: 2,
    localAgreementNumber: "LA-2026-0002",
    customerNumber: "CUST-300002",
    transactionType: "toll",
    lpn: { number: "NO200BB", countryCode: "NO" },
    personalAccountNumber: "PAN-40000002",
    iTicketId: null,
    lpnFromTss: {
      front: { number: "NO200BB", countryCode: "NO" },
      rear: { number: "NO200BB", countryCode: "NO" },
      manual: null
    },
    price: { amountWithoutVAT: 28, amountWithVAT: 35, vat: 25, currency: "SEK" },
    credited: false,
    passageType: "FreePassage",
    PassageTypeFriendlyName: "Free passage",
    billingDetailsAdu: 800002,
    paymentClaimReference: "PCR-300002",
    informationRecipientId: "A5002",
    InformationrecipientIdFriendlyName: "Gothenburg Toll",
    posReceiptId: "POS-002",
    reasonCode: "RC02",
    reasonCodeFriendlyName: "Peak hour toll",
    internalRemark: "",
    invoiceText: "Congestion tax Gothenburg"
  },

  {
    transactionId: 400003,
    transactionDateTime: "2026-03-02T09:20:00Z",
    passageReportId: 990003,
    tollEventTime: "2026-03-02T09:19:50Z",
    laneNumber: 3,
    vehicleClass: 3,
    localAgreementNumber: "LA-2026-0003",
    customerNumber: "CUST-300003",
    transactionType: "serviceFee",
    lpn: { number: "DK300CC", countryCode: "DK" },
    personalAccountNumber: "PAN-40000003",
    iTicketId: 7000003,
    lpnFromTss: {
      front: { number: "DK300CC", countryCode: "DK" },
      rear: null,
      manual: null
    },
    price: { amountWithoutVAT: 16, amountWithVAT: 20, vat: 25, currency: "SEK" },
    credited: true,
    passageType: "Voucher",
    PassageTypeFriendlyName: "Voucher passage",
    billingDetailsAdu: 800003,
    paymentClaimReference: "PCR-300003",
    informationRecipientId: "A5003",
    InformationrecipientIdFriendlyName: "Malmö Toll",
    posReceiptId: "POS-003",
    reasonCode: "RC03",
    reasonCodeFriendlyName: "Service adjustment",
    internalRemark: "Manual correction",
    invoiceText: "Service fee adjustment"
  },

  // ---- 4–20 (variation men samma struktur) ----

  ...Array.from({ length: 17 }, (_, i) => {
    const id = 400004 + i;
    const idx = i + 4;
    return {
      transactionId: id,
      transactionDateTime: `2026-03-${String((i % 10) + 3).padStart(2,"0")}T10:00:00Z`,
      passageReportId: 990004 + i,
      tollEventTime: `2026-03-${String((i % 10) + 3).padStart(2,"0")}T09:59:40Z`,
      laneNumber: (i % 5) + 1,
      vehicleClass: (i % 4) + 1,
      localAgreementNumber: `LA-2026-00${idx}`,
      customerNumber: `CUST-3000${idx}`,
      transactionType: i % 3 === 0 ? "serviceFee" : "toll",
      lpn: { number: `EU${idx}XX`, countryCode: ["SE","NO","DK","FI","DE"][i%5] },
      personalAccountNumber: `PAN-400000${idx}`,
      iTicketId: i % 3 === 0 ? 7000000 + idx : null,
      lpnFromTss: {
        front: { number: `EU${idx}XX`, countryCode: ["SE","NO","DK","FI","DE"][i%5] },
        rear: i % 2 === 0 ? null : { number: `EU${idx}XX`, countryCode: ["SE","NO","DK","FI","DE"][i%5] },
        manual: null
      },
      price: {
        amountWithoutVAT: 20 + (i % 5) * 4,
        amountWithVAT: (20 + (i % 5) * 4) * 1.25,
        vat: 25,
        currency: "SEK"
      },
      credited: i % 3 === 0,
      passageType: ["Normal","FreePassage","Voucher"][i%3],
      PassageTypeFriendlyName: ["Normal passage","Free passage","Voucher passage"][i%3],
      billingDetailsAdu: 800004 + i,
      paymentClaimReference: `PCR-3000${idx}`,
      informationRecipientId: `A50${i%5}X`,
      InformationrecipientIdFriendlyName: ["Stockholm Toll","Gothenburg Toll","Malmö Toll","Oslo Toll","Berlin Toll"][i%5],
      posReceiptId: `POS-00${idx}`,
      reasonCode: `RC0${(i%5)+1}`,
      reasonCodeFriendlyName: ["Standard toll","Peak hour","Manual review","Vehicle class adj.","Service correction"][i%5],
      internalRemark: i % 4 === 0 ? "Reviewed manually" : "",
      invoiceText: "Toll transaction"
    };
  })
];