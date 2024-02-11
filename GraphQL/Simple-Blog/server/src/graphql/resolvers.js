import { PrismaClient } from '@prisma/client'
import { getUser, loginUser, registerUser } from '../controllers/authController.js';
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../controllers/postController.js';

const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        async posts(_, __, context) {
            const id = context.req.user.id;

            return await getPosts({ id });
        },
        async post(_, { id }) {
            return await getPostById({ id });
        }
    },
    Post: {
        async user(parent) {
            return await getUser({ id: parent.userId });
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
        },
        async editPost(_, { Input }, context) {
            const { content, imageUrl, postId } = Input;
            const userId = context.req.user.id;

            return await updatePost({ content, imageUrl, postId: +postId, userId: +userId });
        },
        async deletePost(_, { Input }, context) {
            const { postId } = Input;
            const userId = +context.req.user.id;

            return await deletePost({ postId: +postId, userId });
        }
    }
}