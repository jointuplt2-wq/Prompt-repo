import { useState, useMemo, useEffect } from 'react';
import { usePrompts } from './hooks/usePrompts';
import GuidePanel from './components/GuidePanel';
import PromptForm from './components/PromptForm';
import PromptCard from './components/PromptCard';
import DetailModal from './components/DetailModal';
import './index.css';

const TABS = ['전체', '글쓰기', '코딩', '분석', '번역', '기타'];

function sendNotification(title, body) {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    new Notification(title, { body, icon: `${import.meta.env.BASE_URL}favicon.svg` });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((perm) => {
      if (perm === 'granted') new Notification(title, { body, icon: `${import.meta.env.BASE_URL}favicon.svg` });
    });
  }
}

export default function App() {
  const { prompts, add, update, remove, incrementCopy } = usePrompts();
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('전체');
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return prompts.filter((p) => {
      const matchTab = tab === '전체' || p.category === tab;
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
      return matchTab && matchSearch;
    });
  }, [prompts, search, tab]);

  function handleSave(data) {
    add(data);
    setShowForm(false);
    sendNotification('💾 저장 완료!', `"${data.title}" 프롬프트가 저장되었습니다.`);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="icon" className="w-8 h-8" />
            프롬프트 저장소
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((v) => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition text-base"
              title={dark ? '라이트 모드' : '다크 모드'}
            >
              {dark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setShowForm((v) => !v)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              {showForm ? '취소' : '+ 새 프롬프트'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <GuidePanel />

        {showForm && (
          <PromptForm onSave={handleSave} onCancel={() => setShowForm(false)} />
        )}

        <div className="space-y-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 제목 또는 내용으로 검색"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />

          <div className="flex gap-2 overflow-x-auto pb-1">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition ${
                  tab === t
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm">
              {prompts.length === 0
                ? '저장된 프롬프트가 없습니다. 첫 번째 프롬프트를 작성해 보세요!'
                : '검색 결과가 없습니다.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filtered.map((p) => (
              <PromptCard key={p.id} prompt={p} onClick={() => setSelected(p)} />
            ))}
          </div>
        )}
      </main>

      {selected && (
        <DetailModal
          prompt={selected}
          onClose={() => setSelected(null)}
          onUpdate={(id, data) => {
            update(id, data);
            setSelected((prev) => ({ ...prev, ...data }));
          }}
          onDelete={(id) => {
            remove(id);
            setSelected(null);
          }}
          onCopy={(id) => {
            incrementCopy(id);
            sendNotification('📋 복사 완료!', '프롬프트가 클립보드에 복사되었습니다.');
          }}
        />
      )}
    </div>
  );
}
