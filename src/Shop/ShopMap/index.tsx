import React, { FC, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Popup,
  TileLayer,
  ImageOverlay,
  useMap,
  useMapEvent
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CRS, Icon, LatLngExpression } from "leaflet";

import map from "./map.webp";
import m from "./map.webp";
import { useDrop } from "react-dnd";
import { unstable_batchedUpdates } from "react-dom";
import { Button, Divider, Typography } from "@material-ui/core";
import { useMarkersForCurrentMap } from "../hooks/useMarkersForCurrentMap";
import { useSetMarker } from "../hooks/useSetMarker";
import { useDeleteMarker } from "../hooks/useDeleteMarker";
import { Marker, MARKER_DRAG_TYPE } from "./Marker";
import { useAppDispatch } from "../../redux/useAppDispatch";

export type ShopMapProps = {
  focused: boolean;
};

const MapEventHandler = (props: {}) => {
  const setMarker = useSetMarker();

  const addMarker = (name: string, latLng: LatLngExpression) => {
    setMarker!(name, latLng);
  };

  /*useMapEvent("click", e => {
    addMarker([e.latlng.lat, e.latlng.lng]);
  });*/

  const map = useMap();

  const [, ref] = useDrop({
    accept: MARKER_DRAG_TYPE,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const bounds = document.getElementById("map")!.getBoundingClientRect();
      const lng = offset!.y - bounds.top;
      const lat = offset!.x - bounds.left;
      const point = map.containerPointToLatLng([lat, lng]);
      const { name } = monitor.getItem();

      addMarker(name, [point.lat, point.lng]);
    }
  });

  useEffect(() => {
    ref(document.getElementById("map"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export const ShopMap: FC<ShopMapProps> = ({ focused, ...rest }) => {
  const [url, setUrl] = useState<string>("");
  const [[width, height], setBounds] = useState([0, 0]);

  const [markers, loading, err] = useMarkersForCurrentMap<any>();

  //const markers = useSelector(getMarkersForCurrentMap);
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

  const deleteMarker = useDeleteMarker()!;

  return (
    <>
      {url && (
        <MapContainer
          id="map"
          center={[width / 2, height / 2]}
          zoom={2}
          maxZoom={5}
          crs={CRS.Simple}
          style={{ height: "100%", width: "100%" }}
        >
          <MapEventHandler />
          <ImageOverlay
            url={map}
            bounds={[
              [0, 0],
              [height, width]
            ]}
          />
          {markers &&
            Object.entries(markers).map(([name, pos], i) => (
              <Marker
                position={pos as any}
                key={name + (pos as any).toString()}
              >
                <Popup>
                  <Typography variant="h6">Hi!</Typography>{" "}
                  <Typography variant="subtitle1">I am {name}</Typography>
                  <Divider />
                  <Button size="small" onClick={() => deleteMarker(name)}>
                    Please click me to erase my pitiful existence.
                  </Button>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      )}
    </>
  );
};
