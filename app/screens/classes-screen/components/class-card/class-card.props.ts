export interface ClassCardProps {
  onPress(): void;
  classInfo: {
    id: string;
    name: string;
    active: boolean;
    teacherName: string;
    createDate: string;
    coinsMax?: number | null;
  };
}
