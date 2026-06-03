import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments, createComment, updateComment, deleteComment } from "../api/comments";
import AdminPostActions from "../components/AdminPostActions";
import { isLoggedIn as authLoggedIn, isAdmin as authIsAdmin } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL;

export default function PostDetail() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const isLoggedIn = authLoggedIn();
  const isAdmin = authIsAdmin();

  useEffect(() => {
    async function fetchPostAndComments() {
      try {
        console.log("PostDetail: slug=", slug);

        const res = await fetch(`${API_URL}/posts/${slug}`);

        if (!res.ok) {
          const text = await res.text();
          setError(`Failed to fetch post: ${res.status} ${res.statusText} - ${text}`);
          return;
        }

        const data = await res.json();

        // API returns { post: {...} } or the post directly
        setPost(data.post || data);

        const commentsData = await getComments(slug);
        setComments(commentsData.comments);
      } catch (err) {
        setError(err.message || "Unknown error");
      }
    }

    fetchPostAndComments();
  }, [slug]);

  async function handleCommentSubmit(e) {
    e.preventDefault();

    const data = await createComment(slug, commentContent);

    if (data.success) {
        const commentsData = await getComments(slug);
        setComments(commentsData.comments);

        setCommentContent("");
    } else {
        alert("Failed to create comment");
    }
  }

  async function handleDeleteComment(commentId) {
    if (!isAdmin) {
      alert("Admin only");
      return;
    }

    const data = await deleteComment(slug, commentId);

    if (data.success) {
      setComments(comments.filter((comment) => comment.id !== commentId));
    } else {
      alert(data.message || "Failed to delete comment");
    }
  }

  function startEditing(comment) {
    if (!isAdmin) return;
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  }

  async function handleUpdateComment(commentId) {
    if (!isAdmin) {
      alert("Admin only");
      return;
    }

    const data = await updateComment(slug, commentId, editContent);

    if (data.success) {
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editContent }
            : comment
        )
      );

      setEditingCommentId(null);
      setEditContent("");
    } else {
      alert(data.message || "Failed to update comment");
    }
  }

  if (error) return <p>{error}</p>;

  if (!post) return <p>Loading...</p>;

  return (
    <main className="post-detail">
      <article className="post-card">
        <h1>{post.title}</h1>
        <p>{post.content}</p>

        {isAdmin && (
          <AdminPostActions
            post={post}
            onDeleted={() => {
              alert("Post deleted");
              window.location.href = "/";
            }}
            onUpdated={(updatedPost) => {
              setPost(updatedPost);
            }}
          />
        )}
      </article>
      <section>
        <h2>Comments</h2>

        {isLoggedIn ? (
          <form className="form-card" onSubmit={handleCommentSubmit}>
            <textarea
              className="input"
              placeholder="Write a comment..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" type="submit">Post Comment</button>
            </div>
          </form>
        ) : (
          <p>
            You need to <a href="/login">log in</a> to comment.
          </p>
        )
        }

        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <article className="comment" key={comment.id}>
              {editingCommentId === comment.id ? (
                <>
                  <textarea
                    className="input"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn" onClick={() => handleUpdateComment(comment.id)}>
                      Save
                    </button>

                    <button className="btn secondary" onClick={() => setEditingCommentId(null)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>{comment.content}</p>

                  <small>
                    {comment.author?.username
                      ? `By ${comment.author.username}`
                      : "Anonymous"}
                  </small>

                  {isAdmin && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <button className="btn" onClick={() => startEditing(comment)}>Edit</button>
                      <button className="btn secondary" onClick={() => handleDeleteComment(comment.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </article>
          ))
        )}
      </section>
    </main>
  );
}