import { mockData } from "../mockData/testData";
import { IMockData } from "../types/IMockData";


export const getTransactions = async () => {
    try {
        console.log('Fetching transactions from mock service...');
        return mockData
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [] as IMockData[];
    }
};
export const getFilteredTransactions = async (param: string, field: string) => {
    try {
        console.log(`Fetching filtered transactions from mock service with param: ${param} and field: ${field}...`);
     return mockData.filter((item) => item[field as keyof typeof item]?.toString().includes(param))

    } catch (error) {
        console.error('Error fetching filtered transactions:', error);
        return [] as IMockData[];
    }
};