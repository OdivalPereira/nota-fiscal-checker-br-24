import React from "react";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = "" }: PageLayoutProps) => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <main className={`flex-1 container mx-auto px-4 py-6 ${className}`}>
      {children}
    </main>
    <Footer />
  </div>
);

export default PageLayout;
