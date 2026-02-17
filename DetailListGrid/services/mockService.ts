// import { mockData } from "../mockData/testData";
// import { DateFilterOperator } from "../types/DateFilterOperator";
// import { IMockData } from "../types/IMockData";


// export const getTransactions = async () => {
//     console.log("mockservice");

//     try {
//         return mockData;
//     } catch (error) {
//         console.error('Error fetching transactions:', error);
//         return [] as IMockData[];
//     }
// };

// export const getSearchFilteredTransactions = async (param: string, field: string) => {
//     console.log("mockservice");

//     try {
//         console.log(`Fetching filtered transactions from mock service with param: ${param} and field: ${field}...`);
//         return mockData.filter((item) => item[field as keyof typeof item]?.toString().includes(param));

//     } catch (error) {
//         console.error('Error fetching filtered transactions:', error);
//         return [] as IMockData[];
//     }
// };

// export const getDateFilteredTransactions = async (date: Date, operator: DateFilterOperator, col: string): Promise<IMockData[]> => {
//     console.log("mockservice");

//     let filterDate = new Date(date);
//     filterDate.setHours(0, 0, 0, 0); // Set to the start of the day for accurate filtering

//     try {
//         return mockData.filter((item) => {
//             const itemDate = new Date(item[col as keyof typeof item] as string);

//             if (isNaN(itemDate.getTime())) {
//                 return false;
//             }
//             switch (operator) {
//                 case DateFilterOperator.Date:
//                 case DateFilterOperator.Today:
//                     const endOfDay = new Date(filterDate);
//                     endOfDay.setHours(23, 59, 59, 999);
//                     return itemDate >= filterDate && itemDate <= endOfDay;

//                 case DateFilterOperator.On_or_after:
//                     return itemDate >= filterDate;

//                 case DateFilterOperator.On_or_before:
//                     const beforeEndOfDay = new Date(filterDate);
//                     beforeEndOfDay.setHours(23, 59, 59, 999);
//                     return itemDate <= beforeEndOfDay;

//                 default:
//                     return false;
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching date filtered transactions:', error);
//         return [] as IMockData[];
//     }
// };