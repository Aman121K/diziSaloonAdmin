import React, { useState, useRef, useEffect } from "react";
import { Password } from "primereact/password";
import { Messages } from "primereact/messages";
import { Button } from "primereact/button";
import profile from "../assets/demo/flags/profile.png";
import Constants from "../services/constant";
import { getData, putData, postData } from "../services/http.service";
import { InputText } from "primereact/inputtext";
const Profile = () => {
    const [info, setInfo] = useState({
        name: null,
        mobile: null,
        adminImage: null,
        password: null,
        newPassword: null,
        error: null,
        loading: false,
    });
    const [img, setImg] = useState(null);
    useEffect(() => {
        getAllProfile();
    }, []);

    const getAllProfile = () => {
        getData(Constants.END_POINT.GET_ADMIN_PROFILE)
            .then((res) => {
                console.log("res::", res);
                if (res.success) {
                    setInfo({ ...info, name: res.data.name, mobile: res.data.mobile, adminImage: res.data.adminImage });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateAdminProfile = () => {
        let formdata = new FormData();
        formdata.append("name", info?.name);
        if (img) {
            formdata.append("adminImage", img);
        }
        putData(Constants.END_POINT.UPDATE_ADMIN_PROFILE, formdata)
            .then((res) => {
                console.log("res::", res);
                if (res.success) {
                    getAllProfile();
                    message.current.show({ severity: "success", content: res.message });
                } else {
                    message.current.show({ severity: "error", content: res.message });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updatePassword = () => {
        if (info?.newPassword && info?.password) {
            postData(Constants.END_POINT.CHANGE_PASSWORD, { password: info.password, newPassword: info.newPassword })
                .then((res) => {
                    console.log(res);
                    if (res.success) {
                        message.current.show({ severity: "success", content: res.message });
                    } else {
                        message.current.show({ severity: "error", content: res.message });
                    }
                    setInfo({ ...info, password: "", newPassword: "" });
                })
                .catch((err) => console.log(err));
        }
    };

    const message = useRef();
    return (
        <div className="grid">
            <div className="col-11 md:col-12 mx-auto">
                <div className="card">
                    <h3>Admin Profile </h3>
                    <Messages ref={message} />
                    <div className="p-fluid">
                        <label className="mr-4">Edit Profile Image</label>
                        <div style={{ width: "100px" }}>
                            <label htmlFor="img">
                                <img style={{ width: "100%" }} src={img ? URL.createObjectURL(img) : profile} alt={profile} />
                            </label>
                        </div>

                        <input
                            accept="image/*"
                            className="input-file"
                            id="img"
                            type="file"
                            hidden
                            onChange={(e) => {
                                setImg(e.target.files[0]);
                            }}
                        />
                    </div>
                    <div className="flex p-fluid justify-content-between">
                        <div className="field col-6">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                type="text"
                                value={info.name}
                                onChange={(e) => {
                                    setInfo({ ...info, name: e.target.value });
                                }}
                            />
                        </div>
                        <div className="field col-6">
                            <label htmlFor="mobile">Mobile</label>
                            <InputText
                                id="mobile"
                                type="text"
                                value={info.mobile}
                                onChange={(e) => {
                                    setInfo({ ...info, mobile: e.target.value });
                                }}
                            />
                        </div>
                    </div>

                    <Button label="Save Changes" className="p-button-outlined  p-button-info mb-4" onClick={updateAdminProfile} />
                    <div className="p-fluid flex">
                        <div className="field   col-6">
                            <label htmlFor="password">Old password</label>
                            <Password
                                onChange={(e) => {
                                    setInfo({ ...info, password: e.target.value });
                                }}
                                value={info.password}
                                toggleMask
                                feedback={false}
                            />
                        </div>
                        <div className="field   col-6">
                            <label htmlFor="newPassword"> New Password</label>
                            <Password
                                onChange={(e) => {
                                    setInfo({ ...info, newPassword: e.target.value });
                                }}
                                toggleMask
                                value={info.newPassword}
                                feedback={false}
                            />
                        </div>
                    </div>

                    {info?.loading ? <Button label="Updating Password..."></Button> : <Button className="p-button-info p-button-outlined" type="submit" label="Change Password" onClick={updatePassword}></Button>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
