import type { DiaryListItemProps } from "../../types/diary";

const DiaryListItem = ({ title, content, date }: DiaryListItemProps) => (
  <div className="bg-white rounded-md shadow-sm p-4 mb-2 cursor-pointer hover:bg-slate-100 transition-colors">
    <h3 className="font-semibold text-slate-700 text-sm sm:text-base truncate">
      {title}
    </h3>
    <p className="text-slate-500 text-xs sm:text-sm truncate">{content}</p>
    <time className="text-slate-400 text-xs mt-1">{date}</time>
  </div>
);

export default DiaryListItem;
