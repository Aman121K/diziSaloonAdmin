import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import { getData, putData } from "../services/http.service";
import Constants from "../services/constant";
import list from "../assets/demo/flags/list.png";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

const SafetyRules = () => {
    useEffect(() => {
        getAllSafetyRules();
    }, []);

    const getAllSafetyRules = () => {
        getData(Constants.END_POINT.GET_ALL_SAFETY_RULES)
            .then((res) => {
                console.log("res::", res);
                setSafetyRules(res.data);
            })
            .catch((err) => console.log(err));
    };

    const [safetyRules, setSafetyRules] = useState(null);
    const [openModal, setOpenModal] = useState(null);
    const [id, setId] = useState(null);
    const [data, setData] = useState();

    const handleEdit = (rowData) => {
        setOpenModal(true);
        setId(rowData?._id);
        setData(rowData);
    };
    const deleteSafetyRules = (id) => {
        putData(Constants.END_POINT.DELETE_SAFETY_RULES + id)
            .then((res) => {
                if (res.success) {
                    toast.current.show({ severity: "info", summary: "Confirmed", detail: "Safety Rules has been Deleted Succesfully", life: 3000 });
                }
                console.log("delete res", res);
                getAllSafetyRules();
            })
            .catch((err) => console.log(err));
    };
    const toast = useRef(null);

    const reject = () => {
        toast.current.show({ severity: "warn", summary: "Rejected", detail: "You have rejected", life: 3000 });
    };
    const deletepopup = (event, position) => {
        console.log("position::0", position);
        confirmDialog({
            message: "Do you want to delete this Safety Rule?",
            icon: "pi pi-info-circle",
            header: "Delete Confirmation",
            acceptClassName: "p-button-danger",
            position,
            accept: () => deleteSafetyRules(event, position),
            reject,
        });
    };
    const actionTemplate = (rowData) => {
        return (
            <div className="">
                <Button type="button" icon="pi pi-pencil" className="p-button-warning " style={{ textAlign: "center", width: "6rem", marginRight: "10px" }} onClick={() => handleEdit(rowData)}></Button>
                <Button onClick={() => deletepopup(rowData?._id, "top-right")} type="button" className="p-button-danger ">
                    Delete
                </Button>
            </div>
        );
    };

    return (
        <React.Fragment>
            <Toast ref={toast} />
            <div className="grid table-demo">
                <div className="col-12">
                    <div className="card">
                        <div className="flex justify-content-between mb-4">
                            <h5>Safety Rules</h5>
                            <Button icon="pi pi-plus" label="Create Amenities" onClick={() => setOpenModal(true)} />
                        </div>
                        <DataTable value={safetyRules} responsiveLayout="scroll" paginator rows={8}>
                            <Column field="safetyRuleTitle" header="Name" style={{ width: "70%" }}></Column>
                            {/* <Column header="Image" body={imageBodyTemplate} style={{ width: "35%" }} /> */}
                            <Column header="Action" body={actionTemplate} style={{ width: "25%" }} />
                        </DataTable>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default SafetyRules;
