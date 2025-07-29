import express from "express";
import sqlite from "better-sqlite3";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/test", (req, res) => {
  console.log("요청 들어옴");

  const testData = ["aaa"];
  res.json(testData);
});

app.listen(4000);
