export type ColumnDataType = 
    | "string"
    | "number"
    | "date"
    | "currency"
    | "boolean"

export interface IColumnConfig {
    key: string;
    fieldPath: string;
    label: string;
    dataType: ColumnDataType;
    isPrimary?: boolean;
    sortable?: boolean;
    width?: number;
}

interface IDetailFieldConfig {
  label: string;
  fieldPath: string;
  dataType: ColumnDataType;
}
    
export interface IExpandableRowsConfig {
  key: string;
  title: string;
  type: "fields" | "custom";
  fields?: IDetailFieldConfig[];
}