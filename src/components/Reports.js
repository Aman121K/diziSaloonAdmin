import React, { useEffect, useState } from "react";
import Constants from "../services/constant";
import { getData } from "../services/http.service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";

const Reports = () => {
    useEffect(() => {
        getAllBusinessReport();
    }, []);

    const [data, setData] = useState(null);

    const getAllBusinessReport = () => {
        getData(Constants.END_POINT.GET_ALL_BUSINESS_REPORTS)
            .then((res) => {
                setData(res?.data?.report);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const actionTemplate = (rowData) => {
        return (
            <Link to={`/providerInfo/${rowData?.businessId?.provider}`}>
                <div className="">{rowData?.businessId?.businessName}</div>
            </Link>
        );
    };

    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <div className="flex justify-content-between mb-4">
                        <h5>Reports</h5>
                    </div>

                    <DataTable value={data} responsiveLayout="scroll" paginator rows={8}>
                        <Column field="reportTitle" header="Title" style={{ width: "35%" }}></Column>
                        <Column field="reportComment" header="Comment" style={{ width: "35%" }} />
                        <Column header="Business Name" body={actionTemplate} style={{ width: "25%" }} />
                        {/* <Column field="businessId.businessName" header="Business Name" style={{ width: "35%" }} /> */}
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Reports;
