import multer from "multer";
import path from "path";
import {__dirname} from "../../index.js";
import * as fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'static', 'images'); // Путь к папке для изображений
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        const filename = Date.now() + extname;
        cb(null, filename);
    }
});

export const upload = multer({storage: storage});