import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10)
});

export const newsletterSchema = z.object({
  name: z.string().optional(),
  email: z.string().email()
});

export const commentSchema = z.object({
  postId: z.string().min(1),
  content: z.string().min(2),
  replyToId: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional()
});
