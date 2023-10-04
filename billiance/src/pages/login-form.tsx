/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { signIn } from "@/firebase/auth";
import { Loader2 } from "lucide-react";
export const Icons = {
  spinner: Loader2,
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          try {
            setLoading(true);
            await signIn(data.email, data.password);
          } catch (err: any) {
            setLoading(false);
            if (err.code == "auth/user-not-found") {
              form.setError("root", {
                type: "manual",
                message: "User not found, please sign up.",
              });
            } else if (err.code == "auth/wrong-password") {
              form.setError("root", {
                message: "Wrong password",
              });
            } else {
              form.setError("root", {
                message: err.message.replace("Firebase", ""),
              });
            }
          }
        })}
        className="space-y-3 mt-4 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Password"
                  className=""
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full disabled:opacity-100"
          disabled={loading}
        >
          {loading ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
        {/* <p className="text-sm font-medium text-destructive">

        </p> */}
        <FormMessage className="text-center">
          {form.formState.errors.root?.message}
        </FormMessage>
      </form>
    </Form>
  );
}
