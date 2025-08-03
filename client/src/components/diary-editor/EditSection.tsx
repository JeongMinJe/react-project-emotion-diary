import { useIsFetching } from "@tanstack/react-query";
import { useRef } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useSaveDiary } from "../../queries/useDiaries";
import { useGenerateTitle } from "../../queries/useAI";

interface EditSectionProps {
  onOpenChat: () => void;
}

const EditSection = ({ onOpenChat }: EditSectionProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const isListFetching = useIsFetching({ queryKey: ["diaries"] });

  const { mutate: saveDiary } = useSaveDiary();
  const { mutateAsync: generateTitle } = useGenerateTitle();

  const handleSave = async () => {
    const content = textAreaRef.current?.value || "";
    if (!content.trim()) return; // 어딘가에, 알림을 주어야 할 듯.

    const response = await generateTitle(content);
    const titleFromAI = response.data.title;

    const newDiary = {
      title: titleFromAI,
      user_doc_id: "CWD91jDBLyyNNo4jbNKK",
      content,
    };

    saveDiary(newDiary);
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
        {/* AI와 대화 버튼 (기준) */}
        <button
          onClick={onOpenChat}
          className="cursor-pointer w-32 h-11 flex justify-center items-center text-sm font-semibold text-slate-500 bg-white border border-slate-300 rounded-lg transition-colors hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300"
        >
          AI와 대화
        </button>

        {/* 일기 저장 버튼 (수정) */}
        <button
          disabled={isListFetching > 0}
          onClick={handleSave}
          className={`cursor-pointer w-32 h-11 flex justify-center items-center text-sm font-semibold bg-slate-700 text-white rounded-lg transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {isListFetching > 0 ? (
            <ImSpinner2 className="animate-spin h-5 w-5" />
          ) : (
            <span>일기 저장</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditSection;
