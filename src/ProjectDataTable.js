import React, { Component, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

function ProjectDataTable(props) {
    const [data, setData] = useState([]);

    const [searchProject, setSearchProject] = useState("");

    const getUsers = () => {
        axios.get("https://internprojectberk.herokuapp.com/Project").then(
            (res) => {
                console.log(res);
                setData(res.data);
            }
        )
    }

    useEffect(() => {
        getUsers();
    }, []);

    const search = () => {
        axios.get("https://internprojectberk.herokuapp.com/findProjectByName/?project="+ searchProject).then(
            
            (res) => {

                if(searchProject === "") {
                    getUsers();
                }
                console.log(res);
                setData(res.data);            
                
            }
            
        )
    }

    return (
        <div>
            <InputText placeholder="Search Project" value={searchProject} onChange={(e) => setSearchProject(e.target.value)} />
            <Button label="Search" onClick={()=>{search()}} /> 

            <DataTable value={data}>
                <Column field="projectname" header="Project Names"></Column>
            </DataTable>
        </div>
    );
}

export default ProjectDataTable;
