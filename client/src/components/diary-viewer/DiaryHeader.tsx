import { FaCircleUser } from "react-icons/fa6";

const DiaryHeader = () => {
  return (
    // justify-between 제거
    <section className="flex items-center">
      {/* 제목 (왼쪽) */}
      <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
        Emotion Diary
      </h1>

      {/* 사용자 정보 (오른쪽으로 밀어냄) */}
      <div className="ml-auto flex items-center font-bold">
        <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 mr-2">
          <FaCircleUser className="w-6 h-6 md:w-8 md:h-8 text-slate-600" />
        </button>
        <div className="whitespace-nowrap text-sm md:text-base">User Name</div>
      </div>
    </section>
  );
};

export default DiaryHeader;
