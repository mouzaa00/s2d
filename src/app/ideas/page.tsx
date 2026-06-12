"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { ideas, type IdeaStatus } from "./mock-data";

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

function formatDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function IdeasPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Feature Requests</h1>
      <p className="mb-10 text-muted-foreground">
        Browse and vote on ideas for what we should build next.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {ideas.map((idea) => (
          <Card key={idea.id} size="sm">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle>{idea.title}</CardTitle>
                <Badge variant={statusVariant[idea.status]}>
                  {statusLabel[idea.status]}
                </Badge>
              </div>
              <CardDescription>{formatDate(idea.createdAt)}</CardDescription>
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
