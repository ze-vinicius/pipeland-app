import { PipelandSystemProps } from "../pipeland-system";

export interface ProgressBarProps extends PipelandSystemProps {
  totalPoints: number;
  currentPoints: number;
}
