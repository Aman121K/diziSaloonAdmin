import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getData } from "../services/http.service";
import Constants from "../services/constant";
import profile from "../assets/demo/flags/profile.png";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const Provider = () => {
    useEffect(() => {
        getAllUsers();
    }, []);
    const getAllUsers = () => {
        getData(Constants.END_POINT.PROVIDERS)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const blockUser = (id) => {
        getData(Constants.END_POINT.BLOCK_UNBLOCK_PROVIDER + id)
            .then((res) => {
                getAllUsers();
            })
            .catch((err) => console.log);
    };
    const [users, setUsers] = useState();

    const statusBodyTemplate2 = (rowData) => {
        return <span className={`product-badge status-${rowData.isOnline ? "instock" : "outofstock"}`}>{rowData.isOnline ? "Online" : "Offline"}</span>;
    };
    const blockBodyTemplate = (rowData) => {
        return (
            <div className="">
                <Link to={`/providerInfo/${rowData?._id}`}>
                    <Button type="button" className={`p-button-raised p-button-rounded  p-button-outlined p-button-info ml-4`}>
                        View
                    </Button>
                </Link>
                <Button type="button" className={`p-button-raised p-button-rounded  p-button-outlined ${rowData?.isDeleted ? "p-button-success  ml-4" : "p-button-danger ml-4"}`} onClick={() => blockUser(rowData?._id)}>
                    {rowData?.isDeleted ? "Unblock" : "Block"}
                </Button>
            </div>
        );
    };
    return (
        <div className="col-12">
            <div className="card">
                <h5>Providers</h5>
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
                    <Column field="firstName" header="Name" sortable style={{ width: "30px" }} />
                    <Column field="isOnline" header="Status" sortable body={statusBodyTemplate2} style={{ width: "30px" }} />
                    <Column field="block" header="Action" body={blockBodyTemplate} style={{ width: "40px" }} />
                </DataTable>
            </div>
        </div>
    );
};

export default Provider;
