export interface ClassCardProps {
  onPress(): void;
  classInfo: {
    id: string;
    name: string;
    active: boolean;
    teacher_name: string;
    create_date: string;
    coins_max?: number | null;
  };
}
