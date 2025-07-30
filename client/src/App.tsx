import DiaryViewer from "./components/diary-viewer";

function App() {
  return (
    <main className="flex flex-col md:flex-row h-screen p-64 md:p-8 gap-8">
      {/* 왼쪽 컴포넌트 컨테이너 */}
      <section className="h-1/2 md:h-full md:w-1/2 bg-white rounded-xl shadow-md p-6 overflow-y-auto">
        <DiaryViewer />
      </section>

      {/* 오른쪽 컴포넌트 컨테이너 */}
      <aside className="h-1/2 md:h-full md:w-1/2 bg-white/70 backdrop-blur-sm rounded-xl shadow-md p-6 overflow-y-auto">
        {/* 일기 목록 컴포넌트가 들어갈 자리 */}
      </aside>
    </main>
  );
}

export default App;
