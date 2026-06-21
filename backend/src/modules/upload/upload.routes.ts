// import { Router } from "express";

// import { authenticate } from "../../middlewares/auth.middleware";

// import { upload } from "../../middlewares/upload.middleware";

// const router = Router();

// router.post(
//   "/",
//   authenticate,
//   upload.array("images", 5),

//   (req: any, res) => {
//     const files = req.files as Express.Multer.File[];

//     const urls = files.map((file: any) => file.path);

//     res.status(200).json({
//       success: true,

//       data: urls,
//     });
//   },
// );

// export default router;

import { Router } from "express";

import { upload } from "../../middlewares/upload.middleware";

import { UploadController } from "./upload.controller";

import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post(
  "/image",

  authenticate,

  upload.single("image"),

  UploadController.uploadImage,
);

export default router;
