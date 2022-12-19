// import React from "react";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

// const MapContainer = (props) => {
//     console.log("props::", props);
//     const containerStyle = {
//         width: "100%",
//         height: "300px",
//     };
//     return (
//         <div style={{ height: "300px" }}>
//             <Map google={props.google} style={containerStyle}  boundscenter={{ lat: props?.coordinates?.[0], lng: props?.coordinates?.[1] }}>
//                 <Marker name={"Current location"} position={{ lat: props.coordinates?.[0], lng: props.coordinates?.[1] }} />
//             </Map>
//         </div>
//     );
// };

// export default GoogleApiWrapper({
//     apiKey: "AIzaSyD - d5AlR4gRfjEAXNaS5rWxIvU84H1bWwI",
// })(MapContainer);
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const MapContainer = (props) => {
    const mapStyles = {
        height: "50vh",
        width: "100%",
    };

    const defaultCenter = {
        lat: props?.coordinates?.[0],
        lng: props?.coordinates?.[1],
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyD - d5AlR4gRfjEAXNaS5rWxIvU84H1bWwI">
            <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
                <Marker position={{ lat: props.coordinates?.[0], lng: props.coordinates?.[1] }} />
                {props?.coordinates1 && <Marker position={{ lat: props.coordinates1?.[0], lng: props.coordinates1?.[1] }} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapContainer;
