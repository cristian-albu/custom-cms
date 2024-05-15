export const SQL_COLUMN_TYPES = [
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
        options: ["default-true"],
    },
    {
        label: "JSON",
        contraints: [],
        options: ["not-null"],
    },
] as const;
