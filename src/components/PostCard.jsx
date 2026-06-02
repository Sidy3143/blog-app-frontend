import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No date";

  const author = post.author?.username || "Anonymous";

  return (
    <article className="post-card">
      <h2>
        <Link to={`/posts/${post.slug || post.id}`}>{post.title}</Link>
      </h2>

      <p>
        {post.content.length > 160
          ? post.content.slice(0, 160) + "..."
          : post.content}
      </p>

      <div className="post-meta">
        <span className="post-author">{author}</span>
        <time dateTime={post.createdAt} className="post-date">
          {date}
        </time>
      </div>
    </article>
  );
}