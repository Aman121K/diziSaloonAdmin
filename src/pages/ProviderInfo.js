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

    const [layout, setLayout] = useState("grid");

    useEffect(() => {
        getAllProfile();
    }, []);

    const getAllProfile = () => {
        getData(Constants.END_POINT.GET_PROVIDER + id)
            .then((res) => {
                console.log("res::", res);
                if (res.success) {
                    setInfo(res?.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    let data = info;

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
            <div className="col-12 md:col-4 mx-auto">
                <div className="card">
                    <h3>Provider Information </h3>
                    <Messages ref={message} />
                    <div className="p-fluid">{info?.business?.businessName}</div>
                    <div className="col-12">
                        <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
                            <img src={info?.business?.image} alt={"hghj"} className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
                            <div className="flex-1 text-center md:text-left">
                                <div className="font-bold text-2xl">{info?.business?.businessName}</div>
                                <div className="mb-3">{info?.firstName}</div>
                                <Rating value={info?.business?.rating} readonly cancel={false} className="mb-2"></Rating>
                                <div className="flex align-items-center">
                                    <i className="pi pi-tag mr-2"></i>
                                    <span className="font-semibold">{info?.business?.ff}</span>
                                </div>
                            </div>
                            <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                                <span className="text-2xl font-semibold mb-2 align-self-center md:align-self-end">${info?.business?.startingPrice}</span>
                                <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={true === "OUTOFSTOCK"} className="mb-2"></Button>
                                <span className={`product-badge status-${info?.business?.inventoryStatus}`}>{info?.business?.inventoryStatus}</span>
                            </div>
                        </div>
                    </div>

                    <Accordion multiple>
                        <AccordionTab header="About Us">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
                            five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                            including versions of Lorem Ipsum.
                        </AccordionTab>
                        {/* <AccordionTab header="Timings"> Working Hours{timings?.map((item, index) => item.weekDay)}</AccordionTab> */}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default ProviderInfo;
