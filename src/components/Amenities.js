import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getData, putData } from "../services/http.service";
import Constants from "../services/constant";
import list from "../assets/demo/flags/list.png";
import { Button } from "primereact/button";
import CreateAndEditAmenity from "../modals/CreateAndEditAmenity";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

const Amenities = () => {
    useEffect(() => {
        getAllAmenity();
    }, []);

    const getAllAmenity = () => {
        getData(Constants.END_POINT.GET_ALL_AMENITIES)
            .then((res) => {
                setAmenity(res.data);
            })
            .catch((err) => console.log(err));
    };

    const [amenity, setAmenity] = useState(null);
    const [openModal, setOpenModal] = useState(null);
    const [id, setId] = useState(null);
    const [data, setData] = useState();

    const handleEdit = (rowData) => {
        setOpenModal(true);
        setId(rowData?._id);
        setData(rowData);
    };
    const deleteAmenities = (id) => {
        putData(Constants.END_POINT.DELETE_AMENITIES + id)
            .then((res) => {
                if (res.success) {
                    toast.current.show({ severity: "info", summary: "Confirmed", detail: "Amenity has been Deleted Succesfully", life: 3000 });
                }
                getAllAmenity();
            })
            .catch((err) => console.log(err));
    };
    const toast = useRef(null);

    const reject = () => {
        toast.current.show({ severity: "warn", summary: "Rejected", detail: "You have rejected", life: 3000 });
    };
    const deletepopup = (event, position) => {
        confirmDialog({
            message: "Do you want to delete this Amenity?",
            icon: "pi pi-info-circle",
            header: "Delete Confirmation",
            acceptClassName: "p-button-danger",
            position,
            accept: () => deleteAmenities(event, position),
            reject,
        });
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.amenityImage ? Constants.BASE_URL + rowData.amenityImage : list} alt={rowData.amenityImage} width={50} />;
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
                            <h5>Amenities</h5>
                            <Button icon="pi pi-plus" label="Create Amenities" onClick={() => setOpenModal(true)} />
                        </div>

                        <DataTable value={amenity} responsiveLayout="scroll" paginator rows={8}>
                            <Column field="amenityTitle" header="Name" style={{ width: "35%" }}></Column>
                            <Column header="Image" body={imageBodyTemplate} style={{ width: "35%" }} />
                            <Column header="Action" body={actionTemplate} style={{ width: "25%" }} />
                        </DataTable>
                        {openModal && <CreateAndEditAmenity openModal={openModal} setOpenModal={setOpenModal} getAllAmenity={getAllAmenity} amenity={data} id={id} setId={setId} />}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Amenities;
