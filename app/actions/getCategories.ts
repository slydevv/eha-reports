import prisma from "../lib/prisma";

import getSession from "./getSession";

export const getAllCategories = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const AllCategories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
      
    });
 

    return AllCategories;
  } catch (error: any) {
    return null;
  }
};
