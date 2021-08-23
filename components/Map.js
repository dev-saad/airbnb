import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import nextId from "react-id-generator";

const Map = ({ hotels }) => {
  const [selectedLocation, setSelectedLocation] = useState({});
  const coordinates = hotels.map((result) => ({
    longitude: result.coordinate.lon,
    latitude: result.coordinate.lat,
  }));
  const center = getCenter(coordinates);

  const [viewPort, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/alsaadkarim/ckshm6z211xtu17k0jonu27an"
      className="!h-screen"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewPort}
      onViewportChange={(nextViewport) => setViewPort(nextViewport)}
    >
      {hotels.map((result) => (
        <div key={nextId()}>
          <Marker
            longitude={result.coordinate.lon}
            latitude={result.coordinate.lat}
            offsetLeft={0}
            offsetTop={0}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result.coordinate)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📍
            </p>
          </Marker>
          {selectedLocation.lon === result.coordinate.lon ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.coordinate.lat}
              longitude={result.coordinate.lon}
            >
              {result.name}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
