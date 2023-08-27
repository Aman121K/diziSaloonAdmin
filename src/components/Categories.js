import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import { getData } from "../services/http.service";
import Constants from "../services/constant";
import list from "../assets/demo/flags/list.png";
import { Button } from "primereact/button";
import CreateAndEditCategory from "../modals/CreateAndEditCategory";
import moment from 'moment';
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
    const [openModal, setOpenModal] = useState(null);
    const [id, setId] = useState(null);
    const [data, setData] = useState();

    const handleEdit = (rowData) => {
        console.log(rowData);
        setOpenModal(true);
        setId(rowData?._id);
        setData(rowData);
    };
    const enableDisable = (id) => {
        getData(Constants.END_POINT.ENABLE_DISABLE_CATEGORY + id)
            .then((res) => {
                getAllCategory();
            })
            .catch((err) => console.log(err));
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

    console.log("all category>>", category)
    return (
        <React.Fragment>
            <div className="grid table-demo">
                <div className="col-12">
                    <div className="card">
                        <div className="flex justify-content-between mb-4">
                            <h5>Categories</h5>
                            <Button icon="pi pi-plus" label="Create Category" onClick={() => setOpenModal(true)} />
                        </div>

                        <DataTable value={category} responsiveLayout="scroll" paginator rows={8}>
                            <Column field="title" header="Name" style={{ width: "35%" }}></Column>
                            <Column field="description" header="Description" style={{ width: "35%" }}></Column>
                            <Column
                                field="createdAt"
                                header="CreatedDate"
                                body={(rowData) => moment(rowData.createdAt).format('YYYY-MM-DD')}
                            />
                            <Column header="Image" body={imageBodyTemplate} style={{ width: "35%" }} />
                            <Column header="Action" body={actionTemplate} style={{ width: "25%" }} />
                        </DataTable>
                        {openModal && <CreateAndEditCategory openModal={openModal} setOpenModal={setOpenModal} getAllCategory={getAllCategory} category={data} id={id} setId={setId} />}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Categories;
