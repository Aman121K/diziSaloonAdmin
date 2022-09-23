import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { getData } from "../services/http.service";
import Constants from "../services/constant";
import list from "../assets/demo/flags/list.png";
import { Button } from "primereact/button";
import CreateCategory from "../modals/CreateCategory";
import EditCategory from "../modals/EditCategory";

const Categories = () => {
    useEffect(() => {
        getAllCategory();
    }, []);

    const getAllCategory = () => {
        getData(Constants.END_POINT.GET_ALL_CATEGORIES)
            .then((res) => {
                setCategory(res.data);
            })
            .catch((err) => console.log(err));
    };

    const [category, setCategory] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [editModal, setEditModal] = useState(null);
    const [data, setData] = useState();

    const handleEdit = (rowData) => {
        console.log("rowDataee:ee:", rowData);
        setEditModal(rowData?._id);
        setData(rowData);
    };
    const enableDisable = (id) => {
        getData(Constants.END_POINT.ENABLE_DISABLE_CATEGORY + "/" + id)
            .then((res) => {
                getAllCategory();
            })
            .catch((err) => console.log(err));
    };

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
        return <img src={rowData.categoryImage ? Constants.BASE_URL + rowData.categoryImage : list} alt={rowData.categoryImage} width={50} />;
    };
    const actionTemplate = (rowData) => {
        return (
            <div className="">
                <Button type="button" icon="pi pi-pencil" className="p-button-warning " style={{ textAlign: "center", width: "6rem", marginRight: "10px" }} onClick={() => handleEdit(rowData)}></Button>
                {rowData?.isActive ? (
                    <Button onClick={() => enableDisable(rowData?._id)} type="button" className="p-button-danger ">
                        Disable
                    </Button>
                ) : (
                    <Button onClick={() => enableDisable(rowData?._id)} type="button" className="p-button-success ">
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
                        {openModal && <CreateCategory openModal={openModal} setOpenModal={setOpenModal} getAllCategory={getAllCategory} />}
                        {editModal && <EditCategory editModal={editModal} setEditModal={setEditModal} getAllCategory={getAllCategory} category={data} />}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Categories;
