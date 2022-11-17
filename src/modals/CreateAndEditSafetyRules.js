import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import upload from "../assets/demo/flags/folder.png";
import { postData, putData } from "../services/http.service";
import Constants from "../services/constant";

const CreateAndEditSafetyRules = ({ openModal, setOpenModal, getAllSafetyRules, safetyRules, id, setId }) => {
    const isEdit = id;
    useEffect(() => {
        if (isEdit) {
            setForm((prevState) => ({
                ...prevState,
                safetyRuleTitle: safetyRules?.safetyRuleTitle,
            }));
        } else {
            setForm((prevState) => ({
                ...prevState,
                safetyRuleTitle: "",
            }));
        }
    }, []);
    const [form, setForm] = useState({
        safetyRuleTitle: "",
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
        if (form.safetyRuleTitle === "") {
            newErrors.safetyRuleTitle = "Safety Rules  name is required";
        }
       
        return newErrors;
    };
    const createSafetyRules = () => {
        return postData(Constants.END_POINT.CREATE_SAFETY_RULES, {safetyRuleTitle:form?.safetyRuleTitle})
            .then((res) => {
                if (res.success) {
                    getAllSafetyRules();
                    setOpenModal(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const updateSafetyRules = () => {
        return putData(Constants.END_POINT.UPDATE_SAFETY_RULES + safetyRules?._id, {safetyRuleTitle:form?.safetyRuleTitle})
            .then((res) => {
                getAllSafetyRules();
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
            isEdit ? updateSafetyRules() : createSafetyRules();
        }
    };
    const basicDialogFooter = <Button type="button" label={isEdit ? "Save" : "Create"} onClick={handleSave} icon="pi pi-check" className="p-button-info" />;
  
    return (
        <Dialog
            header={isEdit ? "Edit  Safety Rules" : "Add  Safety Rules"}
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
                <InputText id="username" type="text" style={{ width: "100%" }} value={form?.safetyRuleTitle} onChange={(e) => handleFields("safetyRuleTitle", e.target.value)} />
                {errors?.safetyRuleTitle && (
                    <div
                        style={{
                            color: "red",
                            fontSize: "14px",
                            fontWeight: "600",
                            marginTop: "10px",
                        }}
                    >
                        {errors?.safetyRuleTitle}
                    </div>
                )}
            </div>
            
        </Dialog>
    );
};

export default CreateAndEditSafetyRules;
