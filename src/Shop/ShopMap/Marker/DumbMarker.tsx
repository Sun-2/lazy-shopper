import React, { FC } from "react";

import { markerIconHeight, markerIconWidth } from "./index";
import { DumbMarkerSvg } from "./styles";

export type DumbMarkerProps  = {
  translateToCenter: boolean
}

export const DumbMarker: FC<DumbMarkerProps> = props => {
  return <DumbMarkerSvg height={markerIconHeight} width={markerIconWidth} {...props} />;
};
