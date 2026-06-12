import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
  ideas: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("planned"),
      v.literal("in-progress"),
      v.literal("completed"),
      v.literal("under-review"),
    ),
    votes: v.number(),
  }),
});
