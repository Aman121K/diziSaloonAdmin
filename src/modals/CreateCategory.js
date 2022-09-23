import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import list from "../assets/demo/flags/list.png";

const CreateCategory = ({ openModal, setOpenModal }) => {
    const basicDialogFooter = <Button type="button" label="Save" onClick={() => setOpenModal(false)} icon="pi pi-check" className="p-button-info" />;

    return (
        <div className="grid">
            <div className="col-12 lg:col-6">
                <div className="card p-fluid">
                    <h5>Create Category</h5>
                    <Dialog header="Create Category" visible={openModal} style={{ width: "30vw" }} modal footer={basicDialogFooter} onHide={() => setOpenModal(false)}>
                        <div>
                            <h6> Name</h6>
                            <InputText id="username" type="text" style={{ width: "100%" }} />
                        </div>
                        <div>
                            <h6>Image</h6>
                            <span className="p-label flex justify-content-between">
                                <FileUpload name="demo" url="./upload" mode="basic" previewWidth={40}></FileUpload>
                                <img src={list} alt="" width="45px" height="40px" />
                            </span>
                            <span className="p-label"></span>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
