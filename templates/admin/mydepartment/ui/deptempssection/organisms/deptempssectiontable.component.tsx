import * as React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Edit,
  Toolbar,
  CommandColumn,
  ExcelExport,
  PdfExport,
  Sort,
  Filter,
  FilterSettingsModel,
  Reorder,
  ColumnChooser,
  Resize,
  Group,
  ColumnMenu,
  Selection,
  RowDD,
  Freeze,
  GroupSettingsModel,
} from "@syncfusion/ej2-react-grids";
import { PureComponent } from "react";
import { MyDepartmentAdminPageProps } from "pages/coordinator/mydepartment";

export class DeptEmpsSectionTable extends PureComponent<MyDepartmentAdminPageProps> {
  public toolbarOptions = [
    "Add",
    "Edit",
    "Delete",
    "Update",
    "Cancel",
    "ExcelExport",
    "CsvExport",
    "PdfExport",
    "ColumnChooser",
  ];
  //@ts-ignore
  private gridInstance: GridComponent;
  public editSettings: any = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Dialog",
    newRowPosition: "Bottom",
  };
  public editparams: any = { params: { popupHeight: "300px" } };
  public validationRule: Object = { required: true };
  public pageSettings: Object = { pageCount: 5 };
  groupOptions: GroupSettingsModel = {
    showGroupedColumn: true,
    showDropArea: false,
  };
  public commands: any = [
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
    {
      type: "Cancel",
      buttonOption: { iconCss: "e-icons e-cancel-icon", cssClass: "e-flat" },
    },
  ];

  public filterSettings: FilterSettingsModel = { type: "CheckBox" };

  async actionBegin(args: any) {
    console.log(args);
    // if (args.requestType === "save") {
    //   if (args.action === "add") {
    //     return await fetch(`/api/employee`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ ...args.data }),
    //     });
    //   } else if (args.action === "edit") {
    //     return await fetch(`/api/employee`, {
    //       method: "PUT",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ ...args.data }),
    //     });
    //   }
    // } else if (args.requestType === "delete") {
    //   return await fetch(`/api/employee`, {
    //     method: "DELETE",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ ...args.data }),
    //   });
    // }
  }

  async toolbarClick(args: any) {
    switch (args.item.text) {
      case "PDF Export":
        //@ts-ignore
        this.gridInstance.pdfExport(await this.getPdfExportProperties());
        break;
      case "Excel Export":
        this.gridInstance.excelExport();
        break;
      case "CSV Export":
        this.gridInstance.csvExport();
        break;
    }
  }

  render() {
    return this.props.deptEmps === null ? null : (
      <div className="control-pane">
        <div className="control-section">
          <GridComponent
            actionBegin={this.actionBegin.bind(this)}
            allowGrouping
            allowExcelExport
            allowFiltering
            allowPaging
            allowPdfExport
            allowReordering
            allowRowDragAndDrop
            allowResizing
            allowSorting
            clipMode="EllipsisWithTooltip"
            dataSource={this.props.deptEmps}
            editSettings={this.editSettings}
            enableStickyHeader
            filterSettings={this.filterSettings}
            frozenColumns={1}
            groupSettings={this.groupOptions}
            pageSettings={this.pageSettings}
            //@ts-ignore
            ref={(grid) => (this.gridInstance = grid)}
            showColumnChooser
            showColumnMenu
            toolbar={this.toolbarOptions}
            toolbarClick={this.toolbarClick.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective
                headerText="Operations"
                commands={this.commands}
                width="130"
              ></ColumnDirective>
              <ColumnDirective
                field="IdPracownicy"
                headerText="ID"
                isPrimaryKey={true}
                validationRules={this.validationRule}
                autoFit
              ></ColumnDirective>
              <ColumnDirective
                field="Imie"
                headerText="Imię"
                validationRules={this.validationRule}
                autoFit
              ></ColumnDirective>
              <ColumnDirective
                field="Nazwisko"
                headerText="Nazwisko"
                validationRules={this.validationRule}
                autoFit
              ></ColumnDirective>
              <ColumnDirective
                field="Email"
                headerText="Email"
                validationRules={this.validationRule}
                autoFit
              ></ColumnDirective>
              <ColumnDirective
                field="NumerDowodu"
                headerText="Numer Dowodu"
                validationRules={this.validationRule}
                autoFit
              ></ColumnDirective>
              <ColumnDirective
                field="NumerPrawaJazdy"
                headerText="Numer Prawa Jazdy"
                validationRules={this.validationRule}
                autoFit
              ></ColumnDirective>
              <ColumnDirective
                field="NumerTelefonu"
                headerText="Numer Telefonu"
                validationRules={this.validationRule}
                autoFit
              ></ColumnDirective>
              <ColumnDirective
                field="Pesel"
                headerText="Pesel"
                validationRules={this.validationRule}
                autoFit
              ></ColumnDirective>
              <ColumnDirective
                field="lokalizacje"
                headerText="Lokalizacja"
                edit={this.editparams}
                editType="dropdownedit"
                validationRules={this.validationRule}
                autoFit
              ></ColumnDirective>
              <ColumnDirective
                field="stanowiska"
                headerText="Stanowisko"
                edit={this.editparams}
                editType="dropdownedit"
                validationRules={this.validationRule}
                autoFit
              ></ColumnDirective>
            </ColumnsDirective>
            <Inject
              services={[
                Page,
                Toolbar,
                ExcelExport,
                PdfExport,
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
              ]}
            />
          </GridComponent>
        </div>
      </div>
    );
  }
}
