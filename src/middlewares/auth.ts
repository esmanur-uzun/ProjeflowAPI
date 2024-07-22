import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { config } from "../@utils/config";
import APIError from "../@utils/errors";
import User from "../app/users/model";

interface UserPayload {
    userName: string;
}

declare module "express-serve-static-core" {
    interface Request {
        user?: UserPayload;
    }
}

const JWT = {
    createToken(user: { userName: string }, res: Response) {
        const secretKey = config.jwt_access_secret as string;

        const token = jwt.sign({ userName: user.userName }, secretKey, {
            algorithm: "HS512",
            expiresIn: config.jwt_expires_in
        });

        return res.status(201).json({
            success: true,
            token,
            message: "Giriş başarılı"
        });
    },

    async tokenCheck(req: Request, res: Response, next: NextFunction) {
        const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");

        if (!headerToken) {
            throw new APIError("Geçersiz oturum, lütfen giriş yapın!", 401);
        }

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new APIError("Token bulunamadı, lütfen giriş yapın!", 401);
        }

        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload & { userName: string };

        if (decoded && typeof decoded === 'object' && 'userName' in decoded) {
            const userInfo = await User.findOne({ userName: decoded.userName })
            
            if (!userInfo) {
                throw new APIError("Kullanıcı bulunamadı!", 404);
            }

            req.user = userInfo;
           
        }
        next();
    }
};

export default JWT;
