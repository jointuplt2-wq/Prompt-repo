import { useState } from 'react';
import PromptForm from './PromptForm';

export default function DetailModal({ prompt, onClose, onUpdate, onDelete, onCopy }) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleCopy() {
    let ok = false;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(prompt.content);
        ok = true;
      } else {
        const el = document.createElement('textarea');
        el.value = prompt.content;
        el.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
        document.body.appendChild(el);
        el.select();
        ok = document.execCommand('copy');
        document.body.removeChild(el);
      }
    } catch (_) {}
    if (ok) {
      onCopy(prompt.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleSave(data) {
    onUpdate(prompt.id, data);
    setEditing(false);
  }

  function handleDelete() {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    onDelete(prompt.id);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-800 dark:text-gray-100 text-base truncate pr-2">{prompt.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none">×</button>
        </div>

        <div className="p-5">
          {editing ? (
            <PromptForm
              initial={{ title: prompt.title, content: prompt.content, category: prompt.category }}
              onSave={handleSave}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-gray-400 dark:text-gray-500">{prompt.createdAt}</span>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">{prompt.category}</span>
              </div>

              <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200 leading-relaxed bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4 font-sans">
                {prompt.content}
              </pre>

              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className={`flex-1 font-medium text-sm py-2 rounded-lg transition ${
                    copied ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {copied ? '✓ 복사됨!' : '📋 복사'}
                </button>
                <button onClick={() => setEditing(true)}
                  className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  수정
                </button>
                {confirmDelete ? (
                  <>
                    <button onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition">
                      확인
                    </button>
                    <button onClick={() => setConfirmDelete(false)}
                      className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      취소
                    </button>
                  </>
                ) : (
                  <button onClick={handleDelete}
                    className="border border-red-200 dark:border-red-800 text-red-500 dark:text-red-400 text-sm px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition">
                    삭제
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
