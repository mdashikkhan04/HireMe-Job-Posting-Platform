import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'uploads/cv/',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.fieldname}${ext}`);
    },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF and DOCX files allowed'), false);
    }
};

export const uploadCV = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
