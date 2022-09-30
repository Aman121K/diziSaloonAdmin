import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { postData } from "../services/http.service";
import Constants from "../services/constant";
import { authenticate, isAuthenticated } from "../services/auth";
import { useHistory, Link } from "react-router-dom";
import { Messages } from "primereact/messages";

const Login = () => {
    useEffect(() => {
        document.documentElement.style.fontSize = 14 + "px";
        if (isAuthenticated()) {
            history.push("/dashboard");
        }
    }, []);
    const [form, setForm] = useState();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
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
        if (!form.email || !form.password) {
            return;
        }
        setLoading(true);
        postData(Constants.END_POINT.SIGIN, form)
            .then((res) => {
                setLoading(false);
                if (res.success) {
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
                setLoading(false);
                console.log(error);
            });
    };

    return (
        <React.Fragment>
            <div className="grid mt-5">
                <div className="col-11 md:col-6 mx-auto">
                    <div className="card p-fluid">
                        <div className="text-center">
                            <img src="assets/layout/images/squareLogo.png" alt="logo" width="15%" />
                            <h2>
                                INSTA<span style={{ color: "#ffdb4d" }}>JAMAICA</span>
                            </h2>
                        </div>
                        <h3>Admin Login</h3>
                        <Messages ref={message} />
                        <form onSubmit={handleSubmit}>
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
                            <div className="field mb-4">
                                <label htmlFor="password">Password</label>
                                <Password
                                    onChange={(e) => {
                                        setField("password", e.target.value);
                                    }}
                                    toggleMask
                                    feedback={false}
                                />
                            </div>

                            {loading ? <Button label="Login..."></Button> : <Button type="submit" label="Login"></Button>}
                        </form>
                        <div className="text-right mt-4">
                            <Link to="/forgetpassword" className="text-decoration-none">
                                &nbsp;
                                <span className="h6 navyColor font_bolder text-right">Forgot Password?</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Login;
