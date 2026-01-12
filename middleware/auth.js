let Jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: `Token is not present`,
            })
        }
        let token = authHeader.split(" ")[1];
        let decoded = Jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: `Failed to decode in auth middleware`,
            err,
        })

    }
}

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.role !== 'Student') {
            throw new Error(`Tumhara role student ka nahi h`);
        }
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: `Failed in isStudent middleware`,
            err,
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'Admin') {
            throw new Error(`Tumhara role admin ka nahi h`);
        }
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: `Failed in isAdmin middleware`,
            error : err.message
        })
    }

}