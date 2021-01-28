import React, { FC, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Popup,
  Marker,
  TileLayer,
  ImageOverlay,
  useMap,
  useMapEvent
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CRS, Icon } from "leaflet";

import map from "./map.webp";
import m from "./map.webp";
import { useDrop } from "react-dnd";
import { unstable_batchedUpdates } from "react-dom";

export type ShopMapProps = {
  focused: boolean;
};

const Comp = (props: { onMarkerAdd: (pos: [number, number]) => void }) => {
  useMapEvent("click", e => {
    props.onMarkerAdd([e.latlng.lat, e.latlng.lng]);
  });

  const map = useMap();

  const [, ref] = useDrop({
    accept: "product",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const bounds = document.getElementById("map")!.getBoundingClientRect();
      const lng = offset!.y - bounds.top;
      const lat = offset!.x - bounds.left;
      const point = map.containerPointToLatLng([lat, lng]);

      props.onMarkerAdd([point.lat, point.lng]);
    }
  });

  useEffect(() => {
    ref(document.getElementById("map"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

const icon = new Icon({
  iconUrl: "https://i.imgur.com/KDsBacM.png",
  iconSize: [60, 60],
  iconAnchor: [30, 60]
});

export const ShopMap: FC<ShopMapProps> = ({ focused, ...rest }) => {
  const [url, setUrl] = useState<string>("");
  const [[width, height], setBounds] = useState([0, 0]);

  const [markers, setMarkers] = useState<[number, number][]>([]);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.onload = () => {
      const maxDimension = 1000;
      const resizeFactor =
        Math.min(maxDimension / image.height, maxDimension / image.width) *
        0.99;
      const width = image.width * resizeFactor;
      const height = image.height * resizeFactor;

      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(image, 0, 0, width, height);

      canvas.toBlob(blob => {
        if (blob) {
          unstable_batchedUpdates(() => {
            setBounds([width, height]);
            setUrl(URL.createObjectURL(blob));
          });
        } else console.log("no blob");
      });
    };

    image.src = m;
  }, []);

  return (
    <>
      {url && (
        <MapContainer
          id="map"
          //ref={ref}
          center={[width / 2, height / 2]}
          zoom={2}
          maxZoom={5}
          crs={CRS.Simple}
          //scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <Comp
            onMarkerAdd={pos =>
              setMarkers(prev => {
                /* Check if there's already a marker at these coords. */
                const canAdd = !markers.find(
                  ([mLng, mLat]) => mLng === pos[0] && mLat === pos[1]
                );
                return canAdd ? [...prev, pos] : prev;
              })
            }
          />
          <ImageOverlay
            url={map}
            bounds={[
              [0, 0],
              [height, width]
            ]}
          />
          {markers.map((pos, i) => (
            <Marker position={pos} icon={icon} key={pos.join("|")}>
              <Popup>
                <div>Hi!</div>{" "}
                <div
                  onClick={() =>
                    setMarkers(prev => {
                      const cpy = [...prev];
                      cpy.splice(i, 1);
                      return cpy;
                    })
                  }
                >
                  Click me to remove
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
};
