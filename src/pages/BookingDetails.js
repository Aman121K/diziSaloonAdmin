import React from "react";
import MapContainer from "./MapContainer";
import { useLocation } from "react-router-dom";

const BookingDetails = () => {
    const location = useLocation();
    console.log("location::", location);
    return (
        <div>
            <MapContainer coordinates={location?.state?.booking?.coordinates} coordinates1={location?.state?.user?.coordinates} />
        </div>
    );
};

export default BookingDetails;
