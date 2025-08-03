import { useState } from "react";
import ConversationSection from "./ConversationSection";
import EditSection from "./EditSection";
import Header from "./Header";

const DiaryEditor = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex flex-col h-full shadow-md">
      <header className="flex-shrink-0">
        <Header />
      </header>

      <main className="flex-grow overflow-y-auto min-h-0 ">
        {isChatOpen ? (
          <ConversationSection onGoBack={() => setIsChatOpen(false)} />
        ) : (
          <EditSection
            onOpenChat={() => {
              setIsChatOpen(true);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default DiaryEditor;
