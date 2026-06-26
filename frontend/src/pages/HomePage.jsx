import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NotesNotFound from "../components/NotesNotFound";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";

const HomePage = () => {
  const [rateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setRateLimited(false);
      } catch (error) {
        console.log("error fetching notes");
        console.log(error);
        if (error.response.status === 429) {
          setRateLimited(true);
        }else{
             setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="bg-transparent min-h-screen">
      <Navbar />
      {loading ? (
        <div className="text-center mt-50 h-full w-full flex justify-center items-center text-primary py-10">
          Loading notes...{" "}
        </div>
      ) : error ? (
        <div className="flex flex-col mt-50 items-center gap-3">
          <h1 className="font-grotesque mb-2 text-6xl font-bold text-center text-primary">
            Something went wrong
          </h1>
          <p className="text-center w-1/3">
            We couldn't connect to the server (API error). Please try again in a
            few moments.
          </p>
        </div>
      ) : (
        <>
          {rateLimited && <RateLimitedUI />}

          {notes.length === 0 && !rateLimited  && <NotesNotFound />}

          <div className="max-w-7xl mx-auto p-4 mt-6">
            {notes.length > 0 && !rateLimited && (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {notes.map((note) => (
                  <NoteCard key={note.id} note={note} setNotes={setNotes} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
