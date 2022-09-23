import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import upload from "../assets/demo/flags/folder.png";
import { postData1, putData1 } from "../services/http.service";
import Constants from "../services/constant";

const EditCategory = ({ editModal, setEditModal, category, getAllCategory }) => {
    const [form, setForm] = useState({
        categoryName: category?.categoryName,
        categoryImage: category?.categoryImage,
    });
    const [img, setImg] = useState();

    console.log("editModal", Constants.END_POINT.UPDATE_CATEGORY);

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
        putData1(Constants.END_POINT.UPDATE_CATEGORY + "/" + category?._id, formData)
            .then((res) => {
                getAllCategory();
                setEditModal(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const basicDialogFooter = <Button type="button" label="Save" onClick={handleSave} icon="pi pi-check" className="p-button-info" />;
    const handleFiles = (e) => {
        handleFields("categoryImage", e.target.files[0]);
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    };
    return (
        <Dialog header="Edit Category" visible={editModal} style={{ width: "30vw" }} modal footer={basicDialogFooter} onHide={() => setEditModal(null)}>
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

                    <p>{form?.categoryImage}</p>
                </span>
                <span className="p-label"></span>
            </div>
        </Dialog>
    );
};

export default EditCategory;
