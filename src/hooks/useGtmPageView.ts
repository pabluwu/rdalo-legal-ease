import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useGtmPageView = () => {
  const location = useLocation();

  useEffect(() => {
    const dataLayer = (window as any).dataLayer;
    if (!Array.isArray(dataLayer)) return;

    dataLayer.push({
      event: "page_view",
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);
};

export default useGtmPageView;
