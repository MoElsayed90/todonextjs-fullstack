import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITodo } from "@/interfaces";
import { Badge } from "./ui/badge";
import TodosTableActions from "./TodosTableActions";
export function TodoTable({ todos }: { todos: ITodo[] }) {
  return (
    <Table>
      <TableCaption>A list of your recent Todos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>title</TableHead>
          <TableHead>complete</TableHead>
          <TableHead>createdAt</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo?.id}>
            <TableCell className="font-medium">{todo?.id}</TableCell>
            <TableCell>{todo?.title}</TableCell>
            <TableCell>
              {todo?.completed ? (
                <Badge className="w-full flex items-center justify-center">
                  completed
                </Badge>
              ) : (
                <Badge
                  className="w-full flex items-center justify-center"
                  variant="secondary"
                >
                  uncompleted
                </Badge>
              )}
            </TableCell>
            <TableCell>{todo?.createdAt? (
    <span>{todo.createdAt.toLocaleString()}</span>
  ) : (
    <span>Unknown</span>
  )}</TableCell>
            <TableCell className="flex items-center justify-end space-x-2">
              <TodosTableActions todo={todo} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{!todos.length ? "You Dont't have any Todos" : todos.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
