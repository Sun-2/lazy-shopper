import { useSelector } from "react-redux";
import { getCurrentMap } from "../slice";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../../firebase";
import { firestoreMarkerCollection } from "../const";
import { useAuthState } from "react-firebase-hooks/auth";

export const useMarkersForCurrentMap = <T = any>() => {
  const currentMap = useSelector(getCurrentMap);
  const [user, userLoading, userError] = useAuthState(auth);

  //todo user
  const [data, dataLoading, dataError] = useDocumentData<any>(
    firestore.collection(firestoreMarkerCollection).doc(user.uid)
  );

  return [
    data?.[currentMap] as T,
    userLoading || dataLoading,
    userError || dataError
  ];
};
