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
    const { messages } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: "Messages are required" });
    }

    // 1. Gemini가 이해하는 형식으로 대화 기록 변환
    const history = messages.slice(0, -1).map((msg) => ({
      // 마지막 메시지 제외
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // 2. 마지막 메시지는 새로운 질문으로 사용
    const lastMessage = messages[messages.length - 1].content;

    // 3. 채팅 세션 시작 및 메시지 전송
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage);

    const response = result.response;
    const text = response.text();

    // 'assistant' role로 통일하여 클라이언트에 응답
    res.json({ reply: { role: "assistant", content: text } });
  } catch (error) {
    console.error("Error while communication with Gemini:", error);
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
    const userDocId = userQuery.docs[0].id;

    const diariesRef = db.collection("diaries");
    const diariesQuery = await diariesRef
      .where("user_doc_id", "==", userDocId)
      .orderBy("created_at", "desc")
      .get();

    setTimeout(() => {
      const rawDiaries = diariesQuery.docs.map((doc) => doc.data());
      res.status(200).json(rawDiaries);
    }, 3000);
  } catch (error) {
    console.error("Error  diary:", error);
    res.status(500).json({ error: "Failed to get diaries" });
  }
});

app.post("/api/generate-title", async (req, res) => {
  try {
    const { content } = req.body;

    const defaultMessage =
      "당신을 일기 제목을 정해야 합니다. 사용자의 일기내용을 전달할 테니, 핵심적인 내용을 추려 일기 제목을 작성하고 1개 보내주시기 바랍니다. 다음은 일기의 내용입니다.";

    const result = await model.generateContent([defaultMessage, content]);

    const diaryTitleFromAI = result.response.text();

    res.status(200).json(diaryTitleFromAI);
  } catch (error) {
    console.error("Error getting diary title from Gemini:", error);
    res.status(500).json({ error: "Failed to get title" });
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
