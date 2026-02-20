import * as React from 'react';
import { IInputs } from "./generated/ManifestTypes";
import { getColumns, mapTransactionsToRows } from './helpers/dataMappingHelper';
import { getUserLanguage } from './helpers/languageHelper';
import { mockColumns, mockData } from './mockData/testData';
import { IColumnLabelOverride } from './types/IColumnLabel';
import { CommandBarButton, ConstrainMode, DetailsListLayoutMode, Dropdown, IColumn, IDetailsHeaderProps, IIconProps, initializeIcons, IObjectWithKey, IRenderFunction, ISearchBoxStyles, ITooltipHostProps, Label, ScrollablePane, ScrollbarVisibility, SearchBox, SelectionMode, ShimmeredDetailsList, Stack, Sticky, StickyPositionType, TooltipHost } from '@fluentui/react';
// import { fetchData, fetchFilterdData } from './dataService';
import { IDropdownFilterableField } from './types/IDropdownFilterableFields';
import { IMockData } from './types/IMockData';

// switch between using mock service or real service
// import { getSearchFilteredTransactions, getTransactions,getDateFilteredTransactions } from './services/tollingService';
// import { getSearchFilteredTransactions, getTransactions, getDateFilteredTransactions } from './services/mockService';

import { Selection } from "@fluentui/react";
import { DataType } from './types/IMockColumn';
import { useBoolean } from '@fluentui/react-hooks';
import { FilterDateCallout } from './components/FilterDateCallout';
import { DateFilterOperator } from './types/DateFilterOperator';
import { TransactionService } from './services/TransactionService';
import { IActiveFilter } from './types/IActiveFilter';
import { useStrings } from './contexts/StringsContext';


export interface IProps {
    pcfContext: ComponentFramework.Context<IInputs>,
    isModelApp: boolean,
    dataSetVersion: number;
    columnLabelOverrides: IColumnLabelOverride;
    dropdownFilterableFields: IDropdownFilterableField[];
    service: TransactionService;
}

interface IPagningState {
    currentPage: number,
    pageSizeLimit: number,
    totalItems: number,
    items: IMockData[],
    isDataLoaded: boolean
}

// interface IColumnWidth {
//     name: string,
//     width: number;
// }

//Initialize the icons otherwise they will not display in a Canvas app.
//They will display in Model app because Microsoft initializes them in their controls.
initializeIcons();

