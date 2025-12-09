import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries([...searchParams]);

  const setParams = useCallback((newParams) => {
    const merged = { ...params, ...newParams };
    Object.keys(merged).forEach(k => {
      if (merged[k] === undefined || merged[k] === null || merged[k] === '') delete merged[k];
    });
    setSearchParams(merged);
  }, [params, setSearchParams]);

  return { params, setParams };
}
