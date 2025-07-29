function App() {
  return (
    <main className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-gray-50 to-slate-100 p-4 md:px-48 gap-4 md:gap-8">
      <section className="bg-white rounded-xl shadow-md w-full md:w-1/2 p-6 overflow-y-auto min-h-[300px]">
        {/* <DiaryViewer /> 컴포넌트가 들어갈 자리 */}
      </section>
      <section className="bg-white/70 backdrop-blur-sm rounded-xl shadow-md w-full md:w-1/2 p-6 overflow-y-auto min-h-[300px]">
        {/* 일기 목록 컴포넌트가 들어갈 자리 */}
      </section>
    </main>
  );
}

export default App;
