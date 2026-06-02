import { useState } from "react";
import { createPost } from "../api/posts";
import { isAdmin } from "../utils/auth";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");
  const admin = isAdmin();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await createPost({ title, content }, token);

    if (data.success) {
      setTitle("");
      setContent("");
      alert("Post created");
    } else {
      alert(data.message || "Failed to create post");
    }
  }

  if (!admin) {
    return (
      <main className="post-detail">
        <section className="form-card">
          <h1>Admin access required</h1>
          <p>You must be an admin to create posts.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="post-detail">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Create Post</h1>

        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
        />

        <textarea
          className="input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content"
        />

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" type="submit">Create</button>
        </div>
      </form>
    </main>
  );
}