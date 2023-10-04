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
import { signUp } from "@/firebase/auth";
import { Loader2 } from "lucide-react";
import { useState } from "react";
export const Icons = {
  spinner: Loader2,
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  username: z.string().min(4, {
    message: "Username must be at least 4 characters long",
  }),
});

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: {
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      await signUp(data.username, data.email, data.password);
    } catch (err: any) {
      setLoading(false);
      if (err.code == "auth/email-already-in-use") {
        form.setError("root", {
          type: "manual",
          message: "Email already in use, try Sign In",
        });
      } else if (err.code == "auth/weak-password") {
        form.setError("root", {
          type: "manual",
          message: "Weak Password",
        });
      } else if (err.code == "auth/invalid-email") {
        form.setError("email", {
          type: "manual",
          message: "Invalid Email",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 mt-4 w-full"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
                <Input placeholder="Password" type="password" {...field} />
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
            "Sign Up"
          )}
        </Button>
        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
      </form>
    </Form>
  );
}
