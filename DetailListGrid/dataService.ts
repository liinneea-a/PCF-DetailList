import { mockData } from "./mockData/testData";
import { IMockData } from "./types/IMockData";

export const fetchData = () => {
    return mockData
}

export const fetchFilterdData = (searchTerm: string, searchEntity: string) => {

    if(searchEntity !== "all") {
        return mockData.filter((item) => item[searchEntity as keyof typeof item]?.toString().includes(searchTerm))
    } else {
        return mockData
    }
    
    //  return mockData.filter(item => item.transactionId.toString().includes(searchTerm))
}