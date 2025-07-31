import ConversationSection from "./ConversationSection";
import DiaryContent from "./DiaryContent";
import DiaryHeader from "./DiaryHeader";

const DiaryViewer = () => {
  return (
    <div className="flex flex-col gap-4 h-full shadow-md">
      <header className="flex-shrink-0">
        <DiaryHeader />
      </header>

      <main className="flex-grow overflow-y-auto min-h-0 ">
        <DiaryContent onOpenChat={() => {}} />
      </main>

      {/* <footer className="h-72 flex-shrink-0">
        <ConversationSection />
      </footer> */}
    </div>
  );
};

export default DiaryViewer;
