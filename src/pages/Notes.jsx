import React from "react";
import { getUserDataByUid } from "../utils/firestoreFunctions";
import { useAuth } from "../context/AuthContext";

const Notes = () => {
  const { user } = useAuth();
  const call = async () => {
    console.log(await getUserDataByUid(user.uid));
  };
  call();
  return (
    <>
      <h2>Ihosifdofdi</h2>
    </>
  );
};

export default Notes;
