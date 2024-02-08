import { PrismaClient } from '@prisma/client'
import { loginUser, registerUser } from '../controllers/authController.js';
import { createPost } from '../controllers/postController.js';

const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        async posts(_, __, context) {
            const id = context.req.user.id;

            return await prisma.post.findMany({
                where: {
                    userId: {
                        not: id
                    }
                }
            });
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
    },
    Mutation: {
        async login(_, { Input }) {
            const { email, password } = Input;
            
            return await loginUser({ email, password });
        },
        async register(_, { Input }) {
            const { name, email, password } = Input;

            return await registerUser({ name, email, password });
        },
        async createPost(_, { Input }, context) {
            const { content, imageUrl } = Input;
            const userId = context.req.user.id;

            return await createPost({ content, imageUrl, userId });
        }
    }
}