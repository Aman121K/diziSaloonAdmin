import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import upload from "../assets/demo/flags/folder.png";
import { postData1 } from "../services/http.service";
import Constants from "../services/constant";

const CreateCategory = ({ openModal, setOpenModal, getAllCategory }) => {
    const [form, setForm] = useState({
        categoryName: "",
        categoryImage: "",
    });

    const handleFields = (field, value) => {
        setForm((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    const handleSave = (e) => {
        e.preventDefault();
        if (!form.categoryName || !form.categoryImage) {
            return;
        }
        const formData = new FormData();
        formData.append("categoryName", form.categoryName);
        formData.append("categoryImage", form.categoryImage);
        postData1(Constants.END_POINT.CREATE_CATEGORY, formData)
            .then((res) => {
                if (res.success) {
                    getAllCategory();
                    setOpenModal(false);
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const basicDialogFooter = <Button type="button" label="Save" onClick={handleSave} icon="pi pi-check" className="p-button-info" />;
    const handleFiles = (e) => {
        handleFields("categoryImage", e.target.files[0]);
    };
    return (
        <Dialog header="Create Category" visible={openModal} style={{ width: "30vw" }} modal footer={basicDialogFooter} onHide={() => setOpenModal(false)}>
            <div>
                <h6> Name</h6>
                <InputText id="username" type="text" style={{ width: "100%" }} value={form?.categoryName} onChange={(e) => handleFields("categoryName", e.target.value)} />
            </div>
            <div>
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

                    <p>{form?.categoryImage.name}</p>
                </span>
                <span className="p-label"></span>
            </div>
        </Dialog>
    );
};

export default CreateCategory;
