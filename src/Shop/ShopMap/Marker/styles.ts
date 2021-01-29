import { ReactComponent as MarkerSvg } from "./marker.svg";
import styled from "styled-components";
import { markerIconHeight, markerIconWidth } from "./index";

export const DumbMarkerSvg = styled(MarkerSvg)<{ translateToCenter: boolean }>`
  transform: ${({ translateToCenter }) =>
    translateToCenter
      ? `translate(-${markerIconWidth / 2}px, -${markerIconHeight}px)`
      : undefined};
`;
