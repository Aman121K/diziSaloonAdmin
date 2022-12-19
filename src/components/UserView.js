import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Constants from "../services/constant";
import { getData, postData } from "../services/http.service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import { convertTime24to12 } from "../utils";
import { Calendar } from "primereact/calendar";
import MapContainer from "../pages/MapContainer";

const UserView = () => {
    const { id } = useParams();
    const [user, setUser] = useState();
    const [bookings, setBookings] = useState(null);

    useEffect(() => {
        getAllUsers();
        getAllBookings();
    }, []);

    const [datePicker, setDatePicker] = useState({
        bookingsFrom: null,
        bookingsTo: null,
    });
    useEffect(() => {
        if (datePicker?.bookingsTo) {
            getAllBookings1();
        }
    }, [datePicker]);

    const getAllUsers = () => {
        getData(Constants.END_POINT.GET_ALL_USERS + "/" + id)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    };

    const bookingDateTemplate = (rowData) => {
        return moment(rowData?.bookingDate).format("DD-MM-YYYY");
    };
    const startTime = (rowData) => {
        return convertTime24to12(rowData?.startTime);
    };
    const userBodyTemplate = (rowData) => {
        return rowData?.user?.firstName;
    };
    const statusbodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.status === "CONFIRMED" ? "instock" : "outofstock"}`}>{rowData.status}</span>;
    };

    function dateTemplate(date) {
        return date.day;
    }

    const handleChange = (name) => (event) => {
        let value = event.target.value;
        setDatePicker({ ...datePicker, [name]: value });
    };
    let { bookingsFrom, bookingsTo } = datePicker;
    bookingsFrom = moment(new Date(bookingsFrom)).format("DD-MM-YYYY");
    bookingsTo = moment(new Date(bookingsTo)).format("DD-MM-YYYY");

    const getAllBookings = () => {
        postData(Constants.END_POINT.GET_USER_BOOKINGS + id)
            .then((res) => {
                setBookings(res.data);
            })
            .catch((err) => console.log(err));
    };
    const getAllBookings1 = () => {
        postData(Constants.END_POINT.GET_USER_BOOKINGS + id, {
            bookingsFrom: bookingsFrom,
            bookingsTo: bookingsTo,
        })
            .then((res) => {
                setBookings(res.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="grid">
            <div className="col-12 md:col-8 mx-auto">
                <div className="card ">
                    <MapContainer coordinates={user?.business?.location?.coordinates} />
                    <div>
                        <h3>Bookings </h3>

                        {bookings?.length ? (
                            <>
                                <div className="flex">
                                    <div>
                                        <label>From Date</label>
                                        <Calendar name="bookingsFrom" value={datePicker?.bookingsFrom} onChange={handleChange("bookingsFrom")} dateTemplate={dateTemplate} />
                                    </div>
                                    <div>
                                        <label>To Date</label>
                                        <Calendar name="bookingsTo" value={datePicker?.bookingsTo} onChange={handleChange("bookingsTo")} dateTemplate={dateTemplate} />
                                    </div>
                                </div>

                                <DataTable value={bookings}>
                                    <Column body={bookingDateTemplate} header="Booking Date"></Column>
                                    <Column body={startTime} header="Start Time"></Column>
                                    <Column body={statusbodyTemplate} header="Status"></Column>
                                    <Column body={userBodyTemplate} header="User"></Column>
                                    <Column field="duration" header="Duration"></Column>
                                </DataTable>
                            </>
                        ) : (
                            "No Bookings Found"
                        )}
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-4">
                <div className="card">
                    <h3>User Information </h3>
                    <div className="text-xl font-bold">{user?.firstName}</div>
                    <a href={`mailto:${user?.email}`}>{user?.email}</a>
                    <div className="text-xl font-bold">{"+" + user?.countryCode + user?.mobile}</div>
                    <div className="text-xl ">{user?.dob}</div>

                    <div className="flex align-items-center justify-content-between">
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2" />
                            <span className="font-semibold">User</span>
                        </div>
                        <span className={`product-badge status-${user?.isVerified === "VERIFIED" ? "instock" : "outofstock"}`}> {user?.isVerified == "VERIFIED" ? "Verified" : "Rejected"}</span>
                    </div>
                    <div className="text-center">
                        <img src={user?.image ? Constants?.BASE_URL + user?.image : ""} alt="" className="w-9 shadow-2 my-3 mx-0" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserView;
