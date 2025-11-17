import express from "express";
import cors from "cors";

import goFreeSMS from "./scrapers/gofreesms.js";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: "Backend running..." });
});

// Fetch all numbers
app.get("/api/numbers", async (req, res) => {
  const data = [];

  const gfs = await goFreeSMS();
  data.push(...gfs);

  res.json(data);
});

// Fetch SMS from source
app.get("/api/messages", async (req, res) => {
  const src = req.query.source;
  const id = req.query.id;

  if (src === "gofreesms") {
    res.json([
      {
        from: "Google",
        msg: "Your OTP is 123456",
        time: "2025-11-17"
      }
    ]);
  } else {
    res.json([]);
  }
});

app.listen(3000, () => console.log("Running..."));
