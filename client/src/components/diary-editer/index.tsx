import { useState } from "react";
import ConversationSection from "./ConversationSection";
import DiaryContent from "./DiaryContent";
import DiaryHeader from "./DiaryHeader";

const DiaryEditer = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex flex-col h-full shadow-md">
      <header className="flex-shrink-0">
        <DiaryHeader />
      </header>

      <main className="flex-grow overflow-y-auto min-h-0 ">
        <DiaryContent
          onOpenChat={() => {
            setIsChatOpen(true);
          }}
        />
      </main>

      {/* <main className="flex-grow overflow-y-auto min-h-0">
        <ConversationSection />
      </main> */}
    </div>
  );
};

export default DiaryEditer;
