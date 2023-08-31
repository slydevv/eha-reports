import prisma from "../lib/prisma";

import getSession from "./getSession";

export const getAllReports = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const AllReports = await prisma.report.findMany({
      orderBy: {
        createdAt: "desc",
      },
      
    });

    return AllReports;
  } catch (error: any) {
    return null;
  }
};
