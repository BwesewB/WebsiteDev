// CursorContext.js
"use client";
import React, { createContext, useContext, useState } from "react";

const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const setHoverState = (state) => {
    setIsHovered(state);
  };

  return (
    <CursorContext.Provider value={{ isHovered, setHoverState }}>
      {children}
    </CursorContext.Provider>
  );
};
