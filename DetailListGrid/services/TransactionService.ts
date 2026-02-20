import { mockData } from "../mockData/testData";
import { DateFilterOperator } from "../types/DateFilterOperator";
import { IMockData } from "../types/IMockData";

export class TransactionService {

    constructor(
        private useJsonServer: boolean = true,
        private url: string = "http://localhost:3001/transactions"
    ) { }

    public async getTransactions(pageNumber: number = 1, limit: number = 10): Promise<IMockData[]> {
        console.log("use mock:", this.useJsonServer)

        if (this.useJsonServer) {
            console.log("using json server")
            try {
                const url = `${this.url}?_page=${pageNumber}&_limit=${limit}`;
                console.log({url});

                // const res = await fetch(this.url);
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
        }
        console.log("using mockdata")
        return mockData;
    }

    public async getSearchFilteredTransactions(param: string, field: string): Promise<IMockData[]> {
        if (this.useJsonServer) {
            try {
                const res = await fetch(`${this.url}?${field}_like=${param}`);
                const data = await res.json();

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
        if (this.useJsonServer) {
            let queryParam = '';

            switch (operator) {
                case DateFilterOperator.Date:
                case DateFilterOperator.Today: {
                    const filterDate = new Date(date);
                    filterDate.setHours(0, 0, 0, 0);
                    const endOfDay = new Date(date);
                    endOfDay.setHours(23, 59, 59, 999);

                    queryParam = `${col}_gte=${filterDate.toISOString()}&${col}_lte=${endOfDay.toISOString()}`;
                    break;
                }
                case DateFilterOperator.On_or_after: {
                    const filterDate = new Date(date);
                    filterDate.setHours(0, 0, 0, 0);
                    queryParam = `${col}_gte=${filterDate.toISOString()}`;
                    break;
                }
                case DateFilterOperator.On_or_before: {
                    const filterDate = new Date(date);
                    filterDate.setHours(23, 59, 59, 999); // Set to the end of the day to include the entire day
                    queryParam = `${col}_lte=${filterDate.toISOString()}`;
                    break;
                }
                default: {
                    console.error('Invalid operator');
                    break;
                }
            }

            try {
                const res = await fetch(`${this.url}?${queryParam}`);
                const data = await res.json();
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
