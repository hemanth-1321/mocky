"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Link from "next/link"
import { toast } from "sonner"
import { FormFiled } from "./FormFiled"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/lib/actions/auth.actions"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export const AuthForm = ({ type }: { type: string }) => {
      const router=useRouter()      
   
  const [loading, setLoading] = useState(false);

  const isSignin = type === "signin"
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log("Form submitted")
    console.log(values)

    try {
      if (type === "signup") {
        console.log("Signup", values)
          await signUp({
        name: values.name ?? "",
        email: values.email,
        password: values.password,
      })

        toast.success("Signed up successfully! Please Login")
   router.push("/sign-in")
      } else if (type === "signin") {
        console.log("Signin", values)
        await signIn({
        email: values.email,
        password: values.password,
      })
        toast.success("Signed in successfully!")
      router.push("/")
      }
    } catch (error: any) {
      console.log("Error:", error)
      toast.error(`An error occurred: ${error.message}`)
    }finally {
    setLoading(false)
  }
  }

  return (
    <div className="max-w-md mx-auto mt-10  bg-gray-400 dark:bg-gray-950  p-8 rounded-xl shadow-lg border border-gray-700">
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
         <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={loading}>
           {loading ? "Loading..." : isSignin ? "Sign in" : "Create new account"}
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
