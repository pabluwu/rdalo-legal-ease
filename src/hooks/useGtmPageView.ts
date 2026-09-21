import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pushDataLayer } from "@/analytics/gtm";

const useGtmPageView = () => {
  const location = useLocation();

  useEffect(() => {
    pushDataLayer({
      event: "page_view",
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);
};

export default useGtmPageView;
