import { IMockData } from "../types/IMockData";
// import { DataType, IMockColumn } from "../types/IMockColumn";
import { IColumn } from "@fluentui/react";
import { IColumnConfig } from "../types/IColumnConfig";
// import { columnsConfig } from "../mockData/ColumnConfig";
// import { getTransactions } from "../services/tollingService";
// getTransactions();


const getValueByPath = (obj: IMockData, path: string): unknown => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = path.split(".").reduce((acc, key) => (acc as any)?.[key], obj as any);
    return value;
};

export const mapTransactionsToRows = (columns: IColumn[], transactionData: IMockData[]) => {
    const listRowsData = transactionData.map(function (transactionItem) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newListItem: any = {
            key: transactionItem.transactionId
        };
        for (const column of columns) {
            newListItem[column.key] = getValueByPath(transactionItem, column.data.fieldPath!);
        }

        return newListItem;
    });
    return listRowsData;
};

export const getColumns = (columnsConfig: IColumnConfig[]): IColumn[] => {
    const iColumns: IColumn[] = [];

    for (const columnObj of columnsConfig) {

        const iColumn: IColumn = {
            key: columnObj.key,
            fieldName: columnObj.key,
            name: columnObj.label,
            currentWidth: columnObj.width || 100,
            minWidth: 5,
            maxWidth: 100,
            isResizable: true,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            className: 'detailList-cell',
            headerClassName: 'detailList-gridLabels',
            data: { isPrimary: columnObj.isPrimary, dataType: columnObj.dataType, fieldPath: columnObj.fieldPath },
            isSorted: false,
            onRender: (rowItem, i, col) => {

                if (columnObj.dataType === "date") {
                    const dateValue = new Date(rowItem[columnObj.key]);
                    return dateValue.toLocaleString();
                }

                if (columnObj.dataType === "boolean") {
                    return rowItem[columnObj.key] ? "Yes" : "No";
                }

                return rowItem[columnObj.key];


            }
            // iconName: "Filter",
            // onRender: (item) => item. // Pass additional metadata for use in onRender and sorting
        };


        //set sorting information
        // const isSorted = dataSet?.sorting?.findIndex(s => s.name === column.name) !== -1 || false
        // iColumn.isSorted = isSorted;
        // if (isSorted){
        //     iColumn.isSortedDescending = dataSet?.sorting?.find(s => s.name === column.name)?.sortDirection === 1 || false;
        // }
        iColumn.isSorted = false;
        iColumns.push(iColumn);
    }
    return iColumns;
};
