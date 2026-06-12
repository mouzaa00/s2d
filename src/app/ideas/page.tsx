"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { Doc } from "../../../convex/_generated/dataModel";

type IdeaStatus = "planned" | "in-progress" | "completed" | "under-review";

const statusLabel: Record<IdeaStatus, string> = {
  planned: "Planned",
  "in-progress": "In Progress",
  completed: "Completed",
  "under-review": "Under Review",
};

const statusVariant: Record<
  IdeaStatus,
  "default" | "secondary" | "outline" | "ghost"
> = {
  planned: "secondary",
  "in-progress": "default",
  completed: "outline",
  "under-review": "ghost",
};

function formatDate(date: number) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const defaultStatus: IdeaStatus = "planned";

export default function IdeasPage() {
  const ideas = useQuery(api.ideas.getIdeas);
  const createIdea = useMutation(api.ideas.createIdea);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<IdeaStatus>(defaultStatus);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    await createIdea({ title, description, status });
    setTitle("");
    setDescription("");
    setStatus(defaultStatus);
    setOpen(false);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Feature Requests</h1>
          <p className="mt-1 text-muted-foreground">
            Browse and vote on ideas for what we should build next.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>New Idea</Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>New Feature Request</DialogTitle>
                <DialogDescription>
                  Share your idea for what we should build next.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="A short, clear title"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the feature in detail"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={status}
                    onValueChange={(v) => setStatus(v as IdeaStatus)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {ideas?.map((idea: Doc<"ideas">) => (
          <Card key={idea._id} size="sm">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle>{idea.title}</CardTitle>
                <Badge variant={statusVariant[idea.status]}>
                  {statusLabel[idea.status]}
                </Badge>
              </div>
              <CardDescription>
                {formatDate(idea._creationTime)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{idea.description}</p>
            </CardContent>
            <CardContent>
              <span className="text-sm font-medium">{idea.votes} votes</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
