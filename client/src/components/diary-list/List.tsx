import { FaChevronDown, FaLink } from "react-icons/fa6";
import type { DiaryListItem } from "../../types/diary";
import { useGetDiaries } from "../../queries/useDiaries";
import { useState } from "react";

const SkeletonItem = () => {
  return (
    <div className="bg-slate-100 rounded-md p-4 mb-2 animate-pulse">
      <div className="h-4 bg-slate-300 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-slate-300 rounded w-full mb-3"></div>
      <div className="h-3 bg-slate-300 rounded w-1/3"></div>
    </div>
  );
};

const ListItem = ({ title, content, created_at }: DiaryListItem) => {
  const [isOpen, setIsOpen] = useState(false);

  const getFirstSentence = (text: string) => {
    const firstSentence = text.split(".")[0];
    const maxLength = 80;
    if (firstSentence && firstSentence.length > maxLength) {
      return firstSentence.substring(0, maxLength) + "...";
    }
    return firstSentence || "";
  };

  const firstSentence = getFirstSentence(content);

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <div
        className="grid grid-cols-[1fr_auto] items-center gap-4 p-4 cursor-pointer hover:bg-slate-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="truncate">
          <h3 className="font-semibold text-slate-800 truncate">{title}</h3>
          {!isOpen && (
            <p className="text-slate-500 text-xs sm:text-sm truncate">
              {firstSentence}
            </p>
          )}
          <time className="text-slate-500 text-xs">{created_at}</time>
        </div>

        <FaChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-slate-600 text-sm p-4 pt-0">{content}</p>
        </div>
      </div>
    </div>
  );
};

const List = () => {
  const {
    data: diaries,
    isFetching,
    isPending,
  } = useGetDiaries("test@example.com");

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
        {isPending ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonItem key={index} />
          ))
        ) : (
          <>
            {isFetching && <SkeletonItem />}
            {diaries?.map((diary, index) => (
              <ListItem
                key={index}
                title={diary.title}
                content={diary.content}
                created_at={diary.created_at}
              />
            ))}

            {diaries?.length === 0 && !isFetching && (
              <div className="text-center text-slate-500 py-6">
                저장된 일기가 없습니다.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default List;
