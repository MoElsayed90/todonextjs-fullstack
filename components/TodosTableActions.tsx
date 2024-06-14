'use client'
import { deleteTodoAction } from "@/actions/todo.actions"
import { Button } from "./ui/button"
import { Pen, Trash } from "lucide-react"
import Spinner from "./Spinner"
import { useState } from "react"
import FormEditTodo from "./FormEditTodo"
import { ITodo } from "@/interfaces"

const TodosTableActions = ({todo}:{todo:ITodo}) => {
  const [loading, setLoading] = useState(false)
  return (
    <>
    <FormEditTodo todo={todo}/>
      <Button size={"icon"} variant={"destructive"} onClick={async () => {
        setLoading(true)
        await deleteTodoAction({id:todo.id})
        setLoading(false)
      }}>
        {loading ? <Spinner /> : <Trash size={16} />}
      </Button>
    </>
  )

}

export default TodosTableActions;