import { ArrowLeftIcon, Trash2Icon, LoaderIcon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, []);

  const handleSave = async () => {
    if (!note.content.trim() || !note.title.trim()) {
      toast.error("Please add a title or content");
      return
    }
    setSaving(true);
    try {
      await api.put(`/notes/${note._id}`, note);
      toast.success("Updated the note");
      navigate("/");
    } catch (error) {
      toast.error("Error updating the note");
      console.log("error updating the note", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this note?")) return;
      await api.delete(`/notes/${id}`);
      toast.success("Note successfully deleted");
      navigate("/");
    } catch (error) {
      console.log("Error in deleting note", error);
      toast.error("Failed to delete the note");
    }
  };

  if (loading) {
    console.log(loading);
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="flex flex-col gap-2 mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input w-3/4"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea w-3/4 p-4 rounded-3xl h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
