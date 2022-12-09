import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Constants from "../services/constant";
import { getData } from "../services/http.service";

const UserView = () => {
    const { id } = useParams();
    const [user, setUser] = useState();
    console.log(id);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        getData(Constants.END_POINT.GET_ALL_USERS + "/" + id)
            .then((res) => {
                console.log(res);
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="grid">
            <div className="col-12 md:col-8 mx-auto">
                <div className="card">
                    <h3>Bookings </h3>
                    {/* <Toast ref={toast} />
                    <Messages ref={message} /> */}
                    No Bookings Found
                    {/* {user?.services?.length > 0 ? (
                        <DataTable value={user?.services}>
                            <Column field="serviceName" header="Service Name"></Column>
                            <Column field="price" body={priceBodyTemplate} header="Price"></Column>
                            <Column field="durationTime" body={durationBodyTemplate} header="Duration Time"></Column>
                        </DataTable>
                    ) : (
                        "No Bookings Found"
                    )} */}
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
