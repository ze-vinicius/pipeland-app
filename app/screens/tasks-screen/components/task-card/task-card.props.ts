export interface TaskCardProps {
  taskInfo: {
    id: string;
    title: string;
    delivery_date: string;
    task_value: number;
    status: string;
    task_elements: Array<{
      id: string;
      name: string;
      imageUrl: string;
    }>;
  };
  onPress(): void;
}
