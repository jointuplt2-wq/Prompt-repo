import { useState, useCallback } from 'react';
import { loadPrompts, savePrompts, createPrompt } from '../utils/storage';

export function usePrompts() {
  const [prompts, setPrompts] = useState(() => loadPrompts());

  const add = useCallback((data) => {
    const next = [createPrompt(data), ...loadPrompts()];
    savePrompts(next);
    setPrompts(next);
  }, []);

  const update = useCallback((id, data) => {
    const next = loadPrompts().map((p) =>
      p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString().slice(0, 10) } : p
    );
    savePrompts(next);
    setPrompts(next);
  }, []);

  const remove = useCallback((id) => {
    const next = loadPrompts().filter((p) => p.id !== id);
    savePrompts(next);
    setPrompts(next);
  }, []);

  const incrementCopy = useCallback((id) => {
    const next = loadPrompts().map((p) =>
      p.id === id ? { ...p, copyCount: (p.copyCount || 0) + 1 } : p
    );
    savePrompts(next);
    setPrompts(next);
  }, []);

  return { prompts, add, update, remove, incrementCopy };
}
