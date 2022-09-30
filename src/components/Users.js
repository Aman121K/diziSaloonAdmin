import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getData } from "../services/http.service";
import Constants from "../services/constant";
import profile from "../assets/demo/flags/profile.png";
import { Button } from "primereact/button";

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
    const blockUser = (id) => {
        getData(Constants.END_POINT.BLOCK_UNBLOCK_USER + id)
            .then((res) => {
                getAllUsers();
            })
            .catch((err) => console.log);
    };
    const [users, setUsers] = useState();

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.image ? Constants.BASE_URL + rowData.image : profile} alt={rowData.image} width={50} />;
    };
    const statusBodyTemplate2 = (rowData) => {
        return <span className={`product-badge status-${rowData.isOnline ? "instock" : "outofstock"}`}>{rowData.isOnline ? "Online" : "Offline"}</span>;
    };
    const blockBodyTemplate = (rowData) => {
        return (
            <div className="">
                <Button type="button" className={`p-button-raised p-button-rounded  p-button-outlined ${rowData?.isDeleted ? "p-button-success" : "p-button-danger"}`} onClick={() => blockUser(rowData?._id)}>
                    {rowData?.isDeleted ? "Unblock" : "Block"}
                </Button>
            </div>
        );
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
                    <Column field="block" header="Action" body={blockBodyTemplate} />
                </DataTable>
            </div>
        </div>
    );
};

export default Users;
