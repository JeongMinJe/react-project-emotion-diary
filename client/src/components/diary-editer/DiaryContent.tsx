import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { ImSpinner2 } from "react-icons/im";

interface DiaryContentProps {
  onOpenChat: () => void;
}

interface DiaryPost {
  title: string;
  content: string;
}

const DiaryContent = ({ onOpenChat }: DiaryContentProps) => {
  const queryClient = useQueryClient();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const isListFetching = useIsFetching({ queryKey: ["diaries"] });

  const { mutate } = useMutation({
    mutationFn: (newDiary: DiaryPost) =>
      axios.post("http://localhost:4000/api/diaries", newDiary),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
  });

  const handleSave = () => {
    const content = textAreaRef.current?.value || "";

    const newDiary = {
      title: "새 일기",
      user_id: "CWD91jDBLyyNNo4jbNKK",
      emotion_score: 5,
      content,
    };

    mutate(newDiary);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full">
      {/* 일기 입력 영역 */}
      <textarea
        ref={textAreaRef}
        className="flex-grow w-full p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-slate-400 transition-colors"
        placeholder="오늘 하루는 어땠나요?"
      />

      <div className="mt-4 flex items-center gap-3">
        {/* AI와 대화 버튼 (보조 버튼) */}
        <button
          onClick={onOpenChat}
          className="w-full py-2.5 px-4 font-medium text-slate-500 bg-white border border-slate-300 rounded-full transition-colors hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300"
        >
          AI와 대화
        </button>

        {/* 일기 저장 버튼 (주요 버튼) */}
        <button
          disabled={isListFetching > 0}
          onClick={handleSave}
          className={`w-full py-2.5 px-4 font-medium bg-slate-500 text-white border border-transparent rounded-full transition-colors hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 ${
            isListFetching > 0 ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isListFetching ? (
            <ImSpinner2 className="animate-spin h-5 w-5" /> // 아이콘 크기 지정
          ) : (
            "일기 저장"
          )}
        </button>
      </div>
    </div>
  );
};

export default DiaryContent;
