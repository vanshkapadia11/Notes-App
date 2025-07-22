import React, { useEffect, useState } from "react";
import { getUserDataByUid } from "../utils/firestoreFunctions";
import { useAuth } from "../context/AuthContext";

const Notes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const userData = await getUserDataByUid(user.uid);
        if (userData?.notes) {
          setNotes(userData.notes);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [user.uid]);

  return <div className="p-6"></div>;
};

export default Notes;