export const DetailListGridControl: React.FC<IProps> = (props) => {
    const strings = useStrings();
    console.log("rendered")

    const [columns, setColumns] = React.useState(getColumns(mockColumns, props.columnLabelOverrides));
    const [items, setItems] = React.useState<IMockData[]>([]);
    const [isDataLoaded, setIsDataLoaded] = React.useState(props.isModelApp);
    // react hook to store the number of selected items in the grid which will be displayed in the grid footer.
    const [selectedItemCount, setSelectedItemCount] = React.useState(0);
    const [selectedDropdownKey, setSelectedDropdownKey] = React.useState("");

    const [calloutAnchor, setCalloutAnchor] = React.useState<HTMLElement | null>(null);
    const [calloutFilterColumn, setCalloutFilterColumn] = React.useState<string>("");
    const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);    

    const [activeFilters, setActiveFilters] = React.useState<IActiveFilter[]>([]);
    const [paging, setPaging] = React.useState<IPagningState>({
        currentPage: 1,
        pageSizeLimit: 11,
        totalItems: 0,
        items: [],
        isDataLoaded: false
    })

    const loadData = async (page: number = 1) => {
        setIsDataLoaded(false);
        setPaging(prev => ({...prev, isDataLoaded: false}));

        const transactions = await props.service.getTransactions(page, paging.pageSizeLimit);

            // const transactions = await props.service.getTransactions();
            if (transactions.length > 0) {
                setItems(mapTransactionsToRows(columns, transactions));
            }
            setIsDataLoaded(true);
        };

    React.useEffect(() => {
        
        loadData();

    }, []);

    // Set the isDataLoaded state based upon the paging totalRecordCount
    // React.useEffect(() => {
    //     const dataSet = props.pcfContext.parameters.sampleDataSet;
    //     if (dataSet.loading || props.isModelApp) return;
    //     setIsDataLoaded(dataSet.paging.totalResultCount !== -1);
    //     // setIsDataLoaded(false);
    // }, [items]);

    // When the component is updated this will determine if the sampleDataSet has changed.  
    // If it has we will go get the udpated items.
    // React.useEffect(() => {
    //     //console.log('TSX: props.dataSetVersion was updated');        
    //     // setItems(getItems(columns, mockData));
    // }, [props.dataSetVersion]);

    // When the component is updated this will determine if the width of the control has changed.
    // If so the column widths will be adjusted.
    // React.useEffect(() => {
    //     //console.log('width was updated');
    //     setColumns(updateColumnWidths(columns, props.pcfContext));
    // }, [props.pcfContext.mode.allocatedWidth]);

    const handleFilterDate = React.useCallback((column: IColumn, anchor: HTMLElement) => {
        setCalloutAnchor(anchor);
        setCalloutFilterColumn(column.key);
        toggleIsCalloutVisible();
    }, [toggleIsCalloutVisible]);

    // when a column header is clicked sort the items
    const onColumnClick = React.useCallback((ev?: React.MouseEvent<HTMLElement>, column?: IColumn): void => {
        if (column?.data.dataType === DataType.Date && ev?.currentTarget) {
            handleFilterDate(column, ev.currentTarget as HTMLElement);
            return;
        }
        let isSortedDescending = column?.isSortedDescending;

        // If we've sorted this column, flip it.
        if (column?.isSorted) {
            isSortedDescending = !isSortedDescending;
        }

        // Reset the items and columns to match the state.
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        setItems(copyAndSort(items, column?.fieldName!, props.pcfContext, isSortedDescending));
        setColumns(
            columns.map(col => {
                col.isSorted = col.key === column?.key;
                col.isSortedDescending = isSortedDescending;
                return col;
            })
        );
    },
        [items, props.pcfContext, handleFilterDate]
    );

    const _onRenderDetailsHeader = (props: IDetailsHeaderProps | undefined, defaultRender?: IRenderFunction<IDetailsHeaderProps>): JSX.Element => {
        return (
            <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
                {defaultRender!({
                    ...props!,
                    onRenderColumnHeaderTooltip: (tooltipHostProps: ITooltipHostProps | undefined) => <TooltipHost {...tooltipHostProps} />
                })}
            </Sticky>
        );
    };

    const handleSearch = async (newValue: string) => {
        if (!selectedDropdownKey) {
            return;
        }

        setIsDataLoaded(false);
        if (selectedDropdownKey === "all" || selectedDropdownKey === "") {
            const allTransactions = await props.service.getTransactions();
            setItems(mapTransactionsToRows(columns, allTransactions));
        } else {
            const filteredTransactions = await props.service.getSearchFilteredTransactions(newValue, selectedDropdownKey);
            setItems(mapTransactionsToRows(columns, filteredTransactions));
        }

        setIsDataLoaded(true);
    };

    // const handleSearchBoxClear = async () => {
    //     setIsDataLoaded(false);
    //     const allTransactions = await props.service.getTransactions();
    //     setItems(mapTransactionsToRows(columns, allTransactions));
    //     setIsDataLoaded(true);
    // };

    React.useEffect(() => {
        setColumns(prevColumns =>
            prevColumns.map(col => ({
                ...col,
                isFiltered: activeFilters.some(f => f.columnKey === col.key)
            }))
        )

    }, [activeFilters]);

    const applyDateFilter = async (date: Date, operator: DateFilterOperator, columnKey: string) => {
        setIsDataLoaded(false);
        const filteredTransactions = await props.service.getDateFilteredTransactions(date, operator, columnKey);
        setItems(mapTransactionsToRows(columns, filteredTransactions));

        setActiveFilters(prevFilters => {
            prevFilters = prevFilters.filter(f => f.columnKey !== columnKey);
            return [
                ...prevFilters,
                {
                    columnKey: columnKey,
                    operator: operator,
                    value: date
                }
            ];
        });


        setIsDataLoaded(true);
    }

    const clearFilters = async () => {
        setIsDataLoaded(false);
        const allTransactions = await props.service.getTransactions();
        setItems(mapTransactionsToRows(columns, allTransactions));
        setActiveFilters([]);
        setIsDataLoaded(true);
    }

    const handleNextPageClick = () => {
        paging.currentPage++;
        loadData(paging.currentPage);
    }
    
    const selection = React.useRef(
        new Selection({
            onSelectionChanged: () => {
                const selected = selection.current.getSelection();
                setSelectedItemCount(selected.length);
            }
        })
    );

    const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };
    const dropdownOptions = props.dropdownFilterableFields.map(field => ({ key: field.key, text: field.text }));


    return (
        <Stack grow
            styles={{
                root: {
                    width: "100%",
                    height: "inherit",
                },
            }}>


            <Stack
                horizontal
                horizontalAlign='end'
                tokens={{
                    childrenGap: 10
                }}
            >
                {isCalloutVisible && calloutAnchor && (
                    <FilterDateCallout
                        anchor={calloutAnchor}
                        onDismiss={() => toggleIsCalloutVisible()}
                        columnKey={calloutFilterColumn}
                        onApplyDateFilter={(date: Date, operator: DateFilterOperator, columnKey: string) => {
                            applyDateFilter(date, operator, columnKey);
                            toggleIsCalloutVisible();
                        }}
                    />
                )}
                {activeFilters.length > 0 && (
                    <CommandBarButton
                        iconProps={{ iconName: 'ClearFilter' }}
                        text={strings.ButtonClearFilters}
                        disabled={false}
                        onClick={clearFilters}
                    />
                )}

                <Dropdown
                    placeholder={strings.DropdownPlaceholder}
                    options={[
                        { key: "all", text: strings.DropdownOptionAll },
                        ...dropdownOptions
                    ]}

                    styles={{
                        root: { width: 150, marginLeft: 10 },
                        title: { textAlign: 'left' }
                    }}
                    onChange={(_, option) => setSelectedDropdownKey(option?.key as string)}
                />
                {/* <Stack.Item> */}
                    <SearchBox
                        styles={searchBoxStyles}
                        // placeholder="Search transactions"
                        placeholder={strings.SearchBoxPlaceholder}
                        onEscape={ev => {
                            console.log('Custom onEscape Called');
                        }}
                        // onClear={() => {setSelectedDropdownKey("") }}
                        onChange={(_, newValue) => console.log('SearchBox onChange fired: ' + newValue)}
                        onSearch={(newValue) => {
                            handleSearch(newValue);
                        }}
                    />
                    {/* <span>*Välj ett fält i dropdownen först</span> */}
                {/* </Stack.Item> */}

            </Stack>

            <Stack.Item
                verticalFill
                styles={{
                    root: {
                        height: "100%",
                        // overflowY: "auto",
                        // overflowX: "scroll",
                    },
                }}
            >
                <div
                    style={{ position: 'relative', height: '100%',  }}>
                    <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
                        <ShimmeredDetailsList
                            enableShimmer={!isDataLoaded}
                            className='list'
                            items={items}
                            columns={columns}
                            setKey="set"
                            // selection={_selection} // updates the dataset so that we can utilize the ribbon buttons in Dynamics                                        
                            onColumnHeaderClick={onColumnClick} // used to implement sorting for the columns.                    
                            selectionPreservedOnEmptyClick={true}
                            ariaLabelForSelectionColumn="Toggle selection"
                            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                            checkButtonAriaLabel="Row checkbox"
                            selectionMode={SelectionMode.multiple}
                            onRenderDetailsHeader={_onRenderDetailsHeader}
                            // layoutMode={DetailsListLayoutMode.justified}
                            layoutMode={DetailsListLayoutMode.fixedColumns}
                            constrainMode={ConstrainMode.unconstrained}
                            selection={selection.current}
                        />
                    </ScrollablePane>
                </div>
            </Stack.Item>
            <Stack.Item 
                align="start"  
                styles={{root: {width: "100%", 
                    // overflow: "hidden"
                }}}
                >
                <div className="detailList-footer">
                    <Label className="detailList-gridLabels">{strings.FooterRecordsLabel}: {items.length.toString()} ({selectedItemCount} {strings.FooterSelected})</Label>
                    <CommandBarButton
                        text={strings.FooterButtonNext}
                        disabled={false}
                        onClick={() => {
                            
                            handleNextPageClick();
                        }}
                    />
                </div>
            </Stack.Item>

            
        </Stack>
    );
};

