import { useState, useCallback } from 'react';
import { loadPrompts, savePrompts, createPrompt } from '../utils/storage';

export function usePrompts() {
  const [prompts, setPrompts] = useState(() => loadPrompts());

  const add = useCallback((data) => {
    setPrompts((prev) => {
      const next = [createPrompt(data), ...prev];
      savePrompts(next);
      return next;
    });
  }, []);

  const update = useCallback((id, data) => {
    setPrompts((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString().slice(0, 10) } : p
      );
      savePrompts(next);
      return next;
    });
  }, []);

  const remove = useCallback((id) => {
    setPrompts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      savePrompts(next);
      return next;
    });
  }, []);

  const incrementCopy = useCallback((id) => {
    setPrompts((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, copyCount: (p.copyCount || 0) + 1 } : p
      );
      savePrompts(next);
      return next;
    });
  }, []);

  return { prompts, add, update, remove, incrementCopy };
}
