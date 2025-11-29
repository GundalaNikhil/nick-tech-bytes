"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1f2937",
          color: "#fff",
          borderRadius: "12px",
          border: "1px solid rgba(139, 92, 246, 0.3)",
          padding: "16px",
          fontSize: "14px",
          fontWeight: "500",
        },
        success: {
          duration: 4000,
          iconTheme: {
            primary: "#10b981",
            secondary: "#fff",
          },
          style: {
            background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
            border: "1px solid rgba(16, 185, 129, 0.5)",
            boxShadow: "0 10px 40px rgba(16, 185, 129, 0.2)",
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
          style: {
            background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
            border: "1px solid rgba(239, 68, 68, 0.5)",
            boxShadow: "0 10px 40px rgba(239, 68, 68, 0.2)",
          },
        },
        loading: {
          iconTheme: {
            primary: "#8b5cf6",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
