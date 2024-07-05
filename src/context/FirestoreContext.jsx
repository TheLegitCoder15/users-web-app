import { createContext, useContext, useState } from "react";
import { db } from "../config/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

const FirestoreContext = createContext();

export const useFirestoreContext = () => {
  return useContext(FirestoreContext);
};

export const FirestoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const userRef = (docId) => {
    return doc(db, "users", docId);
  };

  const FIRESTORE_ADD = async (data) => {
    setLoading(true);

    const newData = data;
    const { uid } = data;
    delete newData.uid;

    await setDoc(userRef(uid), newData)
      .then(() => {
        console.info("DATA SUCCESSFULLY ADDED TO DATABASE");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const FIRESTORE_GET = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    let data = [];
    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    } else {
      console.error("No document found");
      return;
    }
  };

  const value = { FIRESTORE_ADD, FIRESTORE_GET };
  return <FirestoreContext.Provider value={value}>{!loading && children}</FirestoreContext.Provider>;
};
