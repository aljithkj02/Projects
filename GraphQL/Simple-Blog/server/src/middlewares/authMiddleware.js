import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const operation = req.body?.operationName;

        if (['Login', 'Register'].includes(operation)) {
            return next();
        }

        const token = req.headers.authorization?.split(' ').pop();

        if(!token) {
            return res.status(401).json({
                status: false,
                message: 'No token provided!'
            })
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = payload;
        next();
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
        })
    }
}