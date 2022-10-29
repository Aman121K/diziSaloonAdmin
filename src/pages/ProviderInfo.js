import React, { useState, useRef, useEffect } from "react";
import { Password } from "primereact/password";
import { Messages } from "primereact/messages";
import { Button } from "primereact/button";
import profile from "../assets/demo/flags/profile.png";
import Constants from "../services/constant";
import { getData, putData, postData } from "../services/http.service";
import { InputText } from "primereact/inputtext";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useParams } from "react-router-dom";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";

const ProviderInfo = () => {
    const [info, setInfo] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getAllProfile();
    }, []);
    console.log("info::", info);

    const getAllProfile = () => {
        getData(Constants.END_POINT.GET_PROVIDER + id)
            .then((res) => {
                if (res.success) {
                    setInfo(res?.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const message = useRef();
    return (
        <div className="grid">
            <div className="col-12 md:col-8 mx-auto">
                <div className="card">
                    <h3>Provider Info </h3>
                    <Messages ref={message} />
                    <div className="p-fluid">
                        <label className="mr-4"> Image</label>
                        <div style={{ width: "100px" }}>
                            <label htmlFor="img">
                                <img style={{ width: "100%" }} src={profile} alt={profile} />
                            </label>
                        </div>
                    </div>
                    <div className="flex p-fluid justify-content-between">
                        <div className="field col-6">
                            <label htmlFor="name"> FirstName</label>
                        </div>
                        <div className="field col-6">
                            <label htmlFor="name"> LastName</label>
                        </div>
                    </div>

                    <div className="p-fluid flex">
                        <div className="field   col-6">
                            <label htmlFor="password">Mobile</label>
                        </div>
                        <div className="field col-6">
                            <label htmlFor="mobile">Email</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-4">
                <div className="card m-3 border-1 surface-border">
                    <h3>Provider Information </h3>

                    <div className="flex align-items-center justify-content-between">
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2" />
                            <span className="font-semibold">business</span>
                        </div>
                        <span className={`product-badge status-${info?.business?.isVerified ? "instock" : "outofstock"}`}> Not Verified</span>
                    </div>
                    <div className="text-center">
                        <img src={Constants?.BASE_URL + info?.image} alt="" className="w-9 shadow-2 my-3 mx-0" />
                        <div className="text-2xl font-bold">{info?.business?.businessName}</div>

                        <Rating value={info?.business?.rating} readonly cancel={false} />
                    </div>
                    <div className="mt-4">
                        <Accordion multiple>
                            <AccordionTab header="About Us">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                                only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                                PageMaker including versions of Lorem Ipsum.
                            </AccordionTab>
                            {/* <AccordionTab header="Timings"> Working Hours{timings?.map((item, index) => item.weekDay)}</AccordionTab> */}
                        </Accordion>
                    </div>

                    {/* <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${info?.business?.price}</span>
                        <Button icon="pi pi-shopping-cart" disabled={info?.business?.inventoryStatus === "OUTOFSTOCK"} />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ProviderInfo;
