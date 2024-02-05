import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        async posts() {
            return await prisma.post.findMany();
        },
        async post(_, { id }) {
            const post = await prisma.post.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if(!post) {
                throw new Error('No such post exist!');
            }

            return post;
        }
    }
}