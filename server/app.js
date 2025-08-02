import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import admin from "firebase-admin";
import { db } from "./firebase.js"; // Firestore DB 인스턴스 import
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = 4000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const defaultMessage =
      "이 프롬프트의 주 목적은 그날그날의 감정을 기록하는 유저와의 대화, 나아가 상담이다. 이 문장 이후에는 User 와 당신의 대화 내역을 전달해줄 것이며 각각 작성자를 구분해줄 것이므로 당신은 대화 내역을 참고하여 유저와 당신이 나눈 이야기들을 바탕으로 유저의 메시지에 응답해주길 바란다.";

    const { messages } = req.body;

    const chatHistory = messages.map((msg) => {
      const { role, content } = msg;
      return `작성자: ${role}, 내용: ${content}`;
    });

    if (!messages) {
      return res.status(400).json({ error: "Messages are required" });
    }

    const result = await model.generateContent([
      defaultMessage,
      ...chatHistory,
    ]);

    const response = result.response;
    const text = response.text();

    res.json({ reply: { role: "assistant", content: text } });
  } catch (error) {
    console.error("Error while communication with OpenAI:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

app.get("/api/diaries", async (req, res) => {
  try {
    const { email } = req.query;

    const userRef = db.collection("users");
    const userQuery = await userRef.where("email", "==", email).limit(1).get();

    // 사용자 못 찾을 경우

    // 사용자 찾은 경우
    const userId = userQuery.docs[0].id;

    const diariesRef = db.collection("diaries");
    const diariesQuery = await diariesRef.where("user_id", "==", userId).get();

    const processedDiaries = diariesQuery.docs.map((doc) => {
      const data = doc.data();
      return {
        title: data.title,
        content: data.content,
        date: data.created_at.toDate(),
      };
    });

    res.status(200).json(processedDiaries);
  } catch (error) {
    console.error("Error  diary:", error);
    res.status(500).json({ error: "Failed to get diaries" });
  }
});

app.post("/api/diaries", async (req, res) => {
  try {
    const diaryTobeSaved = {
      ...req.body,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("diaries").add(diaryTobeSaved);

    res
      .status(201)
      .json({ message: "Diary saved successfully", id: docRef.id });
  } catch (error) {
    console.error("Error saving diary:", error);
    res.status(500).json({ error: "Failed to save diary" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
