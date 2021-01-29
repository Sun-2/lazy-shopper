import { Icon } from "leaflet";
import markerSvg from "./marker.svg";
import React, { FC } from "react";
import { Marker as LeafletMarker, MarkerProps } from "react-leaflet";

export const Marker: FC<MarkerProps> = props => {
  return <LeafletMarker icon={icon} {...props} />;
};

export const MARKER_DRAG_TYPE = "MARKER";

const markerSizeFactor = 1;
export const markerIconWidth = 28 * markerSizeFactor;
export const markerIconHeight = 40 * markerSizeFactor;

const icon = new Icon({
  iconUrl: markerSvg,
  iconSize: [markerIconWidth, markerIconHeight],
  iconAnchor: [markerIconWidth / 2, markerIconHeight]
});
