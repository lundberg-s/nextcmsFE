import type { NextApiRequest, NextApiResponse } from "next";

const API_BASE_URL = "http://localhost:8000/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const refreshToken = req.cookies.refresh;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token missing." });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();

    // Update the access token in the cookie
    res.setHeader("Set-Cookie", [
      `access=${data.access}; HttpOnly; Path=/; Secure; SameSite=Strict`,
    ]);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
}