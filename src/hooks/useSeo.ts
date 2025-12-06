import { useEffect } from "react";

type SeoOptions = {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
};

const ensureMetaTag = (selector: string, attributes: Record<string, string>) => {
  let tag = document.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => tag?.setAttribute(key, value));
    document.head.appendChild(tag);
  }
  return tag;
};

const useSeo = ({ title, description, keywords, ogTitle, ogDescription }: SeoOptions) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      const descTag = ensureMetaTag('meta[name="description"]', { name: "description", content: description });
      descTag.setAttribute("content", description);
    }

    if (keywords?.length) {
      const keywordsTag = ensureMetaTag('meta[name="keywords"]', { name: "keywords", content: keywords.join(", ") });
      keywordsTag.setAttribute("content", keywords.join(", "));
    }

    if (ogTitle || ogDescription) {
      if (ogTitle) {
        const ogTitleTag = ensureMetaTag('meta[property="og:title"]', { property: "og:title", content: ogTitle });
        ogTitleTag.setAttribute("content", ogTitle);
      }
      if (ogDescription) {
        const ogDescTag = ensureMetaTag('meta[property="og:description"]', { property: "og:description", content: ogDescription });
        ogDescTag.setAttribute("content", ogDescription);
      }
    }
  }, [title, description, keywords, ogTitle, ogDescription]);
};

export default useSeo;
