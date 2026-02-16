import { IMockData } from "../types/IMockData";
import { DataType, IMockColumn } from "../types/IMockColumn";
import { IColumnLabelOverride } from "../types/IColumnLabel";
import { IColumn } from "@fluentui/react";
// import { getTransactions } from "../services/tollingService";
// getTransactions();

export const mapTransactionsToRows = (columns: IColumn[], data: IMockData[]) => {
    const resultSet = data.map(function (item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newRecord: any = {
            key: item.transactionId
        };

        for (const column of columns) {
            // let value = item[column.key as keyof IMockData];

            //  if(column.data && column.data.dataType === DataType.Date){
            //     value = new Date(item[column.key as keyof IMockData] as string).toLocaleString();
            // }

            newRecord[column.key] = item[column.key as keyof IMockData];
            // newRecord[column.key] = value;
        }

        return newRecord;
    });
    return resultSet;
};

export const getColumns = (columns: IMockColumn[], columnLabelOverrides: IColumnLabelOverride): IColumn[] => {
    const iColumns: IColumn[] = [];
    const hasColumnOverrides = Object.keys(columnLabelOverrides).length > 0;
    // const columnWidthDistribution = getColumnWidthDistribution(pcfContext);
 
    for (const column of columns) {
        
        const iColumn: IColumn = {
            key: column.name,
            name: hasColumnOverrides && columnLabelOverrides[column.fieldName] ? columnLabelOverrides[column.fieldName].label : column.name,
            fieldName: column.fieldName,
            currentWidth: 100,
            minWidth: 5,
            maxWidth: 100,
            isResizable: true,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            className: 'detailList-cell',
            headerClassName: 'detailList-gridLabels',
            data: { isPrimary: column.isPrimary, dataType: column.dataType },
            // onRender: (item) => item. // Pass additional metadata for use in onRender and sorting
        };

        // If column contains date data, format it in the grid.
        if (column.dataType === DataType.Date) {
            iColumn.onRender = (item: any, i: any, col: any) => {
                const value = item[col.fieldName];
                if(!value) {return}

                return new Date(value).toLocaleString();
            };
        }

        // //create links for primary field and entity reference.            
        // if (column.dataType.startsWith('Lookup.') || column.isPrimary)
        // {
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //     iColumn.onRender = (item: any, index: number | undefined, column: IColumn | undefined)=> (                                    
        //         <Link key={item.key} onClick={() => navigate(item, column!.fieldName, pcfContext) }>{item[column!.fieldName!]}</Link>                    
        //     );
        // }
        // else if(column.dataType === 'SingleLine.Email'){
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //     iColumn.onRender = (item: any, index: number | undefined, column: IColumn | undefined)=> (                                    
        //         <Link href={`mailto:${item[column!.fieldName!]}`} >{item[column!.fieldName!]}</Link>  
        //     );
        // }
        // else if(column.dataType === 'SingleLine.Phone'){
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //     iColumn.onRender = (item: any, index: number | undefined, column: IColumn | undefined)=> (                                    
        //         <Link href={`skype:${item[column!.fieldName!]}?call`} >{item[column!.fieldName!]}</Link>                    
        //     );
        // }

        //set sorting information
        // console.log(dataSet.sorting)
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