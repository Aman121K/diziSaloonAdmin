import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getData } from "../services/http.service";
import Constants from "../services/constant";
import list from "../assets/demo/flags/list.png";

const Users = () => {
    useEffect(() => {
        getAllUsers();
    }, []);
    const getAllUsers = () => {
        getData(Constants.END_POINT.USERS)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const [users, setUsers] = useState();
    console.log("users::", users);
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.categoryImage ? Constants.BASE_URL + rowData.categoryImage : list} alt={rowData.categoryImage} width={50} />;
    };
    const statusBodyTemplate2 = (rowData) => {
        return <span className={`product-badge status`}>{rowData.isOnline}</span>;
    };
    return (
        <div className="col-12">
            <div className="card">
                <h5>Users</h5>
                <DataTable
                    value={users}
                    paginator
                    rows={5}
                    // expandedRows={expandedRows}
                    // onRowToggle={(e) => setExpandedRows(e.data)}
                    // responsiveLayout="scroll"
                    // rowExpansionTemplate={rowExpansionTemplate}
                    // dataKey="id"
                    // header={header}
                >
                    {/* <Column expander style={{ width: "3em" }} /> */}
                    <Column field="firstName" header="Name" sortable />
                    <Column field="email" header="Email" sortable />
                    <Column field="mobile" header="Mobile" sortable />
                    <Column header="Image" body={imageBodyTemplate} />
                    <Column field="isOnline" header="Status" sortable body={statusBodyTemplate2} />
                </DataTable>
            </div>
        </div>
    );
};

export default Users;
