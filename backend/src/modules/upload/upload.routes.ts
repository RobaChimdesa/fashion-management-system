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

/**
 * @swagger
 * /uploads/image:
 *   post:
 *     summary: Upload an image
 *     description: Upload a single image to Cloudinary. Returns the uploaded image URL.
 *     tags:
 *       - Uploads
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: string
 *                   example: https://res.cloudinary.com/demo/image/upload/v123456789/sample.jpg
 *       400:
 *         description: No image uploaded
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/image",

  authenticate,

  upload.single("image"),

  UploadController.uploadImage,
);

export default router;
