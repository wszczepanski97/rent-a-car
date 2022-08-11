import { ViewDirective, ViewsDirective } from "@syncfusion/ej2-react-schedule";
import React from "react";

const ViewsDirectives = () => (
  <ViewsDirective>
    <ViewDirective option="Day" displayName="Dzień" />
    <ViewDirective option="Week" displayName="Tydzień" />
    <ViewDirective option="WorkWeek" displayName="Tydzień roboczy" />
    <ViewDirective option="Month" displayName="Miesiąc" />
    <ViewDirective option="Agenda" />
  </ViewsDirective>
);

export default ViewsDirectives;
