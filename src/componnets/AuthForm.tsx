"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/componnets/ui/button"
import { Form } from "@/componnets/ui/form"
import Link from "next/link"
import { toast } from "sonner"
import { FormFiled } from "./FormFiled"

const formSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export const AuthForm = ({ type }: { type: string }) => {
  const isSignin = type === "signin"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted")
    console.log(values)

    try {
      if (type === "signup") {
        console.log("Signup", values)
        toast.success("Signed up successfully!")
      } else if (type === "signin") {
        console.log("Signin", values)
        toast.success("Signed in successfully!")
      }
    } catch (error: any) {
      console.log("Error:", error)
      toast.error(`An error occurred: ${error.message}`)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-950 text-white p-8 rounded-xl shadow-lg border border-gray-700">
      <Form {...form}>
        <h1 className="text-3xl font-bold text-center mb-6">
          {isSignin ? "Welcome Back" : "Create an Account"}
        </h1>

        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Form errors", errors)
          })}
          className="space-y-6"
        >
          {!isSignin && (
            <FormFiled
              name="name"
              label="Full Name"
              placeholder="Enter your name"
              control={form.control}
            />
          )}
          <FormFiled
            name="email"
            label="Email"
            placeholder="email@xyz.com"
            type="email"
            control={form.control}
          />
          <FormFiled
            name="password"
            label="Password"
            placeholder="Password@123"
            type="password"
            control={form.control}
          />
          <Button type="submit" className="w-full mt-4">
            {isSignin ? "Sign in" : "Create new account"}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-400 mb-2">
          {isSignin ? "No account yet?" : "Already have an account?"}
        </p>
        <Link
          href={isSignin ? "/sign-up" : "/sign-in"}
          className="text-blue-500 hover:underline font-medium"
        >
          {isSignin ? "Sign up" : "Sign in"}
        </Link>
      </div>
    </div>
  )
}
