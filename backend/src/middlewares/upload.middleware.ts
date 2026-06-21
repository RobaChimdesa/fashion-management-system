// import multer from "multer";

// import { CloudinaryStorage } from "multer-storage-cloudinary";

// import cloudinary from "../config/cloudinary";

// const storage = new CloudinaryStorage({
//   cloudinary,

//   params: async (req, file) => ({
//     folder: "fashion-management",

//     allowed_formats: ["jpg", "jpeg", "png", "webp"],

//     public_id: Date.now() + "-" + file.originalname,
//   }),
// });

// export const upload = multer({
//   storage,
// });
import multer from "multer";

const storage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(null, "uploads/");
    },

    filename: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        Date.now() +
          "-" +
          file.originalname
      );
    },
  });

export const upload =
  multer({
    storage,
  });