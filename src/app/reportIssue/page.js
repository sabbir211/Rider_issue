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
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import React from "react";

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
    // console.log("Form Data to DB:", values);
  
    fetch('/api/store_issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())  // Parse the JSON response
      .then((data) => {
        // Check if the response is successful
        if (data.message === 'Issue stored successfully!') {
          // Show success message
          alert('Issue submitted successfully!');
          router.push('/')
        } else {
          // Show error message
          alert(`Error: ${data.message || 'Unknown error'}`);
        }
      })
      .catch((error) => {
        // Catch any network or other errors
        alert('Network error or failed to connect');
        // console.error('Error:', error);
      });
  }
  
  

  return (
    <div className="flex flex-col items-center mx-7">
      <div className="text-gray-500 mt-5 mb-5 text-lg md:text-4xl md:mt-16  font-semibold">
        <h1>Fill the form correctly to get solved</h1>
      </div>
      <div className=" md:w-1/4 w-full m-8 md:m-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="RiderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RiderId</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="5 digit rider id"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.value === "" ? "" : +e.target.value)
                      }
                    />
                  </FormControl>
                  <FormDescription>This is your 5 digit rider Id.</FormDescription>
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
                        <SelectItem value="cash_not_clear">Cash Not Cleared</SelectItem>
                        <SelectItem value="unable_to_login">Unable to login</SelectItem>
                        <SelectItem value="cancel_order">Cancel Order</SelectItem>
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
  );
}
