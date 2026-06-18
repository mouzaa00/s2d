import { ConvexError } from "convex/values";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createProject = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (existing) {
      throw new ConvexError(
        `A project with slug "${args.slug}" already exists.`,
      );
    }

    return await ctx.db.insert("projects", {
      name: args.name,
      slug: args.slug,
    });
  },
});