// navigates to the record when user clicks the link in the grid.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const navigate = (item: any, linkReference: string | undefined, pcfContext: ComponentFramework.Context<IInputs>) => {        
//     pcfContext.parameters.sampleDataSet.openDatasetItem(item[linkReference + "_ref"])
// };


// const getColumnWidthDistribution = (pcfContext: ComponentFramework.Context<IInputs>): IColumnWidth[] => {

//     const widthDistribution: IColumnWidth[] = [];
//     const columnsOnView = pcfContext.parameters.sampleDataSet.columns;

//     // Considering need to remove border & padding length
//     const totalWidth: number = pcfContext.mode.allocatedWidth - 250;
//     //console.log(`new total width: ${totalWidth}`);
//     let widthSum = 0;

//     columnsOnView.forEach(function (columnItem) {
//         widthSum += columnItem.visualSizeFactor;
//     });

//     let remainWidth: number = totalWidth;

//     columnsOnView.forEach(function (item, index) {
//         let widthPerCell = 0;
//         if (index !== columnsOnView.length - 1) {
//             const cellWidth = Math.round((item.visualSizeFactor / widthSum) * totalWidth);
//             remainWidth = remainWidth - cellWidth;
//             widthPerCell = cellWidth;
//         }
//         else {
//             widthPerCell = remainWidth;
//         }
//         widthDistribution.push({ name: item.alias, width: widthPerCell });
//     });

