// -- ./src/template/components/table/components/data-table-toolbar.tsx
"use client";
import { X } from "lucide-react";

import { Button } from "src/template/ui/button";
import { Input } from "src/template/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

export type FilterType = {
  searchValue?: string; // For now filter support only search
};

import { Table } from "@tanstack/react-table";
interface DataTableToolbarProps {
  table: Table<any>;
  onSearch?: (value: string) => void; // TODO this Type should be improved from ActionsType.onSearch
  filter?: FilterType;
}


export function DataTableToolbar({ table, onSearch, filter }: DataTableToolbarProps) {
  // Do we need is filtered?
  const [searchValue, setSearchValue] = React.useState("");
  const isFiltered = table.getState().columnFilters.length > 0;
  const handleFilterChange = () => {
    table.setPageIndex(0);
    onSearch?.(searchValue);
  };

  React.useEffect(() => {
    setSearchValue(filter?.searchValue || "");
  }, [filter?.searchValue]);

  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      {onSearch && (
        <div className='flex  gap-2 flex-1'>
          <div>
            <Input
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-8 min-w-[200px] max-w-sm"
              defaultValue={filter?.searchValue || ""}
            />
          </div>
          <Button variant="outline" className="h-8 px-2 lg:px-3" onClick={handleFilterChange}>
            Search
          </Button>
        </div>
      )}
      {isFiltered && (
        <Button
          variant="outline"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
        </Button>
      )}
      <DataTableViewOptions table={table} />
    </div>

  );
}
