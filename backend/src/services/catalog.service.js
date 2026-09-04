import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { categoriesTable, medicineTable } from "../models/index.js";

const listCategories = async () => {
  return await db.select().from(categoriesTable);
};

const getCategoryByName = async (categoryName) => {
  const [category] = await db
    .select({
      categoryName: categoriesTable.categoryName,
    })
    .from(categoriesTable)
    .where(eq(categoriesTable.categoryName, categoryName))
    .limit(1);

  return category;
};

export { listCategories, getCategoryByName };
