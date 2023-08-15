import React, { useState, useEffect, useLayoutEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import upload from "../assets/demo/flags/folder.png";
import { postData1, putData1 } from "../services/http.service";
import Constants from "../services/constant";
import { Token } from "prismjs";

const CreateAndEditArtical = ({ openModal, setOpenModal, getAllCategory, category, id, setId }) => {
    const isEdit = id;
    const [token,setTokem]=React.useState();
    useLayoutEffect(()=>{
        getLocalData()
    },[])
    const  getLocalData=async()=>{
        let newToken= await localStorage.getItem('token');
        console.log("new token>>",newToken)
        if(newToken){
            setTokem(newToken)
        }
    }
    useEffect(() => {
        if (isEdit) {
            setForm((prevState) => ({
                ...prevState,
                categoryName: category?.categoryName,
                categoryImage: category?.categoryImage,
            }));
        } else {
            setForm((prevState) => ({
                ...prevState,
            }));
        }
    }, []);
    const [form, setForm] = useState({});
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
        if (form.categoryName === "") {
            newErrors.categoryName = "Artical Title is required";
        }
        if (!form.categoryImage) {
            newErrors.categoryImage = "Artical description is required";
        }
        return newErrors;
    };
    const createCategory = () => {
        console.log("form is>>",form)
        const formData = new FormData();
        formData.append("title", form.categoryName);
        formData.append("description", form.description);
        formData.append("coverImage", form.coverImage);
        return postData1(Constants.END_POINT.CREATE_ARTICAL, formData,token)
            .then((res) => {
                if (res.success) {
                    getAllCategory();
                    setOpenModal(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const updateCategory = () => {
        const formData = new FormData();
        formData.append("categoryName", form.categoryName);
        formData.append("categoryImage", form.categoryImage);
        return putData1(Constants.END_POINT.UPDATE_CATEGORY + category?._id, formData)
            .then((res) => {
                getAllCategory();
                setOpenModal(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSave = (e) => {
        e.preventDefault();
        createCategory()
        // const formError = validateForm();
        // if (Object.keys(formError).length > 0) {
        //     setErrors(formError);
        // } else {
        //     isEdit ? updateCategory() : createCategory();
        // }
    };
    const basicDialogFooter = <Button type="button" label={isEdit ? "Save" : "Create"} onClick={handleSave} icon="pi pi-check" className="p-button-info" />;
    const handleFiles = (e) => {
        handleFields("coverImage", e.target.files[0]);
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    };
    return (
        <Dialog
            header={isEdit ? "Edit  Category" : "Add Category"}
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
                <h6> Name</h6>
                <InputText id="username" type="text" style={{ width: "100%" }} value={form?.title} onChange={(e) => handleFields("title", e.target.value)} />
                {errors?.categoryName && (
                    <div
                        style={{
                            color: "red",
                            fontSize: "14px",
                            fontWeight: "600",
                            marginTop: "10px",
                        }}
                    >
                        {errors?.categoryName}
                    </div>
                )}
            </div>
            <div>
                <h6>Description</h6>
                <InputText id="Description" type="text" style={{ width: "100%" }} value={form?.description} onChange={(e) => handleFields("description", e.target.value)} />
                {errors?.description && (
                    <div
                        style={{
                            color: "red",
                            fontSize: "14px",
                            fontWeight: "600",
                            marginTop: "10px",
                        }}
                    >
                        {errors?.description}
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

                    {isEdit ? <img src={img ? img : Constants.BASE_URL + form?.categoryImage} alt="" width="100px" height="85px" /> : <p>{form?.coverImage?.name}</p>}
                </span>
                <span className="p-label"></span>
            </div>
            {errors?.categoryImage && (
                <div
                    style={{
                        color: "red",
                        fontSize: "14px",
                        fontWeight: "600",
                        marginTop: "10px",
                    }}
                >
                    {errors?.categoryImage}
                </div>
            )}
        </Dialog>
    );
};

export default CreateAndEditArtical;
