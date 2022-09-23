import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { getData } from "../services/http.service";
import Constants from "../services/constant";
import list from "../assets/demo/flags/list.png";
import { Button } from "primereact/button";
import CreateCategory from "../modals/CreateCategory";

const Categories = () => {
    useEffect(() => {
        getData(Constants.END_POINT.GET_ALL_CATEGORIES)
            .then((res) => {
                setCategory(res.data);
                console.log("res::", res);
            })
            .catch((err) => console.log(err));
    }, []);

    const [category, setCategory] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    console.log("category::", category);
    const template2 = {
        layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
        RowsPerPageDropdown: (options) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 },
            ];

            return (
                <React.Fragment>
                    <span className="mx-1" style={{ color: "var(--text-color)", userSelect: "none" }}>
                        Items per page:{" "}
                    </span>
                    <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
                </React.Fragment>
            );
        },
        CurrentPageReport: (options) => {
            return (
                <span style={{ color: "var(--text-color)", userSelect: "none", width: "120px", textAlign: "center" }}>
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            );
        },
    };
    const imageBodyTemplate = (rowData) => {
        console.log("rowData::", Constants.BASE_URL + rowData.categoryImage);
        return <img src={rowData.categoryImage ? Constants.BASE_URL + rowData.categoryImage : list} alt={rowData.categoryImage} width={50} />;
    };
    const actionTemplate = (rowData) => {
        return (
            <div className="">
                <Button type="button" icon="pi pi-pencil" className="p-button-warning font-bold text-white m-2 px-5 py-3 border-round" style={{ textAlign: "center", width: "6rem", marginRight: "10px" }}></Button>
                {rowData?.isActive ? (
                    <Button type="button" className="p-button-danger font-bold text-white m-2 px-5 py-3 border-round">
                        Disable
                    </Button>
                ) : (
                    <Button type="button" className="p-button-success font-bold text-white m-2 px-5 py-3 border-round">
                        Enable
                    </Button>
                )}
            </div>
        );
    };

    return (
        <React.Fragment>
            <div className="grid table-demo">
                <div className="col-12">
                    <div className="card">
                        <div className="flex justify-content-between mb-4">
                            <h5>Categories</h5>
                            <Button icon="pi pi-plus" label="Create Category" onClick={() => setOpenModal(true)} />
                        </div>

                        <DataTable value={category} responsiveLayout="scroll">
                            <Column field="categoryName" header="Name" style={{ width: "35%" }}></Column>
                            <Column header="Image" body={imageBodyTemplate} style={{ width: "35%" }} />
                            <Column header="Action" body={actionTemplate} style={{ width: "25%" }} />
                        </DataTable>
                        <CreateCategory openModal={openModal} setOpenModal={setOpenModal} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Categories;
