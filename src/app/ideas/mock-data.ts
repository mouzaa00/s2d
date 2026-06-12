export type IdeaStatus = "planned" | "in-progress" | "completed" | "under-review";

export interface Idea {
  id: string;
  title: string;
  description: string;
  status: IdeaStatus;
  votes: number;
  createdAt: string;
}

export const ideas: Idea[] = [
  {
    id: "1",
    title: "Dark mode support",
    description:
      "Add a system-wide dark mode toggle that persists across sessions and respects the OS preference.",
    status: "completed",
    votes: 142,
    createdAt: "2026-01-15",
  },
  {
    id: "2",
    title: "Export to PDF",
    description:
      "Allow users to export their designs and sketches as high-quality PDF documents with customizable layouts.",
    status: "in-progress",
    votes: 98,
    createdAt: "2026-02-03",
  },
  {
    id: "3",
    title: "Team collaboration",
    description:
      "Real-time collaborative editing with comments, mentions, and version history for teams.",
    status: "planned",
    votes: 215,
    createdAt: "2026-02-20",
  },
  {
    id: "4",
    title: "AI-powered suggestions",
    description:
      "Intelligent design suggestions based on existing sketches, using on-device machine learning.",
    status: "under-review",
    votes: 176,
    createdAt: "2026-03-01",
  },
  {
    id: "5",
    title: "Plugin marketplace",
    description:
      "A community-driven plugin system allowing third-party extensions for custom workflows and integrations.",
    status: "planned",
    votes: 87,
    createdAt: "2026-03-12",
  },
  {
    id: "6",
    title: "Keyboard shortcuts cheatsheet",
    description:
      "An interactive cheatsheet overlay showing all available keyboard shortcuts, searchable by action.",
    status: "completed",
    votes: 64,
    createdAt: "2026-03-18",
  },
  {
    id: "7",
    title: "Offline mode",
    description:
      "Full offline support with local storage sync, so work continues seamlessly without internet access.",
    status: "under-review",
    votes: 133,
    createdAt: "2026-04-02",
  },
  {
    id: "8",
    title: "Custom templates",
    description:
      "Let users create, save, and share custom project templates with predefined layouts and styles.",
    status: "in-progress",
    votes: 51,
    createdAt: "2026-04-15",
  },
];
