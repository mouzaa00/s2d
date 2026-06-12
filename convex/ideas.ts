import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedIdeas = mutation({
  args: {
    ideas: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
        status: v.union(
          v.literal("planned"),
          v.literal("in-progress"),
          v.literal("under-review"),
          v.literal("completed"),
        ),
        votes: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const insertedIds = [];

    for (const idea of args.ideas) {
      const insertedId = await ctx.db.insert("ideas", {
        title: idea.title,
        description: idea.description,
        status: idea.status,
        votes: idea.votes,
      });
      insertedIds.push(insertedId);
    }
    return { insertedIds };
  },
});

export const clearIdeas = mutation({
  args: {},
  handler: async (ctx) => {
    const ideas = await ctx.db.query("ideas").collect();
    for (const idea of ideas) {
      await ctx.db.delete(idea._id);
    }
  },
});
