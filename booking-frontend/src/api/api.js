const BASE = "http://localhost:4000";

export const api = {
  async get(path, token) {
    const res = await fetch(BASE + path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  },

  async post(path, body, token) {
    const res = await fetch(BASE + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    return res.json();
  },
};
