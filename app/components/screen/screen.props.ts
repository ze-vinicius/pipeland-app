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
}
