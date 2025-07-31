import { FaLink } from "react-icons/fa6";
import DiaryListItem from "./DiaryItem";
import { useState } from "react";
import type { DiaryListItemProps } from "../../types/diary";

const DiaryList = () => {
  const [diaries] = useState<DiaryListItemProps[]>([
    {
      title: "Morning Thoughts",
      content: "Diary Thoughts we yolinghing iy",
      date: "October 26, 2023",
    },
    {
      title: "Ary dip",
      content: "Ustrope sheudhed the hage.",
      date: "October 26, 2023",
    },
    {
      title: "Meeting Notes",
      content: "Ursiropuer, mad onferestion nage",
      date: "October 25, 2023",
    },
    {
      title: "Thy dip",
      content: "Uraved Notes your Inagt wouking",
      date: "October 25, 2023",
    },
  ]);

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
          <DiaryListItem
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

export default DiaryList;
