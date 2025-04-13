import { useCallback, useState } from "react";
import cookies from "js-cookie";
import type { CookieAttributes } from "node_modules/@types/js-cookie";

export default function useCookie(name: string, defaultValue: string) {
  const [value, setValue] = useState<string | null>(() => {
    const cookieValue = cookies.get(name);
    if (cookieValue) return cookieValue;
    cookies.set(name, defaultValue);
    return defaultValue;
  });

  const updateCookie = useCallback(
    (newValue: string, options: CookieAttributes) => {
      cookies.set(name, newValue, options);
    },
    [name]
  );

  const deleteCookie = useCallback(() => {
    cookies.remove(name);
    setValue(null);
  }, [name]);

  return [value, updateCookie, deleteCookie] as const;
}
