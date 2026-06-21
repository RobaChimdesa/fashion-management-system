// import cloudinary from "../../config/cloudinary";

// export class UploadService {
//   static async uploadImage(filePath: string) {
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: "fashion-management",
//     });

//     return {
//       url: result.secure_url,
//     };
//   }
// }

import cloudinary from "../../config/cloudinary";
import fs from "fs";

export class UploadService {
  static async uploadImage(filePath: string) {
    const result = await cloudinary.uploader.upload(
      filePath,
      {
        folder: "fashion-management",
      }
    );

    // delete local file
    fs.unlinkSync(filePath);

    return {
      url: result.secure_url,
    };
  }
}