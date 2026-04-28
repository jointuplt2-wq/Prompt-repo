const KEY = 'prompt_repo_v1';

export function loadPrompts() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function savePrompts(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      alert('저장 공간이 부족합니다. 오래된 프롬프트를 삭제해 주세요.');
    }
    throw e;
  }
}

export function createPrompt({ title, content, category }) {
  return {
    id: crypto.randomUUID(),
    title,
    content,
    category,
    createdAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10),
    copyCount: 0,
  };
}
