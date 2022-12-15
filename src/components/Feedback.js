import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getData } from "../services/http.service";
import Constants from "../services/constant";

const Feedback = () => {
    useEffect(() => {
        getAllfeedback();
    }, []);

    const [data, setData] = useState(null);
    const getAllfeedback = () => {
        getData(Constants.END_POINT.GET_ALL_PROVIDER_FEEDBACK)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    };
    const actionTemplate = (rowData) => {
        return <div className="">{rowData?.provider?.firstName}</div>;
    };
    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.isSatisfied ? "instock" : "outofstock"}`}>{rowData.isSatisfied ? "Yes" : "No"}</span>;
    };
    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <div className="flex justify-content-between mb-4">
                        <h5>FeedBack</h5>
                    </div>

                    <DataTable value={data} responsiveLayout="scroll" paginator rows={8}>
                        <Column header="Provider Name" body={actionTemplate} style={{ width: "25%" }} />
                        <Column field="description" header="Comment" style={{ width: "35%" }} />
                        <Column header="Is Satisfied" body={statusBodyTemplate} style={{ width: "25%" }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
