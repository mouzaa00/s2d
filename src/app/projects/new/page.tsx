"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function NewProjectPage() {
  const router = useRouter();
  const createProject = useMutation(api.projects.createProject);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !slug.trim()) return;

    try {
      await createProject({ name: name.trim(), slug: slug.trim() });
      window.location.href = `http://${slug}.localhost:3000`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
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
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My awesome project"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Project slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="my-awesome-project"
                required
              />
              <p className="text-xs text-muted-foreground">
                Your project will be accessible at{" "}
                <strong>{slug || "your-slug"}.localhost:3000</strong>
              </p>
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit">Create project</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
