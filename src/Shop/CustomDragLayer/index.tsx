import { useDragLayer } from "react-dnd";
import { Root } from "./styles";
import { MARKER_DRAG_TYPE } from "../ShopMap/Marker";
import { DumbMarker } from "../ShopMap/Marker/DumbMarker";

export const CustomDragLayer = () => {
  const { itemType, isDragging, clientOffset } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
    itemType: monitor.getItemType(),
    clientOffset: monitor.getClientOffset()
  }));

  if (!isDragging || !clientOffset) return null;

  const renderItem = () =>
    itemType === MARKER_DRAG_TYPE ? <DumbMarker translateToCenter /> : null;

  return (
    <Root>
      <div
        style={{
          transform: `translate(${clientOffset.x}px, ${clientOffset.y}px)`,
          display: "inline-block"
        }}
      >
        {renderItem()}
      </div>
    </Root>
  );
};
