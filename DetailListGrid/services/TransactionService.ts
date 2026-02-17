import { mockData } from "../mockData/testData";
import { DateFilterOperator } from "../types/DateFilterOperator";
import { IMockData } from "../types/IMockData";

export class TransactionService {

    constructor(
        private useMock: boolean = true,
        private url: string = "http://localhost:3001/transactions"
    ) { }

    public async getTransactions(): Promise<IMockData[]> {
        if (!this.useMock) {
            try {
                const res = await fetch(this.url);
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
        }

        console.log("TransactionService: getTransactions");
        return mockData;
    }

    public async getSearchFilteredTransactions(param: string, field: string): Promise<IMockData[]> {
        if (!this.useMock) {
            try {
                console.log(`${this.url}?${field}=${param}`);
                const res = await fetch(`${this.url}?${field}_like=${param}`);
                const data = await res.json();
                console.log({ data });

                if (data && data.length > 0) {
                    return data as IMockData[];
                } else {
                    return [];
                }

            } catch (error) {
                console.error('Error fetching filtered transactions:', error);
                return [] as IMockData[];
            }
        }



        console.log(`TransactionService: getSearchFilteredTransactions param=${param}, field=${field}`);
        return mockData.filter(item =>
            item[field as keyof typeof item]?.toString().includes(param)
        );
    }

    public async getDateFilteredTransactions(date: Date, operator: DateFilterOperator, col: string): Promise<IMockData[]> {
        if (!this.useMock) {
            let queryParam = '';
            console.log(date);
            let filterDate = new Date(date);
            filterDate.setHours(0, 0, 0, 0); // Set to the start of the day for accurate filtering

            switch (operator) {
                case DateFilterOperator.Date:
                case DateFilterOperator.Today: 
                    const endOfDay = new Date(date);
                    endOfDay.setHours(23, 59, 59, 999);

                    queryParam = `${col}_gte=${filterDate.toISOString()}&${col}_lte=${endOfDay.toISOString()}`;
                    break;

                case DateFilterOperator.On_or_after:
                    queryParam = `${col}_gte=${filterDate.toISOString()}`;
                    break;

                case DateFilterOperator.On_or_before:
                    filterDate.setHours(23, 59, 59, 999); // Set to the end of the day to include the entire day
                    queryParam = `${col}_lte=${filterDate.toISOString()}`;
                    break;

                default:
                    console.error('Invalid operator');
                    break;
            }

            try {
                const res = await fetch(`${this.url}?${queryParam}`);
                const data = await res.json();
                console.log({ data });
                return data;

            } catch (error) {
                console.error('Error fetching date filtered transactions:', error);
                return [] as IMockData[];
            }
        }



        console.log(`TransactionService: getDateFilteredTransactions date=${date.toISOString()}, operator=${operator}, col=${col}`);

        const filterDate = new Date(date);
        filterDate.setHours(0, 0, 0, 0);

        return mockData.filter(item => {
            const itemDate = new Date(item[col as keyof typeof item] as string);
            if (isNaN(itemDate.getTime())) return false;

            switch (operator) {
                case DateFilterOperator.Date:
                case DateFilterOperator.Today: {
                    const endOfDay = new Date(filterDate);
                    endOfDay.setHours(23, 59, 59, 999);
                    return itemDate >= filterDate && itemDate <= endOfDay;
                }
                case DateFilterOperator.On_or_after:
                    return itemDate >= filterDate;
                case DateFilterOperator.On_or_before: {
                    const endOfDay = new Date(filterDate);
                    endOfDay.setHours(23, 59, 59, 999);
                    return itemDate <= endOfDay;
                }
                default:
                    return false;
            }
        });
    }
}
