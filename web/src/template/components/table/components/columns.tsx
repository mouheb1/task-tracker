// -- ./src/template/components/table/components/columns.tsx
"use client";

import { Badge } from "src/template/ui/badge";
import { Checkbox } from "src/template/ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef, CellContext, sortingFns, SortingState, PaginationState } from "@tanstack/react-table";
import { cn } from "src/lib/utils";
import { type ClassValue, clsx } from "clsx"

interface Task {
  id: string;
  title?: string;
  label?: string;
  status?: string;
  priority?: string;
}

// email
// render: (text) => truncate(text),
// Full Name
// givenName + familyName
// createdAt
// action : show edit delete


export type TableColType<DataType> = {
  key: string,
  title: string,
  render?: (cellContext: CellContext<DataType, any>) => React.ReactNode,
  className?: ClassValue, // for cell styling
}

export type ActionsType<DataType> = {
  onEdit?: (rowData: DataType) => void;
  onDelete?: (rowData: DataType) => void;
  onView?: (rowData: DataType) => void;
  onSearch?: (value: string) => void;
  onSort?: (sorting: SortingState) => void;
  onPaginationChange?: (pagination: PaginationState) => void;
}


function cellRender<DataType>(cellContext: CellContext<DataType, any>, render?: any, className?: ClassValue) {
  const cellWrap = (children) => <div className={
    cn(className)
  }>{children}</div>
  if (render === undefined) {
    return cellWrap(cellContext.renderValue())
  }
  return cellWrap(render(cellContext))
}

function getActionColum<DataType>(actions: ActionsType<DataType>) {
  return [{
    id: "actions",
    cell: ({ row }) => <DataTableRowActions onView={actions.onView} onEdit={actions.onEdit} onDelete={actions.onDelete} row={row} />,
  }]
}
export function generateColumns<DataType>(data: TableColType<DataType>[], actions?: ActionsType<DataType>): ColumnDef<DataType>[] {
  const hasActions = actions?.onEdit || actions?.onDelete || actions?.onView
  const actionColumn = hasActions ? getActionColum(actions) : []
  //TODO memo this
  const generatedColumns = []
  data.forEach((columnData) => {
    generatedColumns.push({
      id: columnData.key,
      accessorKey: columnData.key,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={columnData.title} />
      ),
      cell: (context) => cellRender(context, columnData.render, columnData.className),
    })
  })

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...generatedColumns,
    ...actionColumn,
  ]
}


