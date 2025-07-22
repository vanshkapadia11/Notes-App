import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Notes from "./Notes";
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <section className="container">
        <div className="mt-5">
          <h2 className="text-sm font-semibold uppercase flex items-center gap-2">
            <span className="material-symbols-rounded text-green-500">
              crown
            </span>
            Welcome, {user.displayName}
          </h2>
        </div>
        <div className="mt-16 flex items-center flex-col">
          <h2 className="text-2xl justify-self-center font-semibold heading1 uppercase">
            Notes APp!!
          </h2>
          <button
            type="submit"
            className="w-9/12 mt-5 justify-self-center py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all flex items-center justify-center gap-3"
            onClick={() => navigate("/newNote")}
          >
            Create A New Note!!{" "}
            <span className="material-symbols-rounded text-emerald-400">
              book
            </span>
          </button>
        </div>
        <div className="mt-20">
          <Notes />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
