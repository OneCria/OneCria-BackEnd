import { Request } from "express";
import { extname } from "path";

export class Helper {
    static customFileName(req: Request, file: Express.Multer.File, callback: any) {
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

        const nameFile = callback(null, `${randomName}${extname(file.originalname)}`)

        return nameFile;
    }
}