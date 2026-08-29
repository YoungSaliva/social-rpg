import React from "react";

interface ScreenTransitionProps {
  /** Change this key to re-trigger the enter animation (e.g. screen id). */
  transitionKey: string;
  children: React.ReactNode;
  className?: string;
}

/** Wraps a screen's content so it animates in consistently every time the
 *  app navigates to it. One place to tune the "polished mobile game feel"
 *  requested for screen transitions. */
export function ScreenTransition({ transitionKey, children, className }: ScreenTransitionProps) {
  return (
    <div key={transitionKey} className={`screen-enter ${className ?? ""}`}>
      {children}
    </div>
  );
}
