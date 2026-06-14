import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createIdea = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("planned"),
      v.literal("in-progress"),
      v.literal("under-review"),
      v.literal("completed"),
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("ideas", {
      title: args.title,
      description: args.description,
      status: args.status,
      votes: 0,
    });
  },
});

export const getIdeas = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("ideas").order("desc").collect();
  },
});
