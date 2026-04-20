const CATEGORY_COLOR = {
  글쓰기: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  코딩:   'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  분석:   'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  번역:   'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300',
  기타:   'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
};

export default function PromptCard({ prompt, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-snug line-clamp-1">{prompt.title}</h3>
        <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLOR[prompt.category] || CATEGORY_COLOR['기타']}`}>
          {prompt.category}
        </span>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">{prompt.content}</p>
      <p className="text-gray-400 dark:text-gray-500 text-xs">{prompt.createdAt}</p>
    </div>
  );
}
