import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ForgetKey from "../assets/demo/flags/forget.png";

const ForgotPassword = () => {
    const [loading, setLoading] = useState();
    return (
        <div className="grid mt-5">
            <div className="col-11 md:col-6 mx-auto">
                <div className="card p-fluid">
                    <div className="text-center">
                        <img src={ForgetKey} alt="" />
                        <h2>
                            Forgot<span style={{ color: "#d4c526" }}>Password</span>
                        </h2>
                    </div>

                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" type="text" />
                    </div>

                    {loading ? <Button label="Reset Password..."></Button> : <Button type="submit" label="Reset Password"></Button>}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
