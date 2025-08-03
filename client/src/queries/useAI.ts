import { useMutation } from "@tanstack/react-query";
import type { Message } from "../types/message";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { GeneratedSummary, GeneratedTitle } from "../types/AI";

const postSummaryRequest = (chatHistory: Message[]) => {
  return axios.post("http://localhost:4000/api/ai/summary", { chatHistory });
};

export const useGenerateSummary = () => {
  return useMutation<AxiosResponse<GeneratedSummary>, Error, Message[]>({
    mutationFn: postSummaryRequest,
  });
};

const postChatMessage = (fullChatHistory: Message[]) => {
  return axios.post("http://localhost:4000/api/chat", {
    messages: fullChatHistory,
  });
};

export const useSendMessage = (
  setChatHistory: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  return useMutation<AxiosResponse<{ reply: Message }>, Error, Message[]>({
    mutationFn: postChatMessage,
    onSuccess: (data) => {
      setChatHistory((prev) => [...prev, data.data.reply]);
    },
    onError: (error) => {
      console.error("API 호출 오류:", error);
    },
  });
};

const generateTitleRequest = (content: string) => {
  return axios.post("http://localhost:4000/api/ai/title", { content });
};

export const useGenerateTitle = () => {
  return useMutation<AxiosResponse<GeneratedTitle>, Error, string>({
    mutationFn: generateTitleRequest,
  });
};
