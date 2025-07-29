import axios from "axios";
import DiaryViewer from "./components/diary-viewer";
import { useEffect } from "react";

function App() {
  // const test = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:4000/api/chat", {
  //       messages: "지금 Gemini 를 테스트중인데 1분에 몇회까지가 무료인가?",
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   test();
  // }, []);

  return (
    <main className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-gray-50 to-slate-100 p-4 md:px-32 gap-4 md:gap-8">
      <section className="bg-white rounded-xl shadow-md w-full md:w-1/2 p-6 overflow-y-auto min-h-[300px]">
        <DiaryViewer />
      </section>
      <section className="bg-white/70 backdrop-blur-sm rounded-xl shadow-md w-full md:w-1/2 p-6 overflow-y-auto min-h-[300px]">
        {/* 일기 목록 컴포넌트가 들어갈 자리 */}
      </section>
    </main>
  );
}

export default App;
