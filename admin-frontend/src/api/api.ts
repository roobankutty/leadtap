const API_URL = "https://leadtap-properties.onrender.com/api";

export async function adminRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  return response.json();
}