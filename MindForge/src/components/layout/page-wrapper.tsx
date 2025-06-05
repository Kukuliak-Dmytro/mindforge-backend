"use client";
import { ThemeToggle } from "../ui/theme-toggle";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {

  
  return (
    <div className={`flex flex-col items-center w-full min-h-screen bg-white-bg dark:bg-[color:var(--color-white-bg)] text-rich-black dark:text-[color:var(--color-rich-black)] ${className}`}>
      <ThemeToggle></ThemeToggle>
      {children}
    </div>
  );
}