//     return widthDistribution;

// };

// // Updates the column widths based upon the current side of the control on the form.
// const updateColumnWidths = (columns: IColumn[], pcfContext: ComponentFramework.Context<IInputs>): IColumn[] => {
//     const columnWidthDistribution = getColumnWidthDistribution(pcfContext);
//     const currentColumns = columns;

//     //make sure to use map here which returns a new array, otherwise the state/grid will not update.
//     return currentColumns.map(col => {

//         const newMaxWidth = columnWidthDistribution.find(x => x.name === col.fieldName);
//         if (newMaxWidth) col.maxWidth = newMaxWidth.width;

//         return col;
//     });
// };

//sort the items in the grid.
const copyAndSort = <T,>(items: T[], columnKey: string, pcfContext: ComponentFramework.Context<IInputs>, isSortedDescending?: boolean): T[] => {
    const key = columnKey as keyof T;
    const sortedItems = items.slice(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sortedItems.sort((a: T, b: T) => (a[key] || '' as any).toString().localeCompare((b[key] || '' as any).toString(), getUserLanguage(pcfContext), { numeric: true }));

    if (isSortedDescending) {
        sortedItems.reverse();
    }

    return sortedItems;
};


// determine if object is an entity reference.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isEntityReference = (obj: any): obj is ComponentFramework.EntityReference => {
//     return typeof obj?.etn === 'string';
// };