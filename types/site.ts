import type { Category, SiteSetting } from "@prisma/client";

export type SiteData = {
  settings: SiteSetting | null;
  categories: Category[];
};
