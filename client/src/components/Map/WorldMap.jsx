import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";
import allCountries from "../../data/countries.json";
import IntroCard from "./IntroCard.jsx";
import axios from "axios";
import ConnectionsModal from "../Resource/ConnectionsModal";

import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";

const WorldMap = () => {
  const [connectedCountries, setConnectedCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState([]);
  const [activeCountryName, setActiveCountryName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/resources/map/connections/"
        );
        setConnectedCountries(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const forEachCountry = (country, layer) => {
    let countryName = country.properties.ADMIN;
    layer.bindPopup(country.properties.ADMIN);
    /*     console.log("connections length: ",connectedCountries.length) */
    // Toggle country to be UNCA color upon a click event //

    layer.on({
      click: (event) => {
        //filter based on countryName, return
        const filteredConnections = connectedCountries.filter(
          (item) => item.name === countryName
        );
        setActiveCountry(filteredConnections);
        setActiveCountryName(countryName);
        handleClickOpen();

        /* event.target.setStyle({
         
        }); */
      },
    });
  };

  const style = (feature) => {
    const countryNames = connectedCountries.map((country) => country.name);
    const included = countryNames.includes(feature.properties.ADMIN);

    return {
      opacity: 0.6,
      fillColor: included ? "blue" : "white",
      fillOpacity: included ? 0.65 : 0.45,
    };
  };

  const { BaseLayer } = LayersControl;

  return ReactDOM.createPortal(
    <>
      <MapContainer
        center={[10, 10]}
        style={{ height: "100vh" }}
        zoom={3}
        minZoom={3}
        maxZoom={8}
        scrollWheelZoom={true}
        bounds={[
          [84.67351256610522, -174.0234375],
          [-58.995311187950925, 223.2421875],
        ]}
      >
        <IntroCard />

        {connectedCountries.length > 0 && (
          <GeoJSON
            style={style}
            data={allCountries.features}
            onEachFeature={forEachCountry}
          ></GeoJSON>
        )}
        <ConnectionsModal
          open={open}
          selectedValue={activeCountry}
          onClose={handleClose}
          title={activeCountryName}
        />
        <LayersControl>
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            />
          </BaseLayer>
          <BaseLayer name="NASA Gibs Blue Marble">
            <TileLayer
              url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
              attribution="&copy; NASA Blue Marble, image service by OpenGeo"
              maxNativeZoom={8}
            />
          </BaseLayer>
        </LayersControl>
      </MapContainer>
    </>,
    document.getElementById("modalPortal")
  );
};

export default WorldMap;
