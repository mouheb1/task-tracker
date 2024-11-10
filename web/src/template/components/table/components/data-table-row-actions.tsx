// -- ./src/template/components/table/components/data-table-row-actions.tsx
"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "src/template/ui/button";
import { Icon } from "@iconify/react"; // Ensure you have react-icons or iconify/react installed

interface DataTableRowActionsProps {
  row: Row<any>;
  onEdit?: (rowData: any) => void;
  onDelete?: (rowData: any) => void;
  onView?: (rowData: any) => void;
  // You can extend this interface with more actions if needed
}

export function DataTableRowActions({ row, onEdit, onView, onDelete }: DataTableRowActionsProps) {
  const handleEdit = () => {
    onEdit?.(row.original);
  };

  const handleView = () => {
    onView?.(row.original);
  };

  const handleDelete = () => {
    onDelete?.(row.original);
  };

  return (
    <div className="flex gap-3 justify-end">
      {onView && (
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7"
          color="primary"
          onClick={handleView}
          aria-label="View"
        >
          <Icon icon="heroicons:eye" className="h-4 w-4" />
        </Button>
      )}
      {onEdit && (
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7"
          color="secondary"
          onClick={handleEdit}
          aria-label="Edit"
        >
          <Icon icon="heroicons:pencil" className="h-4 w-4" />
        </Button>
      )}
      {onDelete && (
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7"
          color="destructive"
          onClick={handleDelete}
          aria-label="Delete"
        >
          <Icon icon="heroicons:trash" className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
