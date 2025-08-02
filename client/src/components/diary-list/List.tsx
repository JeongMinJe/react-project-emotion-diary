import { FaLink } from "react-icons/fa6";
import { useEffect, useState } from "react";
import type { DiaryListItemProps } from "../../types/diary";
import axios from "axios";

const ListItem = ({ title, content, date }: DiaryListItemProps) => (
  <div className="bg-white rounded-md shadow-sm p-4 mb-2 cursor-pointer hover:bg-slate-100 transition-colors">
    <h3 className="font-semibold text-slate-700 text-sm sm:text-base truncate">
      {title}
    </h3>
    <p className="text-slate-500 text-xs sm:text-sm truncate">{content}</p>
    <time className="text-slate-400 text-xs mt-1">{date}</time>
  </div>
);

const List = () => {
  const [diaries, setDiaries] = useState<DiaryListItemProps[]>([]);

  const getDiaries = async () => {
    const response = await axios.get("http://localhost:4000/api/diaries", {
      params: {
        email: "test@example.com",
      },
    });

    setDiaries(response.data);
  };

  useEffect(() => {
    getDiaries();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-800">Diary Entries</h2>
        <button className="p-2 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400">
          <FaLink className="text-slate-500 w-5 h-5" />
        </button>
      </div>
      {/* 일기 목록 */}
      <div className="overflow-y-auto flex-grow">
        {diaries.map((diary, index) => (
          <ListItem
            key={index}
            title={diary.title}
            content={diary.content}
            date={diary.date}
          />
        ))}
        {diaries.length === 0 && (
          <div className="text-center text-slate-500 py-6">
            저장된 일기가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
