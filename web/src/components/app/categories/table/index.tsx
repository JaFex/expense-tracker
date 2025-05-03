import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { flexRender, getCoreRowModel, useReactTable, ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table"
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { FlowType } from "@/types/enums";
import { useQueryCategories } from "@/hooks/query/categories";

type Props = {
    type?: FlowType
}

export const CategoryTable = ({ type }: Props) => {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const { list } = useQueryCategories();

    const table = useReactTable({
        data: list.data ?? [], columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters
        }
    });

    useEffect(() => {
        table.getColumn("type")?.setFilterValue(type);
    }, [type, table]);

    return <div>
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header,
                                        header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ?
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell,
                                            cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                        : <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </div>
    </div>
}