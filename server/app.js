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

app.post("/api/diaries", async (req, res) => {
  try {
    console.log("요청이 왔습니다.");

    const newDiary = {
      user_id: "CWD91jDBLyyNNo4jbNKK",
      emotion_score: 5,
      title: "테스트 일기",
      content: "서버에서 자동으로 생성된 테스트 일기입니다.",
      // 3. serverTimestamp()를 Admin SDK 방식으로 변경
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    // 4. 데이터 추가 방식을 Admin SDK 방식으로 변경
    const docRef = await db.collection("diaries").add(newDiary);

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
