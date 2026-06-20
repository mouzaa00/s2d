"use client";

import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConvexError } from "convex/values";
import { api } from "../../../../convex/_generated/api";
import * as z from "zod/v3";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";

const formSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character."),
  slug: z
    .string()
    .min(1, "Slug must be at least 1 character.")
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Slug must be alphanumeric with hyphens (e.g. my-project)",
    ),
});

export default function NewProjectPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const route = useRouter();
  const createProject = useMutation(api.projects.createProject);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) return redirect("/");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const projectId = await createProject(values);
      route.push(`/projects/${projectId}/feature-ideas`);
    } catch (err) {
      form.setError("root", {
        message:
          err instanceof ConvexError
            ? err.data
            : err instanceof Error
              ? err.message
              : "Failed to create project",
      });
    }
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Create a new project</CardTitle>
          <CardDescription>
            Give your project a name and a unique slug.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Project Name</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="My Awesome Project"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="slug"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="slug">Project Slug</FieldLabel>
                    <Input
                      {...field}
                      id="slug"
                      aria-invalid={fieldState.invalid}
                      placeholder="my-awesome-project"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            {form.formState.errors.root?.message && (
              <p className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}
            <Button type="submit">Create project</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
