import React, { Component, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

function SalaryDataTable(props) {
    const [data, setData] = useState([]);
    const [minSalary, setMinSalary] = useState(undefined);

    const getUsers = () => {
        axios.get("https://internprojectberk.herokuapp.com/Salary").then(
            (res) => {
                console.log(res);
                setData(res.data);
            }
        )
    }
    const search = () => {
        axios.get("https://internprojectberk.herokuapp.com/findSalaryBy/?salary="+ minSalary).then(
            
            (res) => {
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
            <InputNumber placeholder="Min Salary" value={minSalary} onValueChange={(e) => setMinSalary(e.value)} />
            <Button label="Search" onClick={()=>{search()}} /> 

            <DataTable value={data}>
                <Column field="salary" header="Salary Amount"></Column>
                <Column field="salaryDate" header="Salary Date"></Column>
            </DataTable>
        </div>
    );
}

export default SalaryDataTable;
