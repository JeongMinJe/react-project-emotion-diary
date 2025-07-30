import DiaryViewer from "./components/diary-viewer";

function App() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-100 min-h-screen py-4 px-4 sm:py-8 sm:px-24">
      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row h-full lg:h-[calc(100vh-4rem)] gap-8">
        <section className="h-1/2 lg:h-full lg:w-1/2 bg-white rounded-xl shadow-md p-6 overflow-y-auto">
          <DiaryViewer />
        </section>

        <aside className="h-1/2 lg:h-full lg:w-1/2 bg-white/70 backdrop-blur-sm rounded-xl shadow-md p-6 overflow-y-auto">
          {/* 일기 목록 컴포넌트가 들어갈 자리 */}
        </aside>
      </main>
    </div>
  );
}

export default App;
