// -- ./src/template/components/table/index.tsx
import { Fragment } from "react";
export type { TableColType, ActionsType } from "./components/columns";
import { generateColumns, ActionsType } from "./components/columns";
import { DataTable } from "./components/data-table";
import { FilterType } from "./components/data-table-toolbar";

type TableProps = {
  // TODO improve types here
  columns: any;
  data: any;
  actions: ActionsType<any>;
  rowCount: number;
  currentPage: number;
  pageSize: number;
  filter?: FilterType
};

export function Table({ columns, data, actions = {}, rowCount, currentPage, pageSize, filter }: TableProps) {
  const generatedCols = generateColumns(columns, actions);
  return (
    <Fragment >
      <DataTable
        data={data}
        columns={generatedCols}
        onSearch={actions.onSearch}
        onSort={actions.onSort}
        rowCount={rowCount}
        currentPage={currentPage}
        onPaginationChange={actions.onPaginationChange}
        pageSize={pageSize}
        filter={filter}
      />
    </Fragment>
  );
}
