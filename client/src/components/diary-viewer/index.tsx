import ConversationSection from "./ConversationSection";
import DiaryContent from "./DiaryContent";
import DiaryHeader from "./DiaryHeader";

const DiaryViewer = () => {
  return (
    <div className="flex flex-col h-full gap-4">
      <header className="h-1/5 flex-shrink-0">
        <DiaryHeader />
      </header>

      {/* 일기 내용이 길어지면 이 영역만 스크롤됩니다. */}
      <div className="flex-grow overflow-y-auto shadow-md">
        <DiaryContent />
      </div>

      <footer className="h-72 flex-shrink-0 shadow-md">
        <ConversationSection />
      </footer>
    </div>
  );
};

export default DiaryViewer;
