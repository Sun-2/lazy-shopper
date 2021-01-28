import { auth, firestore } from "../../firebase";
import { firestoreMarkerCollection } from "../const";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { getCurrentMap } from "../slice";

export const useSetMarker = () => {
  const currentMap = useSelector(getCurrentMap);
  const [user] = useAuthState(auth);
  const setMarker = (name: string, latLng: [number, number]) =>
    firestore
      .collection(firestoreMarkerCollection)
      .doc(user.uid)
      .update({ [`${currentMap}.${name}`]: latLng });

  return user && setMarker;
};
