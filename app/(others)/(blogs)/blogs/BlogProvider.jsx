"use client";

import React, { createContext } from "react";

// Create Context
export const BlogContext = createContext();

export default function BlogProvider({ blogs, children }) {
  return <BlogContext.Provider value={blogs}>{children}</BlogContext.Provider>;
}
