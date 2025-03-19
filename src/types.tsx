export interface Todo {
  id: string;
  text: string;
  description: string; // Description of the todo
  priority: 'High' | 'Medium' | 'Low';
  tags: string[];
  deadline: string;
}
