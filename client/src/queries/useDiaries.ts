import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DiaryListItem, DiaryPost } from "../types/diaries";
import axios from "axios";

const getDiaries = async (email: string): Promise<DiaryListItem[]> => {
  const response = await axios.get("http://localhost:4000/api/diaries", {
    params: { email },
  });
  return response.data;
};

export const useGetDiaries = (email: string) => {
  return useQuery<DiaryListItem[]>({
    queryKey: ["diaries", email],
    queryFn: () => getDiaries(email),
    refetchOnWindowFocus: false,
    enabled: !!email,
  });
};

const saveDiaryRequest = (newDiary: DiaryPost) => {
  return axios.post("http://localhost:4000/api/diaries", newDiary);
};

export const useSaveDiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveDiaryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
  });
};
