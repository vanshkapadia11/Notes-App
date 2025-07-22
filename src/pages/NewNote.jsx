import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import NoteEditor from "./NoteEditor";
import { useNavigate } from "react-router-dom";

const NewNote = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="container">
        <div className="flex mt-10">
          <button
            type="submit"
            className="w-1/2 justify-self-center py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all flex items-center justify-center gap-3"
            onClick={() => navigate(-1)}
          >
            back{" "}
            <span className="material-symbols-rounded text-red-400">
              arrow_back
            </span>
          </button>
        </div>
        <div className="">
          <NoteEditor />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NewNote;
