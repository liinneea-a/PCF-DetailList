import { IMockData } from "../types/IMockData";

const url = "http://localhost:3001/transactions";

export const getTransactions = async () => {
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data && data.length > 0) {
            return data as IMockData[];
        } else {
            return [] as unknown as Promise<IMockData[]>;
        }



    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [] as IMockData[];
    }
};

export const getFilteredTransactions = async (param: string, field: string) => {
    try {
        console.log(`${url}?${field}=${param}`)
        const res = await fetch(`${url}?${field}_like=${param}`);
        const data = await res.json();
        console.log({data})

        if (data && data.length > 0) {
            return data as IMockData[];
        } else {
            return [];
        }

    } catch (error) {
        console.error('Error fetching filtered transactions:', error);
        return [] as IMockData[];
    }
};