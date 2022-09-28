import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ForgetKey from "../assets/demo/flags/forget.png";
import { Password } from "primereact/password";
import { postData } from "../services/http.service";
import Constants from "../services/constant";
import { Messages } from "primereact/messages";
import { useHistory } from "react-router-dom";
import { Toast } from "primereact/toast";

const ForgotPassword = () => {
    const [loading, setLoading] = useState();
    const [data, setData] = useState({
        email: "",
        otpcode: "",
        password: "",
        confirmPassword: "",
    });
    const history = useHistory();
    const [forgetPassword, setForgetPassword] = useState();
    const [err, setErr] = useState({});

    const message = useRef();
    const toast = useRef(null);
    console.log("toast::", toast);

    const addErrorMessage = (msg) => {
        message.current.show({ severity: "error", content: msg });
    };

    const showSuccess = () => {
        toast.current.show({ severity: "success", summary: "Sent Successfully", detail: "OTP has been sent to your email" });
    };
    const validateForm = () => {
        let errors = {};
        if (!data.otpcode) {
            errors.email = "OTP is required";
        } else if (!/^[0-9]{6}$/.test(data.otpcode)) {
            errors.email = "Enter Valid Otp";
        }
        //Email field

        //Password field

        if (!data.password) {
            errors.password = "Password is required";
        }
        setErr(errors);
        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    };

    const email = data?.email;
    const handleForgot = (e) => {
        e.preventDefault();
        postData(Constants.END_POINT.FORGOT_PASSWORD, { email })
            .then((res) => {
                if (res.success) {
                    showSuccess();
                    setTimeout(() => setForgetPassword(res.data.email), 100);
                    setForgetPassword(res.data.email);
                } else {
                    addErrorMessage(res.message);
                }

                console.log(res);
            })
            .catch((err) => console.log(err));
    };
    const handleResetPassword = (e) => {
        e.preventDefault();
        const form = validateForm();
        if (!form) {
        } else {
            postData(Constants.END_POINT.RESET_PASSWORD, { email: data?.email, otpcode: data?.otpcode, password: data?.password })
                .then((res) => {
                    if (res.success) {
                        toast.current.show({ severity: "success", summary: "Success Message", detail: "Order submitted" });

                        setTimeout(() => history.push("/login"), 500);
                    } else {
                        addErrorMessage(res.message);
                    }
                    console.log(res);
                })
                .catch((err) => console.log(err));
        }
    };
    const sendEmail = () => {
        return (
            <div className="card p-fluid">
                <div className="text-center">
                    <img src={ForgetKey} alt="" />

                    <h2>
                        Forgot<span style={{ color: "#d4c526" }}>Password</span>
                    </h2>
                    <Messages ref={message} />
                </div>

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <InputText
                        id="email"
                        value={data?.email}
                        onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                        }}
                    />
                </div>

                {loading ? <Button label="Send OTP..."></Button> : <Button type="submit" label="Send OTP" onClick={handleForgot}></Button>}
            </div>
        );
    };
    const OTPBox = () => {
        return (
            <div className="card p-fluid">
                <div className="text-center">
                    <img src={ForgetKey} alt="" />
                    <h2>
                        Forgot<span style={{ color: "#d4c526" }}>Password</span>
                    </h2>
                </div>

                <div className="field">
                    <label htmlFor="otpcode"> Enter Your Otp</label>
                    <InputText
                        id="otpcode"
                        value={data?.otpcode}
                        onChange={(e) => {
                            setData({ ...data, otpcode: e.target.value });
                        }}
                    />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <Password
                        toggleMask
                        feedback={false}
                        onChange={(e) => {
                            setData({ ...data, password: e.target.value });
                        }}
                    />
                </div>
                <div className="field">
                    <label htmlFor="password"> Confirm Password</label>
                    <Password
                        toggleMask
                        feedback={false}
                        onChange={(e) => {
                            setData({ ...data, confirmPassword: e.target.value });
                        }}
                    />
                </div>

                {loading ? <Button label="Reset Password..."></Button> : <Button type="submit" label="Reset Password" onClick={handleResetPassword}></Button>}
            </div>
        );
    };
    return (
        <div className="grid mt-5">
            <Toast ref={toast} />

            <div className="col-11 md:col-6 mx-auto">{forgetPassword ? OTPBox() : sendEmail()}</div>
        </div>
    );
};

export default ForgotPassword;
