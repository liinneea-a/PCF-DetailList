
type GridCellValue =
    | string
    | number
    | boolean
    | Date
    | null
    | undefined;

    export type GridRow = {
    key: string;
} & Record<string, GridCellValue>;