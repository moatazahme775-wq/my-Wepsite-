import { auth } from "@/auth";
import { Role } from "@prisma/client";

export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireUser();
  if (session.user.role !== Role.ADMIN) {
    throw new Error("Forbidden");
  }
  return session;
}
