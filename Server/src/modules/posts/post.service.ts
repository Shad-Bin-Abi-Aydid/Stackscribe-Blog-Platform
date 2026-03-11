import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (data:Omit<Post,'id' | 'createAt' | 'updateAt' | 'authorId'>, userId: string) => {

    const result = await prisma.post.create({
        data:{
            ...data,
            authorId:userId 
        }
    })

    return result;

}

export const postServices = {
    createPost
}