import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const usePathSegments = (): string[] => {
  const { pathname } = useLocation();
  const pathSegments = useMemo(() => {
    if (!pathname) return [];
    else return pathname.slice(1).split("/");
  }, [pathname]);
  return pathSegments;
};
