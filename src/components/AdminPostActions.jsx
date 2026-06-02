import { useState } from "react";
import { updatePost, deletePost } from "../api/posts";
import { isAdmin } from "../utils/auth";

export default function AdminPostActions({ post, onDeleted, onUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const admin = isAdmin();
  const token = localStorage.getItem("token");

  if (!admin) {
    return null;
  }

  async function handleDelete() {
    const data = await deletePost(post.id, token);

    if (data.success) {
      alert("Post deleted");
      onDeleted?.(post.id);
    } else {
      alert(data.message || "Failed to delete post");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const data = await updatePost(post.id, { title, content }, token);

    if (data.success) {
      alert("Post updated");
      setIsEditing(false);
      onUpdated?.(data.post);
    } else {
      alert(data.message || "Failed to update post");
    }
  }

  if (isEditing) {
    return (
      <form className="form-card" onSubmit={handleUpdate}>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="input" value={content} onChange={(e) => setContent(e.target.value)} />

        <div className="admin-actions">
          <button className="btn" type="submit">Save</button>
          <button className="btn secondary" type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="admin-actions">
      <button className="btn" onClick={() => setIsEditing(true)}>Edit</button>
      <button className="btn secondary" onClick={handleDelete}>Delete</button>
    </div>
  );
}