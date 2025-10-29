"use client";

export const toast = {
  success: (message: string) => {
    // You can implement a more sophisticated toast system later
    alert("✅ " + message);
  },
  error: (message: string) => {
    // You can implement a more sophisticated toast system later
    alert("❌ " + message);
  }
};