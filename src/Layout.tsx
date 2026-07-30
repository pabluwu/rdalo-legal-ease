import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGtmPageView from "./hooks/useGtmPageView";

const queryClient = new QueryClient();

const GtmPageViewListener = () => {
  useGtmPageView();
  return null;
};

const Layout = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GtmPageViewListener />
      <Outlet />
    </TooltipProvider>
  </QueryClientProvider>
);

export default Layout;
