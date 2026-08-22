/// <reference types="vite/client" />

declare module "*.css";

declare global {
  interface Window {
    lucide?: {
      createIcons: () => void;
    };
  }
}

export {};
