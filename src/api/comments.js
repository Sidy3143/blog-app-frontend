const API_URL = "http://localhost:3000/blog";

export async function getComments(slug) {
  const res = await fetch(`${API_URL}/posts/${slug}/comments`);
  return res.json();
}

export async function createComment(slug, content) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/posts/${slug}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  return res.json();
}

export async function updateComment(slug, commentId, content) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/posts/${slug}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  return res.json();
}

export async function deleteComment(slug, commentId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/posts/${slug}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}