import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import upload from "../assets/demo/flags/folder.png";
import { postData1, putData1 } from "../services/http.service";
import Constants from "../services/constant";

const CreateAndEditSafetyRules = ({ openModal, setOpenModal, getAllAmenity, amenity, id, setId }) => {
    const isEdit = id;
    useEffect(() => {
        if (isEdit) {
            setForm((prevState) => ({
                ...prevState,
                amenityTitle: amenity?.amenityTitle,
                amenityImage: amenity?.amenityImage,
            }));
        } else {
            setForm((prevState) => ({
                ...prevState,
                amenityTitle: "",
                amenityImage: "",
            }));
        }
    }, []);
    const [form, setForm] = useState({
        amenityTitle: "",
        amenityImage: "",
    });
    const [errors, setErrors] = useState({});
    const [img, setImg] = useState();

    const handleFields = (field, value) => {
        setForm((prevState) => ({
            ...prevState,
            [field]: value,
        }));
        if (!!errors[field]) {
            setErrors({
                ...errors,
                [field]: null,
            });
        }
    };
    const validateForm = () => {
        const newErrors = {};
        if (form.amenityTitle === "") {
            newErrors.amenityTitle = "Amenity name is required";
        }
        if (!form.amenityImage) {
            newErrors.amenityImage = "Please upload Image";
        }
        return newErrors;
    };
    const createAmenity = () => {
        const formData = new FormData();
        formData.append("amenityTitle", form.amenityTitle);
        formData.append("amenityImage", form.amenityImage);
        return postData1(Constants.END_POINT.CREATE_AMENITIES, formData)
            .then((res) => {
                if (res.success) {
                    getAllAmenity();
                    setOpenModal(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const updateAmenity = () => {
        const formData = new FormData();
        formData.append("amenityTitle", form.amenityTitle);
        formData.append("amenityImage", form.amenityImage);
        return putData1(Constants.END_POINT.UPDATE_AMINITIES + amenity?._id, formData)
            .then((res) => {
                getAllAmenity();
                setOpenModal(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSave = (e) => {
        e.preventDefault();
        const formError = validateForm();
        if (Object.keys(formError).length > 0) {
            setErrors(formError);
        } else {
            isEdit ? updateAmenity() : createAmenity();
        }
    };
    const basicDialogFooter = <Button type="button" label={isEdit ? "Save" : "Create"} onClick={handleSave} icon="pi pi-check" className="p-button-info" />;
    const handleFiles = (e) => {
        handleFields("amenityImage", e.target.files[0]);
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    };
    return (
        <Dialog
            header={isEdit ? "Edit  Amenity" : "Add  Amenity"}
            visible={openModal}
            style={{ width: "30vw" }}
            modal
            footer={basicDialogFooter}
            onHide={() => {
                setOpenModal(false);
                setId(null);
            }}
        >
            <div>
                <h6>Name</h6>
                <InputText id="username" type="text" style={{ width: "100%" }} value={form?.amenityTitle} onChange={(e) => handleFields("amenityTitle", e.target.value)} />
                {errors?.amenityTitle && (
                    <div
                        style={{
                            color: "red",
                            fontSize: "14px",
                            fontWeight: "600",
                            marginTop: "10px",
                        }}
                    >
                        {errors?.amenityTitle}
                    </div>
                )}
            </div>
            <div className="mt-2">
                <h6>Image</h6>
                <span className="p-label flex justify-content-between">
                    <label htmlFor="uploadimg">
                        <img src={upload} alt="" width="50px" height="50px"></img>
                    </label>
                    <input
                        id="uploadimg"
                        type="file"
                        accept="image/*"
                        placeholder="Blog Image "
                        hidden
                        onChange={(e) => {
                            handleFiles(e);
                        }}
                        style={{ color: "#0a083b", marginTop: "20px" }}
                    />

                    {isEdit ? <img src={img ? img : Constants.BASE_URL + form?.amenityImage} alt="" width="100px" height="85px" /> : <p>{form?.amenityImage.name}</p>}
                </span>
                <span className="p-label"></span>
            </div>
            {errors?.amenityImage && (
                <div
                    style={{
                        color: "red",
                        fontSize: "14px",
                        fontWeight: "600",
                        marginTop: "10px",
                    }}
                >
                    {errors?.amenityImage}
                </div>
            )}
        </Dialog>
    );
};

export default CreateAndEditSafetyRules;
