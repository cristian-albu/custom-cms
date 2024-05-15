import { ChangeEvent, FC, useState } from "react";
import Button from "../button";
import NewColumn, { T_ColObject } from "../new-column";
import TextInput from "../text-input";
import { T_NewTableForm } from ".";

export const NewTableForm: FC<T_NewTableForm> = ({ ...htmlAttributes }) => {
    const [tableName, setTableName] = useState("table");
    const [tableData, setTableData] = useState<T_ColObject[]>([]);

    const [showColumnMenu, setShowColumnMenu] = useState(false);

    const getTableName = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.split(" ").join("_");
        setTableName(value);
    };

    const buildColumnData = (colData: T_ColObject) => {
        setTableData((prev) => [...prev, colData]);
        setShowColumnMenu(false);
    };

    console.log(tableData);

    return (
        <form
            className="flex flex-col gap-5 w-full"
            onSubmit={(e) => e.preventDefault()}
            {...htmlAttributes}
        >
            <TextInput
                label="Table name"
                onChange={getTableName}
                defaultValue={tableName}
            />

            <TextInput label="Table id" value={`${tableName}_id`} disabled />

            {tableData.map((column, index) => {
                const { columnName, columnType, ...rest } = column;

                const valString = Object.entries(rest)
                    .map(([key, val]) => `${key}:${val}`)
                    .join("   ");

                const removeFromTableData = () => {
                    const newData = [...tableData];
                    newData.splice(index, 1);
                    setTableData(newData);
                };
                return (
                    <div
                        className="flex items-end justify-end gap-5"
                        key={columnName}
                    >
                        <TextInput
                            label={columnName}
                            value={`${columnType}   ${valString}`}
                            disabled
                        />
                        <Button btnOutline onClick={removeFromTableData}>
                            ❌
                        </Button>
                    </div>
                );
            })}

            {showColumnMenu ? (
                <NewColumn
                    buildColumnData={buildColumnData}
                    cancel={() => setShowColumnMenu(false)}
                />
            ) : (
                <Button onClick={() => setShowColumnMenu(true)} btnOutline>
                    🏛️ Add column
                </Button>
            )}

            <Button>📃 Create table</Button>
        </form>
    );
};
