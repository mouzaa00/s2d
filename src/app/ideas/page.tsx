"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

const statusLabel: Record<IdeaStatus, string> = {
  planned: "Planned",
  "in-progress": "In Progress",
  completed: "Completed",
  "under-review": "Under Review",
};

type IdeaStatus = "planned" | "in-progress" | "completed" | "under-review";

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

export default function IdeasPage() {
  const ideas = useQuery(api.ideas.getIdeas);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Feature Requests</h1>
      <p className="mb-10 text-muted-foreground">
        Browse and vote on ideas for what we should build next.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {ideas?.map((idea) => (
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
