"use client";

import { useMutation } from "convex/react";
import { Button } from "~/components/ui/button";
import { api } from "../../../convex/_generated/api";
import { ideas } from "../ideas/mock-data";

export default function SandboxPage() {
  const seedIdeas = useMutation(api.ideas.seedIdeas);
  const clearIdeas = useMutation(api.ideas.clearIdeas);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Sandbox</h1>
      <p className="mb-10 text-muted-foreground">
        This is a playground for testing new components and ideas.
      </p>
      {/* Add your sandbox content here */}

      <Button
        onClick={async () => {
          await clearIdeas();
          const insertableIdeas = ideas.map((idea) => ({
            title: idea.title,
            description: idea.description,
            status: idea.status,
            votes: idea.votes,
          }));
          const result = await seedIdeas({ ideas: insertableIdeas });
          console.log(`seeded: ${result}`);
        }}
      >
        SEED DB
      </Button>
    </main>
  );
}
