import {
  ColumnChooser,
  ColumnMenu,
  CommandColumn,
  Edit,
  EditSettingsModel,
  ExcelExport,
  Filter,
  ForeignKey,
  Freeze,
  GridComponent,
  Group,
  IEditCell,
  Page,
  Reorder,
  Resize,
  RowDD,
  Selection,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

export const toolbarOptions = [
  "Add",
  "Edit",
  "Delete",
  "ExcelExport",
  "CsvExport",
  "ColumnChooser",
];

export const editSettings: EditSettingsModel = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  mode: "Dialog",
  newRowPosition: "Bottom",
};

export const editparams: IEditCell = { params: { popupHeight: "300px" } };

export const commands: any = [
  {
    type: "Edit",
    buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" },
  },
  {
    type: "Delete",
    buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" },
  },
  {
    type: "Save",
    buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" },
  },
];

export async function actionBegin(args: any, path: string) {
  if (args.requestType === "save" || args.requestType === "delete") {
    return await fetch(`/api/${path}`, {
      method:
        args.action === "add"
          ? "POST"
          : args.action === "edit"
          ? "PUT"
          : "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...args.data }),
    });
  }
}

export async function toolbarClick(args: any, gridInstance: GridComponent) {
  switch (args.item.text) {
    case "Excel Export":
      gridInstance.excelExport();
      break;
    case "CSV Export":
      gridInstance.csvExport();
      break;
  }
}

export const defaultGridProps = {
  allowExcelExport: true,
  allowFiltering: true,
  allowPaging: true,
  allowReordering: true,
  allowRowDragAndDrop: true,
  allowResizing: true,
  allowSorting: true,
  clipMode: "EllipsisWithTooltip",
  editSettings,
  filterSettings: { type: "CheckBox" },
  frozenColumns: 1,
  pageSettings: { pageCount: 5, pageSize: 7 },
  showColumnChooser: true,
  showColumnMenu: true,
  toolbar: toolbarOptions,
};

export const defaultInjectServices: Object[] = [
  Page,
  Toolbar,
  ExcelExport,
  CommandColumn,
  ColumnChooser,
  ColumnMenu,
  Edit,
  Group,
  Filter,
  Reorder,
  Resize,
  RowDD,
  Selection,
  Sort,
  Freeze,
  ForeignKey,
];
