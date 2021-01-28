import { auth, firestore } from "../../firebase";
import { firestoreMarkerCollection } from "../const";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { getCurrentMap } from "../slice";
import firebase from "firebase";

export const useDeleteMarker = () => {
  const currentMap = useSelector(getCurrentMap);
  const [user] = useAuthState(auth);
  const deleteMarker = (name: string) =>
    firestore
      .collection(firestoreMarkerCollection)
      .doc(user.uid)
      .update({
        [`${currentMap}.${name}`]: firebase.firestore.FieldValue.delete()
      });

  return user && deleteMarker;
};
