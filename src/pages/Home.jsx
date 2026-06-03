import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/posts";
import { isAdmin } from "../utils/auth";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const admin = isAdmin();

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data.posts);
        setStatus("success");
      } catch (err) {
        console.log("Error fetching posts:", err);
        setError(err.message);
        setStatus("error");
      }
    }

    loadPosts();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-container">
          <div className="page-header">
            <div className="page-header-content">
              <h1>Latest Posts</h1>
              <p>Read thoughts, essays, and stories from the community.</p>
            </div>
            {admin && (
              <div className="page-header-actions">
                <Link className="btn" to="/create-post">
                  ✨ Create new post
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="posts-list">
        {status === "loading" && (
          <div className="loading-state">
            <p>Loading posts...</p>
          </div>
        )}

        {status === "error" && (
          <div className="error-state">
            <p>Error loading posts: {error}</p>
          </div>
        )}

        {status === "success" && posts.length === 0 && (
          <div className="empty-state">
            <h3>No posts yet</h3>
            <p>Be the first to share your thoughts with the community.</p>
            {!admin && (
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                Posts will appear here as admins create them.
              </p>
            )}
          </div>
        )}

        {status === "success" && posts.length > 0 && (
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}