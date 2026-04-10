import { handlers } from "@/auth";

// Force Node.js runtime for Auth.js with Prisma compatibility
export const runtime = "nodejs";

export const { GET, POST } = handlers;
