import { ChangeEvent, FC, useState } from "react";
import { SQL_COLUMN_TYPES } from "../../lib/constants";
import Button from "../button";
import Checkbox from "../checkbox";
import Radiobox from "../radiobox";
import TextInput from "../text-input";
import { T_ColObject, T_NewColumn } from ".";

export const NewColumn: FC<T_NewColumn> = ({ buildColumnData, cancel }) => {
    const [colName, setColumnName] = useState("");
    const [colType, setColType] = useState<string>(SQL_COLUMN_TYPES[0].label);

    const [colConstraints, setColConstraints] = useState<
        Record<string, number>
    >({});
    const [colOptions, setColOptions] = useState<Record<string, boolean>>({});

    const colTypeIndex = SQL_COLUMN_TYPES.findIndex(
        (type) => type.label === colType
    );

    const handelColName = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.split(" ").join("_");
        setColumnName(value);
    };

    const handleColType = (e: ChangeEvent<HTMLInputElement>) => {
        setColType(e.target.value);
        setColConstraints({});
        setColOptions({});
    };

    const handleColConstraints = (e: ChangeEvent<HTMLInputElement>) => {
        setColConstraints((prev) => ({
            ...prev,
            [e.target.name]: Number(e.target.value),
        }));
    };

    const handleColOptions = (e: ChangeEvent<HTMLInputElement>) => {
        setColOptions((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked,
        }));
    };

    const handleColumnData = () => {
        const constraints = [
            ...Object.entries(colConstraints),
            ...Object.entries(colOptions),
        ].map(([key, val]) => ({ [key.split(`${colType}-`)[1]]: val }));
        const data: T_ColObject = Object.assign({}, ...constraints, {
            columnName: colName,
            columnType: colType,
        });
        buildColumnData(data);
    };

    return (
        <div className="flex justify-between flex-wrap border-2 border-gray-200 p-5">
            <TextInput
                label="Column name*"
                className="mb-4"
                onChange={handelColName}
            />

            <div>
                <p>Column type*:</p>
                <fieldset className="flex w-[30%] flex-col gap-2">
                    {SQL_COLUMN_TYPES.map((type, index) => (
                        <Radiobox
                            key={type.label}
                            label={type.label}
                            name="sqlTypes"
                            value={type.label}
                            onChange={handleColType}
                            defaultChecked={index === 0}
                        />
                    ))}
                </fieldset>
            </div>

            <div className="flex w-[70%] flex-wrap">
                <fieldset className="flex flex-col w-1/2 gap-1 pr-5">
                    <p>Constraints:</p>
                    {SQL_COLUMN_TYPES[colTypeIndex].contraints.map(
                        (constraint) => (
                            <TextInput
                                key={`${colType}-${constraint}`}
                                type="number"
                                label={constraint}
                                name={`${colType}-${constraint}`}
                                onChange={handleColConstraints}
                            />
                        )
                    )}
                </fieldset>
                <fieldset className="flex flex-col w-1/2 gap-1">
                    <p>Options:</p>
                    {SQL_COLUMN_TYPES[colTypeIndex].options.map((option) => (
                        <Checkbox
                            key={`${colType}-${option}`}
                            label={option}
                            name={`${colType}-${option}`}
                            onChange={handleColOptions}
                        />
                    ))}
                </fieldset>
                <div className="w-full flex justify-end items-center gap-5">
                    <Button onClick={cancel}>⬅️ Cancel</Button>
                    <Button
                        onClick={handleColumnData}
                        disabled={colName.length < 2}
                    >
                        💾 Save
                    </Button>
                </div>
            </div>
        </div>
    );
};
