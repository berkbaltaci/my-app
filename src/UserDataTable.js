import React, { Component, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

function UserDataTable(props) {
    const [data, setData] = useState([]);

    const [searchName, setSearchName] = useState("");
    
    const [minAge, setMinAge] = useState(undefined);

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");

    const [name2, setName2] = useState("");
    const [lastname2, setLastname2] = useState("");
    const [age, setAge] = useState(undefined);
    const [departmentName, setDepartmentName] = useState("");

    
    const getUsers = () => {
        axios.get("https://internprojectberk.herokuapp.com/Employees").then(
            
            (res) => {
                const newData = res.data.map((entry) => {return ({...entry, employeeProject: entry.employeeProject[0]})});
                console.log(res);
                setData(newData);            
                
            }
            
        )
    }

    useEffect(() => {
        getUsers();
    }, []);

    const deleteEmployee = () => {
        axios.get("https://internprojectberk.herokuapp.com/deleteEmployeeByNameandLastname/?name="+name+"&lastname="+lastname).then(
            
            (res) => {
                console.log(res);
                setData(res.data); 
                getUsers();           
                
            }
            
        )

        setName("");
        setLastname("");
        
        
    }
    const addEmployee = () => {
        axios.get("https://internprojectberk.herokuapp.com/addEmployee?name="+name2+"&lastname="+lastname2+"&age="+age+"&department="+departmentName).then(
            
            (res) => {
                console.log(res);
                setData(res.data); 
                getUsers();           
                
            }
            
        )

        setName2("");
        setLastname2("");
        setAge(undefined);
        setDepartmentName("");
        
        
        
    }

    const search = () => {
        axios.get("https://internprojectberk.herokuapp.com/findEmployeeByName/?name="+ searchName).then(
            
            
            (res) => {
                const newData = res.data.map((entry) => {return ({...entry, employeeProject: entry.employeeProject[0]})});
                if(searchName === "") {
                    getUsers();
                }
                console.log(res);
                setData(newData);
                           
                
            }
            
        )
    }
    const searchMinAge = () => {
        axios.get("https://internprojectberk.herokuapp.com/findEmployeeByAge/?age="+ minAge).then(
            
            
            (res) => {
                const newData = res.data.map((entry) => {return ({...entry, employeeProject: entry.employeeProject[0]})});
                console.log(res);
                setData(newData);
            }
            
        )
    }

    return (
        <div>
            <InputText placeholder="Search Name" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
            <Button label="Search" onClick={()=>{search()}} /> 

            <InputNumber placeholder="Minimum Age" value={minAge} onValueChange={(e) => setMinAge(e.value)} />
            <Button label="Search" onClick={()=>{searchMinAge()}} /> 
            

            <DataTable value={data}>
                <Column field="name" header="Name"></Column>
                <Column field="lastname" header="Surname"></Column>
                <Column field="age" header="Age"></Column>
                <Column field="department.departmentname" header="Department"></Column>
                <Column field="salary.salary" header="Salary"></Column>
                <Column field= "employeeProject.project.projectname" header="Project Name"></Column>
            </DataTable>

            <InputText placeholder = "Name" value={name2} onChange={(e) => setName2(e.target.value)} />
            <InputText placeholder = "Lastname" value={lastname2} onChange={(e) => setLastname2(e.target.value)} />
            <InputNumber placeholder="Age" value={age} onValueChange={(e) => setAge(e.value)} />
            <InputText placeholder = "Department Name" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />

            <Button label="Add Employee" onClick={()=>{addEmployee()}} /> 

            <InputText placeholder = "Name" value={name} onChange={(e) => setName(e.target.value)} />
            <InputText placeholder = "Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />

            <Button label="Delete Employee" onClick={()=>{deleteEmployee()}} /> 
        </div>
    );
}

export default UserDataTable;
