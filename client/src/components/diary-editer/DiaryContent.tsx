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
      user_doc_id: "CWD91jDBLyyNNo4jbNKK",
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

      <div className="mt-4 flex items-center justify-end gap-3">
        {/* AI와 대화 버튼 */}
        <button
          onClick={onOpenChat}
          className="py-3 px-6 text-sm font-semibold text-slate-500 bg-white border border-slate-300 rounded-lg transition-colors hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300"
        >
          AI와 대화
        </button>

        {/* 일기 저장 버튼 */}
        <button
          disabled={isListFetching > 0}
          onClick={handleSave}
          className={`py-3 px-6 text-sm font-semibold bg-slate-700 text-white rounded-lg transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 ${
            isListFetching > 0 ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isListFetching ? (
            <div className="flex items-center justify-center">
              <ImSpinner2 className="animate-spin h-4 w-4 mr-2" /> 저장 중...
            </div>
          ) : (
            "일기 저장"
          )}
        </button>
      </div>
    </div>
  );
};

export default DiaryContent;
