import { IMockData } from "../types/IMockData";
import { IMockColumn } from "../types/IMockColumn";
import { IColumnLabel } from "../types/IColumnLabel";
import { IColumn } from "@fluentui/react";

export const getItems = (columns: IColumn[], mockData: IMockData[]) => {
    const resultSet = mockData.map(function (item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newRecord: any = {
            key: item.transactionId
        };

        for (const column of columns) {
            newRecord[column.key] = item[column.key as keyof IMockData];
        }

        return newRecord;
    });
    return resultSet;
};

export const getColumns = (columns: IMockColumn[], columnLabels: IColumnLabel): IColumn[] => {
    const iColumns: IColumn[] = [];
    const hasColumnOverrides = Object.keys(columnLabels).length > 0;
    // const columnWidthDistribution = getColumnWidthDistribution(pcfContext);
 
    for (const column of columns) {

        const iColumn: IColumn = {
            key: column.name,
            name: hasColumnOverrides && columnLabels[column.fieldName] ? columnLabels[column.fieldName].label :column.name,
            fieldName: column.fieldName,
            currentWidth: 100,
            minWidth: 5,
            maxWidth: 100,
            isResizable: true,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            className: 'detailList-cell',
            headerClassName: 'detailList-gridLabels',
            data: { isPrimary: column.isPrimary }
        };

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