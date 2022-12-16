import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const MapContainer = (props) => {
    console.log(props.coordinates?.[0]);
    const containerStyle = {
        width: "100%",
        height: "300px",
    };
    return (
        <div style={{ height: "300px" }}>
            <Map google={props.google} zoom={14} style={containerStyle} center={{ lat: props?.coordinates?.[0], lng: props?.coordinates?.[1] }}>
                <Marker name={"Current location"} position={{ lat: props.coordinates?.[0], lng: props.coordinates?.[1] }} />
            </Map>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyD - d5AlR4gRfjEAXNaS5rWxIvU84H1bWwI",
})(MapContainer);
