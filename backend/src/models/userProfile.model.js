import {
  date,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import userTable from "./user.model.js";
import { AvailableGender } from "../utils/constants.js";

export const genderEnum = pgEnum("gender_enum", AvailableGender);

const UserProfileTable = pgTable("user_profiles", {
  profileId: uuid("profile_id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.userId),
  address: varchar({ length: 255 }),
  dateOfBirth: date("date_of_birth"),
  gender: genderEnum(),
  profileUrl: varchar("profile_url", { length: 255 }).default(
    "https://placehold.co/200x200",
  ),
  localUrl: varchar("local_url").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export default UserProfileTable;
