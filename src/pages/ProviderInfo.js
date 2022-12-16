import React, { useState, useRef, useEffect } from "react";
import { Messages } from "primereact/messages";
import Constants from "../services/constant";
import { getData, postData } from "../services/http.service";
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
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Image } from "primereact/image";
import { convertTime24to12 } from "../utils";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { Link } from "react-router-dom";
import MapContainer from "./MapContainer";

const ProviderInfo = () => {
    const [info, setInfo] = useState({});
    const [bookings, setBookings] = useState();
    const [filterdate, setFilterDate] = useState({
        bookingsFrom: null,
        bookingsTo: null,
    });
    const { id } = useParams();

    useEffect(() => {
        if (filterdate?.bookingsTo) {
            getProviderBooking1();
        }
    }, [filterdate]);

    useEffect(() => {
        getAllProfile();
        getProviderBooking();
    }, []);
    function dateTemplate(date) {
        return date.day;
    }
    const handleChange = (name) => (event) => {
        let value = event.target.value;
        setFilterDate({ ...filterdate, [name]: value });
    };
    const bookingDateTemplate = (rowData) => {
        return moment(rowData?.bookingDate).format("DD-MM-YYYY");
    };
    let { bookingsFrom, bookingsTo } = filterdate;
    bookingsFrom = moment(new Date(bookingsFrom)).format("DD-MM-YYYY");
    bookingsTo = moment(new Date(bookingsTo)).format("DD-MM-YYYY");

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
    const getProviderBooking = () => {
        postData(Constants.END_POINT.GET_PROVIDER_BOOKINGS + id)
            .then((res) => {
                setBookings(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getProviderBooking1 = () => {
        postData(Constants.END_POINT.GET_PROVIDER_BOOKINGS + id, { bookingsFrom: bookingsFrom, bookingsTo: bookingsTo })
            .then((res) => {
                setBookings(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const toast = useRef(null);

    const verifyBusinessProvider = (business_status) => {
        postData(Constants.END_POINT.VERIFY_BUSINESS_PROVIDER + info?.business?._id, { isVerified: business_status })
            .then((res) => {
                const msg = res?.data?.isVerified;

                toast.current.show({ severity: "success", summary: ` Status ${msg === "VERIFIED" ? "Approved" : "Rejected"}`, detail: "verification status updated Successfully" });
                getAllProfile();
            })
            .catch((err) => console.log(err));
    };
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
    const startTime = (rowData) => {
        return convertTime24to12(rowData?.startTime);
    };
    const userBodyTemplate = (rowData) => {
        return rowData?.provider?.firstName;
    };
    const statusbodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.status === "CONFIRMED" ? "instock" : "outofstock"}`}>{rowData.status}</span>;
    };
    const message = useRef();
    console.log(info);
    return (
        <div className="grid">
            <div className="col-12 md:col-8 mx-auto ">
                <div className="">
                    <Toast ref={toast} />
                    <MapContainer coordinates={info?.business?.location?.coordinates} />
                    <Accordion multiple className="mt-3">
                        <AccordionTab header="Services">
                            {info?.services?.length > 0 ? (
                                <div className="">
                                    <h3>Service Information </h3>
                                    <Messages ref={message} />
                                    <DataTable value={info?.services}>
                                        <Column field="serviceName" header="Service Name"></Column>
                                        <Column field="price" body={priceBodyTemplate} header="Price"></Column>
                                        <Column field="durationTime" body={durationBodyTemplate} header="Duration Time"></Column>
                                    </DataTable>
                                </div>
                            ) : (
                                "No service Found"
                            )}
                        </AccordionTab>

                        <AccordionTab header="Bookings">
                            {bookings?.length ? (
                                <>
                                    <div className="flex">
                                        <div>
                                            <label>From Date</label>
                                            <Calendar name="bookingsFrom" value={filterdate?.bookingsFrom} onChange={handleChange("bookingsFrom")} dateTemplate={dateTemplate} />
                                        </div>
                                        <div>
                                            <label>To Date</label>
                                            <Calendar name="bookingsTo" value={filterdate?.bookingsTo} onChange={handleChange("bookingsTo")} dateTemplate={dateTemplate} />
                                        </div>
                                    </div>

                                    <DataTable value={bookings}>
                                        <Column body={bookingDateTemplate} header="Booking Date"></Column>
                                        <Column body={startTime} header="Start Time"></Column>
                                        <Column body={statusbodyTemplate} header="Status"></Column>
                                        <Column body={userBodyTemplate} header="Provider"></Column>
                                        <Column field="duration" header="Duration"></Column>
                                    </DataTable>
                                </>
                            ) : (
                                "No Bookings Found"
                            )}
                        </AccordionTab>
                        <AccordionTab header="Documents">
                            {info?.documents ? (
                                <>
                                    <div className="flex">
                                        <h3>Documents </h3>
                                        <div className="ml-4">
                                            <Button
                                                type="button"
                                                className="p-button-raised p-button-rounded  p-button-outlined p-button-info"
                                                onClick={() => {
                                                    verifyBusinessProvider("VERIFIED");
                                                }}
                                            >
                                                Approve
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                type="button"
                                                className="p-button-raised p-button-rounded  p-button-outlined p-button-danger ml-2"
                                                onClick={() => {
                                                    verifyBusinessProvider("REJECTED");
                                                    getAllProfile();
                                                }}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    </div>

                                    <div>
                                        <div className=" card my-4 text-center ">
                                            <div className="flex justify-content-around">
                                                <div>
                                                    <div>Front</div>
                                                    {info?.documents?.front ? <Image src={Constants?.BASE_URL + info?.documents?.front} alt="galleria" width="150px" preview /> : null}
                                                </div>
                                                <div>
                                                    <div>Back</div>
                                                    {info?.documents?.back ? <Image src={Constants?.BASE_URL + info?.documents?.back} alt="galleria" width="150px" preview /> : null}
                                                </div>
                                                <div>
                                                    <div>Selfie</div>
                                                    {info?.documents?.selfie ? <Image src={Constants?.BASE_URL + info?.documents?.selfie} alt="galleria" width="150px" preview /> : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                "No Documents Found"
                            )}
                        </AccordionTab>
                    </Accordion>
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
                        <span className={`customer-badge status-${info?.business?.isVerified === "VERIFIED" ? "qualified" : info?.business?.isVerified === "SUBMITTED" ? "proposal" : info?.business?.isVerified === "NOT_VERIFIED" ? "new" : "unqualified"}`}> {info?.business?.isVerified}</span>
                    </div>
                    <div className="text-center">
                        <img src={info?.business?.image ? Constants?.BASE_URL + info?.business?.image : business} alt="" className="w-9 shadow-2 my-3 mx-0" />
                        <div className="text-2xl font-bold">{info?.business?.businessName}</div>

                        <Rating value={info?.business?.rating} readonly cancel={false} />
                    </div>
                    <div className="mt-4">
                        <Accordion multiple>
                            <AccordionTab header="About Us">{info?.business?.about && <div>{info?.business?.about}</div>}</AccordionTab>
                            <AccordionTab header="Working Hours">
                                {info?.business?.timings?.map((timing, i) => {
                                    console.log(timing?.isClosed);
                                    return (
                                        <div className="col-6 flex">
                                            <div className="w-25">{weekDays[timing.weekDay]}</div>
                                            <div className="w-75">: {timing?.isClosed ? <span className="text-danger">Closed</span> : convertTime24to12(timing?.startTime) + "-" + convertTime24to12(timing?.endTime)}</div>
                                        </div>
                                    );
                                })}
                            </AccordionTab>
                            <AccordionTab header="Social Media and Share">
                                <div className="flex justify-content-around">
                                    {info?.business?.instagram ? (
                                        <a href={info?.business?.instagram} target="blank">
                                            <img src={Instagram} alt="" width="55px"></img>
                                        </a>
                                    ) : (
                                        <img src={Instagram} alt="" width="55px"></img>
                                    )}
                                    {info?.business?.facebook ? (
                                        <a href={info?.business?.facebook} target="blank">
                                            <img src={FaceBook} alt="" width="55px"></img>
                                        </a>
                                    ) : (
                                        <img src={FaceBook} alt="" width="55px"></img>
                                    )}
                                    {info?.business?.website ? (
                                        <a href={info?.business?.website} target="blank">
                                            <img src={Website} alt="" width="55px"></img>
                                        </a>
                                    ) : (
                                        <img src={Website} alt="" width="55px"></img>
                                    )}

                                    {info?.business?.share ? (
                                        <a href={info?.business?.share} target="blank">
                                            <img src={Share} alt="" width="55px"></img>
                                        </a>
                                    ) : (
                                        <img src={Share} alt="" width="55px"></img>
                                    )}
                                </div>
                            </AccordionTab>
                            <AccordionTab header="Safety Rules">
                                <div className="flex">
                                    <ul>
                                        {SafetyRules?.map((rules, i) => (
                                            <li key={i}>{rules}</li>
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
