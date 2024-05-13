import { ChangeEvent, FormEvent, InputHTMLAttributes, useState } from "react";

const COLUMN_TYPES = [
    {
        label: "VARCHAR",
        contraints: ["min", "max"],
        options: ["unique", "not-null"],
    },
    {
        label: "INTEGER",
        contraints: ["min", "max"],
        options: ["not-null"],
    },
    {
        label: "BOOLEAN",
        contraints: [],
        options: ["default"],
    },
    {
        label: "JSON",
        contraints: ["min", "max"],
        options: ["not-null"],
    },
];

const TextInput = ({
    label,
    type,
    ...htmlAttributes
}: {
    label: string;
    type?: "text" | "number";
} & InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className="w-full">
            <label htmlFor="" className="w-full">
                <div>{label}</div>
                <input
                    type={type || "text"}
                    className="w-full border-2 border-black"
                    {...htmlAttributes}
                />
            </label>
        </div>
    );
};

const App = () => {
    //     const [columns, setColumns] = useState([]);

    const [colTypeIndex, setColTypeIndex] = useState(0);

    const [queryString, setQueryString] = useState("");

    const handleColType = (e: ChangeEvent<HTMLFormElement>) => {
        if (e.target.name === "colType") {
            const index = COLUMN_TYPES.findIndex(
                (cons) => cons.label === e.target.value
            );
            setColTypeIndex(index);
        }
    };

    const handleColumnSettings = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formInputs = (e.target as HTMLFormElement).elements;

        const colName = (formInputs.namedItem("colName") as HTMLInputElement)
            .value;
        const colType = (formInputs.namedItem("colType") as RadioNodeList)
            .value;

        const rest = (
            Array.from(formInputs).filter((el) => {
                if (
                    el.tagName === "INPUT" &&
                    "name" in el &&
                    typeof el.name === "string"
                ) {
                    if (el.name.includes(colType)) {
                        return el;
                    }
                }
            }) as HTMLInputElement[]
        ).map((elem) => ({
            [elem.name]: elem.type === "checkbox" ? elem.checked : elem.value,
        }));

        console.table(rest);
    };

    return (
        <div className="w-full flex justify-center items-center p-[20%]">
            <div
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col w-full gap-5"
            >
                <p className="text-xl">New table</p>

                <TextInput label="Table name" />
                <div className="border-2 border-black p-5 flex flex-col gap-5">
                    <form
                        className="flex flex-col gap-5"
                        onChange={handleColType}
                        onSubmit={handleColumnSettings}
                    >
                        <TextInput label="Column name" name="colName" />
                        <div className="flex">
                            <div className="flex flex-col w-1/2 gap-3">
                                {COLUMN_TYPES.map((type, index) => (
                                    <div
                                        key={type.label}
                                        className="flex flex-col"
                                        style={{
                                            width: `${
                                                100 / COLUMN_TYPES.length
                                            }%`,
                                        }}
                                    >
                                        <label>
                                            <input
                                                type="radio"
                                                name="colType"
                                                value={type.label}
                                                defaultChecked={index === 0}
                                            />
                                            {type.label}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col w-1/2">
                                {COLUMN_TYPES[colTypeIndex].contraints.map(
                                    (constraint, i) => (
                                        <div key={i.toString()}>
                                            <TextInput
                                                label={constraint}
                                                type="number"
                                                defaultValue={0}
                                                name={`${COLUMN_TYPES[colTypeIndex].label}-${constraint}`}
                                            />
                                        </div>
                                    )
                                )}

                                {COLUMN_TYPES[colTypeIndex].options.map(
                                    (option, i) => (
                                        <div key={i.toString()}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={false}
                                                    name={`${COLUMN_TYPES[colTypeIndex].label}-${option}`}
                                                />
                                                {option}
                                            </label>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <button className="bg-black text-white p-2 w-full">
                            Add column
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default App;

const table_name = "";

export const query = `--sql
CREATE TABLE ${table_name}(

);
`;
