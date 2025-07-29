// app/utils/TransitionContext.js

"use client";

import { createContext, useContext, useState } from 'react';
import { useTransitionRouter } from "next-view-transitions";

export const TransitionContext = createContext({
  pageKey: 0,
  isTransitioning: false, // Add this
  startTransition: (href, onReady) => {},
});

export const useAppTransition = () => {
  return useContext(TransitionContext);
};

export const TransitionProvider = ({ children }) => {
  const [pageKey, setPageKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false); // Add this state
  const transitionRouter = useTransitionRouter();

  const startTransition = (href, onReady) => {
    // 1. Set the flag to true immediately.
    // This will cause a re-render where `isTransitioning` is true.
    setIsTransitioning(true);

    transitionRouter.push(href, {
      onTransitionReady: () => {
        const animation = onReady();

        animation.finished.then(() => {
          // 2. The view transition animation is done.
          // Now, update the key to force the remount.
          setPageKey(prevKey => prevKey + 1);

          // 3. IMPORTANT: Set the flag back to false.
          // This happens in the same render cycle as the key update.
          setIsTransitioning(false);
          console.log("View Transition finished. Key updated and isTransitioning set to false.");
        });
      },
    });
  };

  // Provide the new state in the context value
  const value = { pageKey, startTransition, isTransitioning };

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
};