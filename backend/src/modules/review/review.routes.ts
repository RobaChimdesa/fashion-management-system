import { Router } from "express";

import { ReviewController } from "./review.controller";

import { authenticate } from "../../middlewares/auth.middleware";
// import { ProductController } from "../product/product.controller";

const router = Router();

router.post("/", authenticate, ReviewController.createReview);

router.get("/product/:productId", ReviewController.getProductReviews);
router.patch("/:id", authenticate, ReviewController.updateReview);
router.delete("/:id", authenticate, ReviewController.deleteReview);
// router.get("/top-rated", ProductController.getTopRatedProducts);

export default router;
