import { Response, NextFunction } from "express";
import rateLimit from "../config/upstash";

const rateLimiter = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { success } = await rateLimit.limit('my-rate-limit');

        if (!success) {
            res.status(429).json({ message: 'Too many requests' });
            return;
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
};

export default rateLimiter;
