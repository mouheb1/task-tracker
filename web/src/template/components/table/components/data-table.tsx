// -- ./src/template/components/table/components/data-table.tsx
"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/template/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar, FilterType } from "./data-table-toolbar";

type UpdaterFunction<T> = ((old: T) => T) // this to fix type script error caused by the library
interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  onSearch?: (value: string) => void; // TODO this Type should be improved from ActionsType.onSearch
  onSort?: (sorting: SortingState) => void;
  rowCount: number;
  onPaginationChange: (pagination: PaginationState) => void;
  currentPage?: number;
  pageSize?: number;
  filter?: FilterType
}

export function DataTable<TData>({ columns, data, onSearch, onSort, rowCount, currentPage, pageSize, onPaginationChange, filter }: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: currentPage - 1, // the library uses 0 based index
    pageSize: pageSize,

  })

  React.useEffect(() => {
    setPagination({
      pageIndex: currentPage - 1,
      pageSize: pageSize,
    })
  }, [currentPage, pageSize])



  React.useEffect(() => {
    onSort?.(sorting);
  }, [sorting]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    onPaginationChange: (paginationUpdater: UpdaterFunction<PaginationState>) => {
      const newPagination = paginationUpdater(pagination);
      onPaginationChange({ ...newPagination, pageIndex: newPagination.pageIndex + 1 });
      setPagination(newPagination);
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    rowCount,
  });

  return (
    <div className="space-y-4 bg-white p-6 rounded" >
      <DataTableToolbar table={table} filter={filter} onSearch={onSearch} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
