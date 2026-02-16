export enum DataType {
    String = "string",
    Number = "number",
    Date = "date",
    Boolean = "bool"
}

export interface IMockColumn {
    name: string,
    fieldName: string,
    currentWidth: number,
    isPrimary: boolean;
    dataType: DataType, // Optional property to specify the data type of the column (e.g., "date", "bool", etc.)
}