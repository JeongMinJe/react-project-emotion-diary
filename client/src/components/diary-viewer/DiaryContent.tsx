// 부모로부터 onOpenChat 함수를 prop으로 받기 위한 타입 정의
interface DiaryContentProps {
  onOpenChat: () => void;
}

const DiaryContent = ({ onOpenChat }: DiaryContentProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
      {/* 일기 입력 영역 */}
      <textarea
        className="flex-grow w-full p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="오늘 하루는 어땠나요?"
      />

      {/* 하단 버튼 영역 */}
      <div className="mt-4 flex rounded-lg overflow-hidden border border-slate-300">
        {/* 일기 저장 버튼 */}
        <button className="w-full py-2.5 px-4 font-medium bg-slate-700 text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500">
          일기 저장
        </button>

        {/* 구분선 */}
        <div className="w-px bg-slate-300" />

        {/* AI와 대화 버튼 */}
        <button
          onClick={onOpenChat}
          className="w-full py-2.5 px-4 font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          AI와 대화
        </button>
      </div>
    </div>
  );
};

export default DiaryContent;
