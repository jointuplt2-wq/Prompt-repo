const KEY = 'prompt_repo_v1';

export function loadPrompts() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function savePrompts(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
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
