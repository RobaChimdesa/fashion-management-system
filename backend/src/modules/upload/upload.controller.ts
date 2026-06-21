import { Request, Response }
  from "express";

import { UploadService }
  from "./upload.service";

export class UploadController {
  static async uploadImage(
    req: Request,
    res: Response
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "No file uploaded",
        });
      }

      const result =
        await UploadService.uploadImage(
          req.file.path
        );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
}