'use client'
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { defaultValues, todoFormSchema, todoFormValues } from "@/schema";
import { createTodoAction } from "@/actions/todo.actions";
import { title } from "process";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import Spinner from "./Spinner";


const FormAddTodo = ({userId}:{userId:string | null}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const defaultValues: Partial<todoFormValues> = {
    title: "",
    body: "",
    completed: false
  }
  const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  })
  const onSubmit = async ({ title, body, completed }: todoFormValues) => {
    setLoading(true)
    await createTodoAction({ title, body, completed , userId })
    setLoading(false)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="ml-auto" >
        <Button>
          <Plus size={14} className="mr-2" />
          New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
           <DialogDescription>
            Make New todo . Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className=" py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="go to the gym" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>short description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder=""
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-x-2 flex items-center">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                    </FormControl>
                    <FormLabel>Completed</FormLabel>
                  </div>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="space-x-2">
                {
                  loading ? (
                    <>
                      <Spinner/> Saving
                    </>
                  ) : (
                    "Saving"
                  )
                }
              </Button>
            </form>
          </Form>
        </div>


      </DialogContent>
    </Dialog>
  )

}

export default FormAddTodo;