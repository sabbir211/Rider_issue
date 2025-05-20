"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "../userContext";
import { Loader } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

// Schema
const formSchema = z.object({
  RiderId: z
    .number()
    .int()
    .gte(10000, { message: "RiderId must be exactly 5 digits." })
    .lte(99999, { message: "RiderId must be exactly 5 digits." }),
  problem_type: z.string().min(1, { message: "Please select a problem type." }),
  description: z
    .string()
    .min(1, { message: "Description is required." })
    .refine((val) => val.trim().split(/\s+/).length <= 150, {
      message: "Description must be 150 words or fewer.",
    }),
});

export default function ProfileForm() {
  const { userData, loading } = useUser();
  const [isLoading, setIsLoading] = useState(loading); // Loading state for the form

  // Set the RiderId value once userData is available
  useEffect(() => {
    // console.log("ReportIssue:",userData?.db?.user_id);

    if (loading) {
      setIsLoading(true); // Set the form as loading until data is available
    } else {
      setIsLoading(false); // Once data is loaded, stop loading
      if (userData?.db?.user_id) {
        form.setValue("RiderId", Number(userData?.db?.user_id)); // Set the RiderId value
      }
    }
  }, [userData, loading]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      RiderId: 0,
      problem_type: "",
      description: "",
    },
  });

  const router = useRouter();

  function onSubmit(values) {
    setIsLoading(true);
    fetch("/api/store_issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        if (data.message === "Issue stored successfully!") {
          alert("Issue submitted successfully!");
          setIsLoading(false);
        } else {
          alert(`Error: ${data.message || "Unknown error"}`);
        }
        router.push("/");
      })
      .catch((error) => {
        alert("Network error or failed to connect");
      });
  }

  if (loading || isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <Loader className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center mx-7">
        <div className="text-gray-500 mt-5 mb-5 text-lg md:text-4xl md:mt-16  font-semibold">
          <h1>Fill the form correctly to get solved</h1>
        </div>
        <div className="md:w-1/4 w-full m-8 md:m-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="RiderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RiderId</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} readOnly />
                    </FormControl>
                    <FormDescription>
                      This is your 5 digit rider Id.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="problem_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Your Problem</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="click here to select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash_not_clear">
                            Cash Not Cleared
                          </SelectItem>
                          <SelectItem value="unable_to_login">
                            Unable to login
                          </SelectItem>
                          <SelectItem value="cancel_order">
                            Cancel Order
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write full details (max 150 words)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
