import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { AvailableStatus, StatusEnum } from "../utils/constants.js";

export const categoryStatusEnum = pgEnum("status", AvailableStatus);

const categoriesTable = pgTable("categories", {
  categoryId: uuid("category_id").primaryKey().defaultRandom(),
  categoryName: varchar("category_name", { length: 100 }).notNull().unique(),
  description: text(),
  categoryStatus: categoryStatusEnum("category_status")
    .notNull()
    .default(StatusEnum.ACTIVE),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export default categoriesTable;
