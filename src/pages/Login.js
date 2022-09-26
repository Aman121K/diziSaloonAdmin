import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { postData } from "../services/http.service";
import Constants from "../services/constant";
import { authenticate, isAuthenticated } from "../services/auth";
import { useHistory } from "react-router-dom";
import { Messages } from "primereact/messages";

const Login = () => {
    const [form, setForm] = useState();
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const message = useRef();

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
        if (!!errors[field]) {
            setErrors({
                ...errors,
                [field]: null,
            });
        }
    };
    const addErrorMessage = (msg) => {
        message.current.show({ severity: "error", content: msg });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        postData(Constants.END_POINT.SIGIN, form)
            .then((res) => {
                if (res.success) {
                    console.log(res);
                    authenticate(res, () => {
                        if (isAuthenticated()) {
                            history.push("/dashboard");
                        }
                        if (!isAuthenticated) {
                            history.push("/login");
                        }
                    });
                } else {
                    addErrorMessage(res.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <React.Fragment>
            <div className="grid mt-5">
                <div className="col-11 md:col-6 mx-auto mt-5">
                    <div className="card p-fluid mt-5">
                        <h2 className="text-center">Login</h2>
                        <Messages ref={message} />
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText
                                id="email"
                                type="text"
                                onChange={(e) => {
                                    setField("email", e.target.value);
                                }}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <Password
                                onChange={(e) => {
                                    setField("password", e.target.value);
                                }}
                                toggleMask
                                feedback={false}
                            />
                        </div>

                        <Button onClick={handleSubmit} label="Login"></Button>
                    </div>
                </div>
            </div>

            {/* {didRedirect ? <Redirect to="/dashboard" /> : null} */}
        </React.Fragment>
    );
};
export default Login;
