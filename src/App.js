import React, { Component, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import UserDataTable from './UserDataTable';
import DepartmentDataTable from './DepartmentDataTable';
import SalaryDataTable  from './SalaryDataTable';
import ProjectDataTable from './ProjectDataTable';


function App() {

  const [textValue, setTextValue] = useState("");
  const [table, setTable] = useState("Program");

  const renderTable = () => {
    if (table === "Users") {
      return (
        <UserDataTable />
      );
    }
    else if (table === "Departments") {
      return (
        <DepartmentDataTable />
      );
    }else if (table === "Salaries") {
      return (
        <SalaryDataTable />
      );
    } else if (table === "Projects") {
      return (
        <ProjectDataTable />
      );
    }
     else {
      return (
        <div>Welcome to My Internship Program</div>
      )
    }

  }

  return (
    <div>
      <Button label="Show Employees" onClick={() => {setTable("Users")}}/>
      <Button label="Show Departments" onClick={() => {setTable("Departments")}}/>
      <Button label="Show Salaries" onClick={() => {setTable("Salaries")}}/>
      <Button label="Show Projects" onClick={() => {setTable("Projects")}}/>

      {renderTable()}
    </div>
  );
}

export default App;
