import { useEffect } from "react";

const useDocumentTitle = (title) => {
  const title2 = title.charAt(0).toUpperCase() + title.slice(1);
  useEffect(() => {
    document.title = title2;
  }, [title2]);
};

export default useDocumentTitle;
