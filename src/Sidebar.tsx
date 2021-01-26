import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";

export const Sidebar = () => {
  const [spring, set] = useSpring(() => ({ x: 0 }));

  const leftBound = -window.innerWidth * 0.8 + 80;
  const bind = useDrag(
    state => {
      const [x] = state.movement;
      const [xVel] = state.velocities;
      const velocityThreshold = 0.3;
      const setClosed = () => set({ x: 0 });
      const setExpanded = () => set({ x: leftBound });

      if (!state.down) {
        if (xVel > velocityThreshold) setClosed();
        else if (xVel < -velocityThreshold) setExpanded();
        else if (x > leftBound / 2) setClosed();
        else setExpanded();
      } else {
        set({ x });
      }
    },
    {
      initial: () => [spring.x.getValue(), 0],
      bounds: {
        left: leftBound,
        right: 0
      }
    }
  );

  return (
    <Root
      {...bind()}
      style={{
        transform: spring.x.interpolate(
          x => `translateX(calc(100% - 80px + ${x}px))`
        )
      }}
    >
      hi
    </Root>
  );
};

const Root = styled(animated.div)`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 20%;
  right: 0;
  bottom: 0;
  background-color: whitesmoke;
`;
