import React, { Component, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

function DepartmentDataTable(props) {
    const [data, setData] = useState([]);


    const [searchDepartment, setSearchDepartment] = useState("");

    const getUsers = () => {
        axios.get("http://localhost:8080/Department").then(
            (res) => {
                console.log(res);
                setData(res.data);
            }
        )
    }
    const search = () => {
        axios.get("http://localhost:8080/findDepartmentByName/?department="+ searchDepartment).then(
            
            (res) => {
                if(searchDepartment === "") {
                    getUsers();
                }
                console.log(res);
                setData(res.data);            
                
            }
            
        )
    }


    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <InputText placeholder="Search Department" value={searchDepartment} onChange={(e) => setSearchDepartment(e.target.value)} />
            <Button label="Search" onClick={()=>{search()}} /> 
            <DataTable value={data}>
                <Column field="departmentname" header="Department Names"></Column>
                <Column field="employeenum" header="Employee Numbers"></Column>
            </DataTable>
        </div>
    );
}

export default DepartmentDataTable;
