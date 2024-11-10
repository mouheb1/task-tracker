// -- ./src/template/components/table/components/data-table-column-header.tsx
import {
  ChevronDown,
  ChevronUp,
  XCircle,
  Eye,
  Check,
} from "lucide-react";

import { cn } from "src/lib/utils";
import { Button } from "src/template/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/template/ui/dropdown-menu";
import { Column } from "@tanstack/react-table";

interface DataTableColumnHeaderProps {
  column: Column<any, any>;
  title: string;
  className?: string;
}

export function DataTableColumnHeader({ column, title, className }: DataTableColumnHeaderProps) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }


  const handleSort = (isDesc: boolean) => {
    if (column.getIsSorted() === "asc" && !isDesc) {
      column.clearSorting();
    } else if (column.getIsSorted() === "desc" && isDesc) {
      column.clearSorting();
    }
    else {
      column.toggleSorting(isDesc);
    }
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ChevronDown className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ChevronUp className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
            ) : (
              <XCircle className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleSort(false)}>
            <ChevronUp className="ltr:mr-2 rtl:ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
            {column.getIsSorted() === "asc" && (
              <Check className="h-3.5 w-3.5 text-success ltr:ml-auto rtl:mr-auto" onClick={column.clearSorting} />
            )
            }
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort(true)}>
            <ChevronDown className="ltr:mr-2 rtl:ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
            {column.getIsSorted() === "desc" && (
              <Check className="h-3.5 w-3.5 text-success ltr:ml-auto rtl:mr-auto" onClick={column.clearSorting} />
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <Eye className="ltr:mr-2 rtl:ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
