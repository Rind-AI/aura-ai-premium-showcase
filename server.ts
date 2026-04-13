import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust proxy is essential for Cloud Run and AI Studio to get correct protocol/host
  app.set("trust proxy", true);
  app.use(express.json());
  app.use(cookieParser());

  // GitHub OAuth Routes
  app.get("/api/auth/github/url", (req, res) => {
    const clientId = process.env.VITE_GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
      console.error("CRITICAL: GitHub credentials missing in environment!");
      return res.status(500).json({ 
        error: "Server configuration error", 
        details: `Missing: ${!clientId ? "Client ID " : ""}${!clientSecret ? "Client Secret" : ""}`
      });
    }

    // Determine the base URL dynamically
    // req.protocol and req.get("host") should be accurate with 'trust proxy' enabled
    const protocol = req.protocol;
    const host = req.get("host");
    const redirectUri = `${protocol}://${host}/auth/callback`;
    
    console.log(`[OAuth] Initiating flow. Host: ${host}, Protocol: ${protocol}`);
    console.log(`[OAuth] Redirect URI: ${redirectUri}`);

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "repo user",
      state: Math.random().toString(36).substring(7),
    });

    res.json({ url: `https://github.com/login/oauth/authorize?${params.toString()}` });
  });

  app.get(["/auth/callback", "/auth/callback/"], async (req, res) => {
    const { code, state } = req.query;
    
    if (!code) {
      return res.status(400).send("No code provided from GitHub");
    }

    try {
      const response = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: process.env.VITE_GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        {
          headers: { Accept: "application/json" },
        }
      );

      const { access_token } = response.data;

      if (!access_token) {
        throw new Error("No access token received from GitHub");
      }

      // Send success message to parent window and close popup
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'GITHUB_AUTH_SUCCESS', token: '${access_token}' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. This window should close automatically.</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error("GitHub OAuth Error:", error);
      res.status(500).send("Authentication failed");
    }
  });

  app.post("/api/github/create-repo", async (req, res) => {
    const { token, name, description, isPrivate } = req.body;
    
    if (!token) {
      return res.status(401).json({ error: "No GitHub token provided" });
    }

    try {
      const response = await axios.post(
        "https://api.github.com/user/repos",
        {
          name,
          description,
          private: isPrivate,
          auto_init: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      res.json(response.data);
    } catch (error: any) {
      console.error("Create Repo Error:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json(error.response?.data || { message: "Failed to create repository" });
    }
  });

  app.post("/api/github/push-file", async (req, res) => {
    const { token, repo, path: filePath, content, message } = req.body;
    
    if (!token || !repo || !filePath || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // 1. Get the authenticated user's login
      const userResponse = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const owner = userResponse.data.login;

      // 2. Check if file exists to get its SHA (for updates)
      let sha;
      try {
        const fileRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        sha = fileRes.data.sha;
      } catch (e) {
        // File doesn't exist, which is fine for first push
      }

      // 3. Push the file
      const pushResponse = await axios.put(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
        {
          message: message || "Update from Infinity OS",
          content: Buffer.from(content).toString("base64"),
          sha: sha
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      res.json(pushResponse.data);
    } catch (error: any) {
      console.error("Push File Error:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json(error.response?.data || { message: "Failed to push file" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
