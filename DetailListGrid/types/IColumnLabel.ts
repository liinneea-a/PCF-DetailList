// export interface IColumnLabel {
//     key: string,
//     label: string
// }

export interface IColumnLabel {
    [key: string]: {
        label: string
    }
}