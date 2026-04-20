import { useState } from 'react';

const TIPS = [
  { type: '역할 부여형', example: '너는 10년 경력의 마케터야. 아래 제품의 카피라이팅을 작성해줘.' },
  { type: '조건 지정형', example: '다음 조건을 지키며 작성해줘: 1) 300자 이내 2) 불릿 포인트 사용 3) 친근한 말투' },
  { type: '형식 지정형', example: '결과를 표(테이블) 형식으로 작성해줘. 컬럼: 항목, 장점, 단점' },
  { type: '단계별 요청형', example: '먼저 핵심 아이디어 3가지를 나열하고, 그 다음 각각의 실행 방안을 작성해줘.' },
];

export default function GuidePanel() {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl mb-6">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold text-blue-800 dark:text-blue-300 text-sm">📖 프롬프트 기재 요령</span>
        <span className="text-blue-500 dark:text-blue-400 text-xs">{open ? '접기 ▲' : '펼치기 ▼'}</span>
      </button>

      {open && (
        <div className="px-5 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TIPS.map((tip) => (
            <div key={tip.type} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-blue-100 dark:border-blue-800">
              <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">{tip.type}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{tip.example}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
