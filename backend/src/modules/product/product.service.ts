import { Product } from "./product.model";
import { IProduct } from "./product.types";
// import { FilterQuery } from "mongoose";

export class ProductService {
  static async createProduct(payload: Partial<IProduct>, userId: string) {
    const product = await Product.create({
      ...payload,
      createdBy: userId,
    });

    return product;
  }

  static async getAllProducts(query: {
    search?: string;
    category?: string;
    culturalStyle?: string;
    page?: string;
    limit?: string;
    sort?: "price_asc" | "price_desc" | "newest";
  }) {
    const { search, category, culturalStyle,  page = "1", limit = "10", sort } = query;

    const filter: Record<string, any> = {
      isAvailable: true,
    };


    // Search by product name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by cultural style
    if (culturalStyle) {
      filter.culturalStyle = culturalStyle;
    }
     let productQuery = Product.find(filter);

    if (query.sort === "price_asc") {
      productQuery = productQuery.sort({
        price: 1,
      });
    }

    if (query.sort === "price_desc") {
      productQuery = productQuery.sort({
        price: -1,
      });
    }

    if (query.sort === "newest") {
      productQuery = productQuery.sort({
        createdAt: -1,
      });
    }

    const currentPage = parseInt(page);

    const pageSize = parseInt(limit);

    const skip = (currentPage - 1) * pageSize;

    const products = await Product.find(filter)
      .populate("createdBy", "fullName email")
      .skip(skip)
      .limit(pageSize)
      .sort({
        createdAt: -1,
      });

    const total = await Product.countDocuments(filter);

    return {
      data: products,

      meta: {
        page: currentPage,

        limit: pageSize,

        total,

        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  static async getProductById(id: string) {
    const product = await Product.findOne({
      _id: id,
      isAvailable: true,
    }).populate("createdBy", "fullName email role");

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  static async updateProduct(id: string, payload: Partial<IProduct>) {
    const product = await Product.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  static async deleteProduct(id: string) {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        isAvailable: false,
      },
      {
        returnDocument: "after",
      },
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      message: "Product removed successfully",
    };
  }

  static async getTopRatedProducts() {
  return await Product.find()
    .sort({
      averageRating: -1,
      totalReviews: -1,
    })
    .limit(10);
}
}
