import { useEffect } from "react";

// Make sure this is a named export
export function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}
