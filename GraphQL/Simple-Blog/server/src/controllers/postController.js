import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createPost = async ({ content, imageUrl, userId }) => {
    try {
        console.log({ content, imageUrl, userId })
        
        await prisma.post.create({
            data: {
                userId,
                content,
                ...(imageUrl && { imageUrl }),
            }
        })

        return {
            status: true,
            message: "Post created Successfully!"
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getPosts = async ({ id }) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                userId: {
                    not: id
                }
            }
        })
        return posts;
    } catch (error) {
        throw new Error(error.message);
    }
}