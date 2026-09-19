import { useEffect } from "react";

type DocumentMeta = {
  title: string;
  description: string;
  path: string;
};

function setMetaContent(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute("content", content);
}

/**
 * Overrides the static tags baked into index.html for a specific route,
 * then restores them on unmount — this is a single-page app, so without
 * this every route would share the homepage's title/description/OG tags.
 */
export function useDocumentMeta({ title, description, path }: DocumentMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);

    const url = `https://achrefmaarfi.qzz.io${path}`;
    setMetaContent('meta[property="og:url"]', url);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);

    return () => {
      document.title = previousTitle;
    };
  }, [title, description, path]);
}
