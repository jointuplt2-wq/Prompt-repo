import { useState } from 'react';

const CATEGORIES = ['글쓰기', '코딩', '분석', '번역', '기타'];
const empty = { title: '', content: '', category: '기타' };

export default function PromptForm({ onSave, initial, onCancel }) {
  const [form, setForm] = useState(initial || empty);
  const [error, setError] = useState('');

  const today = new Date().toISOString().slice(0, 10);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) { setError('제목을 입력해 주세요.'); return; }
    if (!form.content.trim()) { setError('내용을 입력해 주세요.'); return; }
    onSave(form);
    setForm(empty);
  }

  const inputCls = "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500";

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">제목 *</label>
        <input name="title" value={form.title} onChange={handleChange} maxLength={100}
          placeholder="프롬프트의 목적이나 이름을 입력하세요" className={inputCls} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">카테고리</label>
        <select name="category" value={form.category} onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">내용 *</label>
        <textarea name="content" value={form.content} onChange={handleChange} rows={6}
          placeholder="프롬프트 내용을 작성하세요"
          className={`${inputCls} resize-none`} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">작성일</label>
        <input value={today} disabled
          className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500" />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-2 pt-1">
        <button type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition">
          저장
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}
            className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm px-5 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            취소
          </button>
        )}
      </div>
    </form>
  );
}
