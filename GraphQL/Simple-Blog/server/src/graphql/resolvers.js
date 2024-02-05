import { PrismaClient } from '@prisma/client'
import { loginUser, registerUser } from '../controllers/authController.js';

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
    },
    Mutation: {
        async login(_, { Input }) {
            const { email, password } = Input;
            
            return await loginUser({ email, password });
        },
        async register(_, { Input }) {
            const { name, email, password } = Input;

            return registerUser({ name, email, password });
        }
    }
}