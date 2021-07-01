import React from "react";

export interface ScreenProps {
  /**
   * Defaults to "dark-content"
   */
  statusBar?: "light-content" | "dark-content";

  /**
   * Should we not wrap in SafeAreaView? Defaults to false.
   */
  unsafe?: boolean;

  /**
   * Props that indicates to show loading spinner
   */
  isLoading?: boolean;

  children?: React.ReactNodeArray | React.ReactNode;

  /**
   * Props that indicates if the children will be wrapped with a scrollview
   */
  scroll?: boolean;

  /**
   * Props that indiates if screen has an error to render
   */
  errorMessage?: string | null;
}
