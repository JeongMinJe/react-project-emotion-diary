import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = 4000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    // if (!messages) {
    //   return res.status(400).json({ error: "Messages are required" });
    // }

    // const response = await openai.responses.create({
    //   model: "GPT-4o mini",
    //   input: messages,
    // });

    // console.log("아웃풋", response.output_text);
    // res.json({ reply: completion.choices[0].message });

    const result = await model.generateContent(messages);
    const response = result.response;
    const text = response.text();

    res.json({ reply: { role: "assistant", content: text } });

    console.log(text);
  } catch (error) {
    console.error("Error while communication with OpenAI:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
