import db from "../db/index.js";
import { categoriesTable, medicineTable } from "../models/index.js";

const listCategories = async () => {
  return await db.select().from(categoriesTable);
};

export { listCategories };
