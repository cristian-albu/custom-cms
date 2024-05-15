import { NewColumn } from "./NewColumn";

export type T_ColObject = { columnType: string; columnName: string } & Record<
    string,
    string | number | boolean
>;

export type T_NewColumn = {
    buildColumnData: (data: T_ColObject) => void;
    cancel?: () => void;
};

export default NewColumn;
