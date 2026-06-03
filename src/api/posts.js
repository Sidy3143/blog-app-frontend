const API_URL = import.meta.env.VITE_API_URL;

export async function getPosts() {
  const res = await fetch(`${API_URL}/posts`);
  console.log("response", res);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();
  console.log("response data", data.posts);

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch posts");
  }

  return data;
}

export async function createPost({ title, content }, token) {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  return res.json();
}

export async function updatePost(id, { title, content }, token) {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  return res.json();
}

export async function deletePost(id, token) {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}