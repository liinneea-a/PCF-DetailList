import { mockData } from "../mockData/mockData";
import { DateFilterOperator } from "../types/DateFilterOperator";
import { IMockData } from "../types/IMockData";

export class TransactionService {

    constructor(
        private useJsonServer: boolean = true,
        private url: string = "http://localhost:3001/transactions",
        private APIKey: string = "1252803e5e7b4064b02a9326c89e6cd2"
    ) { }

    // Behöver sedan skilja på mockData och rowData. Mockdata = data från api, rowData = data som visas i listan
    public async getTransactions(pageNumber: number, limit: number): Promise<IMockData[]> {
        this.getTransactionFromAPI();

        if (this.useJsonServer) {
            try {
                const url = `${this.url}?_page=${pageNumber}&_limit=${limit}`;

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



        return mockData.filter(item =>
            item[field as keyof typeof item]?.toString().includes(param)
        );
    }

    public async getDateFilteredTransactions(date: Date, operator: DateFilterOperator, col: string): Promise<IMockData[]> {
        if (this.useJsonServer) {
            let queryParam = '';
            console.log(col);

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


    private async getTransactionFromAPI() {
        try {
            const myHeaders = new Headers();

            myHeaders.append("Ocp-Apim-Subscription-Key", this.APIKey);

            const raw = "";

            const requestOptions: RequestInit = {
                method: "GET",
                headers: myHeaders,
                // body: raw,
                redirect: "follow"
            };

            fetch("https://test.integration.oeresundsbron.com/external/test/orepay/tolling/transactiondata/transactions?page=1&pageSize=20", requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log(error));



        } catch (error) {
            console.log("error when fetching from API: ", error);
        }
    }
}
