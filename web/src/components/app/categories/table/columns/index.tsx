import { ColumnDef } from "@tanstack/react-table";

enum FlowType {
    INCOME = 'I',
    EXPENSE = 'E'
}

enum FlowTypeName {
    I = 'Income',
    E = 'Expense'
}

type Category = {
    name: string,
    description?: string,
    type: FlowType
}

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => {
            const type = row.getValue<FlowType>("type");
            const isIncome = type === FlowType.INCOME;
            return <div className={`font-medium ${isIncome ? `text-green-600` : `text-red-600`}`}>{FlowTypeName[type]}</div>
        },
    },
    {
        accessorKey: 'description',
        header: 'Description'
    },
]