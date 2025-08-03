import { FaLink } from "react-icons/fa6";
import type { DiaryListItem } from "../../types/diary";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const SkeletonItem = () => {
  return (
    <div className="bg-slate-100 rounded-md p-4 mb-2 animate-pulse">
      <div className="h-4 bg-slate-300 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-slate-300 rounded w-full mb-3"></div>
      <div className="h-3 bg-slate-300 rounded w-1/3"></div>
    </div>
  );
};
const ListItem = ({ title, content, date }: DiaryListItem) => (
  <div className="bg-white rounded-md shadow-sm p-4 mb-2 cursor-pointer hover:bg-slate-100 transition-colors">
    <h3 className="font-semibold text-slate-700 text-sm sm:text-base truncate">
      {title}
    </h3>
    <p className="text-slate-500 text-xs sm:text-sm truncate">{content}</p>
    <time className="text-slate-400 text-xs mt-1">{date}</time>
  </div>
);

const List = () => {
  const {
    data: diaries,
    isFetching,
    isPending,
  } = useQuery<DiaryListItem[]>({
    queryKey: ["diaries", "test@example.com"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/api/diaries", {
        params: {
          email: "test@example.com",
        },
      });

      return response.data;
    },
    refetchOnWindowFocus: false,
  });

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
                date={diary.date}
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
