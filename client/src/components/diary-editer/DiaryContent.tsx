import axios from "axios";
import { useRef } from "react";

// 부모로부터 onOpenChat 함수를 prop으로 받기 위한 타입 정의
interface DiaryContentProps {
  onOpenChat: () => void;
}

const DiaryContent = ({ onOpenChat }: DiaryContentProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  /**
   * 클릭했을 때 그 내용을 백엔드로 전달해야 함.
   * 일단 오늘은 그것부터!
   */

  const saveDiary = async () => {
    try {
      const content = textAreaRef.current?.value;

      // content 가 없을 경우도 처리해야 함.

      const newDiary = {
        user_id: "CWD91jDBLyyNNo4jbNKK",
        emotion_score: 5,
        title: "테스트 일기",
        content,
      };

      const response = await axios.post(
        "http://localhost:4000/api/diaries",
        newDiary
      );

      console.log(response);
    } catch (error) {}
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
          onClick={saveDiary}
          className="w-full py-2.5 px-4 font-medium bg-slate-500 text-white border border-transparent rounded-full transition-colors hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
        >
          일기 저장
        </button>
      </div>
    </div>
  );
};

export default DiaryContent;
