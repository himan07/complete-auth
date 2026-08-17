import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient()

class AuthService {
    static registerUser = async (username: String, email: String, password: String) => {
        const hashpassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                username, email, password: hashpassword
            }
        })

        return user
    }

    static findUserById = async (id: number) => {
        return prisma.user.findUnique({ where: { id: id } })
    }
}