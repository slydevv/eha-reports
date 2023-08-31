import prisma from '../lib/prisma'

import getSession from './getSession'

export const getAllUsers = async() => {

    const session = await getSession();

    if (!session?.user?.email) {
        return []
    }

    try {
        const AllUsers = await prisma.user.findMany({
            orderBy:{
                createdAt:'desc'
            },
            select: {
                id:true,
                name:true,
                email: true,
                isAdmin: true,
                categories: true,
                createdAt:true
            }
        });

        return AllUsers;
    } catch (error: any) {
        return null
    }
}