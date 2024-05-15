import { SQL_COLUMN_TYPES } from "./constants";

export default function buildTableQuery(
    data: Record<string, string | number | boolean>[]
) {
    let query = "";

    for (let i = 0; i < data.length; i++) {
        const comma = i === data.length - 1 ? "" : ",";

        const curr = data[i];

        const isVarchar = curr.columnType === SQL_COLUMN_TYPES[0].label;
        const isInteger = curr.columnType === SQL_COLUMN_TYPES[1].label;
        const isBoolean = curr.columnType === SQL_COLUMN_TYPES[2].label;
        const isJson = curr.columnType === SQL_COLUMN_TYPES[3].label;

        let typeString = "";

        if (isVarchar) {
            let minSize = "";
            let varcharSize = "";
            let unique = "";
            let notNull = "";

            if ("min" in curr && typeof curr.min === "number")
                minSize += ` CHECK (LENGTH(${curr.columnName}) >= ${curr.min})`;

            if ("max" in curr && typeof curr.max === "number")
                varcharSize = curr.max.toString();

            if ("unique" in curr && curr.unique === true) unique = " UNIQUE";

            if ("not-null" in curr && curr["not-null"] === true)
                notNull = " NOT NULL";

            typeString = `VARCHAR(${varcharSize})${unique}${notNull}${minSize}`;
        } else if (isInteger) {
            let notNull = "";
            let maxSize = "";
            let minSize = "";

            if ("not-null" in curr && curr["not-null"] === true)
                notNull = " NOT NULL";

            if ("min" in curr && typeof curr.min === "number")
                minSize += ` CHECK (${curr.columnName} >= ${curr.min})`;

            if ("max" in curr && typeof curr.max === "number")
                maxSize = ` CHECK (${curr.columnName} <= ${curr.max})`;

            if (maxSize.length > 0 && minSize.length > 0) {
                minSize = "";
                maxSize = ` CHECK (${curr.columnName} >= ${curr.min} AND ${curr.columnName} <= ${curr.max})`;
            }

            typeString = `INT ${notNull}${maxSize}${minSize}`;
        } else if (isBoolean) {
            let defaultVal = " DEFAULT FALSE";
            if (
                "default-true" in curr &&
                typeof curr["default-true"] === "boolean"
            )
                defaultVal = ` DEFAULT ${curr["default-true"]}`;

            typeString = `BOOLEAN ${defaultVal}`;
        } else if (isJson) {
            let notNull = "";

            if ("not-null" in curr && curr["not-null"] === true)
                notNull = " NOT NULL";

            typeString = `JSON ${notNull}`;
        }

        const col = `${data[i].columnName} ${typeString}${comma}`;

        query += col;
    }

    return query;
}
