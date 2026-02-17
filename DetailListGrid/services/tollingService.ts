// import { DateRangeType } from "@fluentui/react";
// import { DateFilterOperator } from "../types/DateFilterOperator";
// import { IMockData } from "../types/IMockData";
// import { start } from "repl";

// const url = "http://localhost:3001/transactions";

// export const getTransactions = async () => {
//     try {
//         const res = await fetch(url);
//         const data = await res.json();

//         if (data && data.length > 0) {
//             return data as IMockData[];
//         } else {
//             return [] as unknown as Promise<IMockData[]>;
//         }



//     } catch (error) {
//         console.error('Error fetching transactions:', error);
//         return [] as IMockData[];
//     }
// };

// export const getSearchFilteredTransactions = async (param: string, field: string) => {
//     try {
//         console.log(`${url}?${field}=${param}`)
//         const res = await fetch(`${url}?${field}_like=${param}`);
//         const data = await res.json();
//         console.log({data})

//         if (data && data.length > 0) {
//             return data as IMockData[];
//         } else {
//             return [];
//         }

//     } catch (error) {
//         console.error('Error fetching filtered transactions:', error);
//         return [] as IMockData[];
//     }
// };

// export const getDateFilteredTransactions = async (date: Date, operator: DateFilterOperator, col: string): Promise<IMockData[]> => {
//     let queryParam = '';
//     console.log(date)
//     let filterDate = new Date(date);
//     filterDate.setHours(0, 0, 0, 0); // Set to the start of the day for accurate filtering

//     switch (operator) {
//         case DateFilterOperator.Date || DateFilterOperator.Today:
//             const endOfDay = new Date(date);
//             endOfDay.setHours(23, 59, 59, 999);

//             queryParam = `${col}_gte=${filterDate.toISOString()}&${col}_lte=${endOfDay.toISOString()}`;
//             break;

//         case DateFilterOperator.On_or_after:
//             queryParam = `${col}_gte=${filterDate.toISOString()}`;
//             break;

//         case DateFilterOperator.On_or_before:
//             filterDate.setHours(23, 59, 59, 999); // Set to the end of the day to include the entire day
//             queryParam = `${col}_lte=${filterDate.toISOString()}`;
//             break;

//         default:
//             console.error('Invalid operator');
//             break;
//     }

//     try {
//         const res = await fetch(`${url}?${queryParam}`);
//         const data = await res.json();
//         console.log({ data });
//         return data;

//     } catch (error) {
//         console.error('Error fetching date filtered transactions:', error);
//         return [] as IMockData[];
//     }
// };