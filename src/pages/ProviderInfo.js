import React, { useState, useRef, useEffect } from "react";
import { Messages } from "primereact/messages";
import Constants from "../services/constant";
import { getData } from "../services/http.service";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useParams } from "react-router-dom";
import { Rating } from "primereact/rating";
import Instagram from "../../src/assets/demo/flags/Instagram.png";
import FaceBook from "../../src/assets/demo/flags/Facebook.png";
import Share from "../../src/assets/demo/flags/Share.png";
import Website from "../../src/assets/demo/flags/Website.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import business from "../../src/assets/demo/flags/business.png";

const ProviderInfo = () => {
    const [info, setInfo] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getAllProfile();
    }, []);

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
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const convertTime24to12 = (time24h) => {
        let time = time24h.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time24h];

        if (time.length > 1) {
            time = time.slice(1, -1);
            time[5] = +time[0] < 12 ? "AM" : "PM";
            time[0] = +time[0] % 12 || 12;
        }
        return time.join("");
    };
    const formatCurrency = (value) => {
        return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
    };
    const SafetyRules = ["Employee wear Mask", "Mask available for purchase", "Client temperature checks"];
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(parseFloat(rowData.price));
    };
    const durationBodyTemplate = (rowData) => {
        return rowData?.durationTime + "min";
    };
    const message = useRef();
    return (
        <div className="grid">
            <div className="col-12 md:col-8 mx-auto">
                <div className="card">
                    <h3>Service Information </h3>
                    <Messages ref={message} />
                    {info?.services?.length > 0 ? (
                        <DataTable value={info?.services}>
                            <Column field="serviceName" header="Service Name"></Column>
                            <Column field="price" body={priceBodyTemplate} header="Price"></Column>
                            <Column field="durationTime" body={durationBodyTemplate} header="Duration Time"></Column>
                        </DataTable>
                    ) : (
                        "No services Found"
                    )}
                </div>
                <div className="card">
                    <h3>Documents </h3>
                    <div className="card  "></div>
                    <div className="card "></div>
                    <div className="card "></div>
                </div>
            </div>
            <div className="col-12 md:col-4">
                <div className="card">
                    <h3>Provider Information </h3>
                    <div className="text-xl font-bold">{info?.firstName}</div>
                    <a href={`mailto:${info?.email}`}>{info?.email}</a>

                    <div className="flex align-items-center justify-content-between">
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2" />
                            <span className="font-semibold">business</span>
                        </div>
                        <span className={`product-badge status-${info?.business?.isVerified ? "instock" : "outofstock"}`}> Not Verified</span>
                    </div>
                    <div className="text-center">
                        <img src={info?.business?.image ? Constants?.BASE_URL + info?.business?.image : business} alt="" className="w-9 shadow-2 my-3 mx-0" />
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
                            <AccordionTab header="Working Hours">
                                {info?.business?.timings?.map((timing, i) => {
                                    console.log("timing::", timing);
                                    return (
                                        <div className="col-12 flex">
                                            {weekDays[timing.weekDay]}
                                            <span>&nbsp; : </span>
                                            <div>
                                                {convertTime24to12(timing?.startTime)} - {convertTime24to12(timing?.endTime)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </AccordionTab>
                            <AccordionTab header="Social Media and Share">
                                <div className="flex">
                                    <img src={Instagram} alt="" width="55px"></img>
                                    <img src={FaceBook} alt="" width="55px"></img>
                                    <img src={Website} alt="" width="55px"></img>
                                    <img src={Share} alt="" width="55px"></img>
                                </div>
                            </AccordionTab>
                            <AccordionTab header="Safety Rules">
                                <div className="flex">
                                    <ul>
                                        {SafetyRules?.map((rules, i) => (
                                            <li>{rules}</li>
                                        ))}
                                    </ul>
                                </div>
                            </AccordionTab>
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
