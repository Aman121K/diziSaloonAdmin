import React from "react";
import MapContainer from "./MapContainer";
import { useLocation } from "react-router-dom";

const BookingDetails = () => {
    const location = useLocation();
    console.log(location);
    return (
        <div>
            <MapContainer />
        </div>
    );
};

export default BookingDetails;
