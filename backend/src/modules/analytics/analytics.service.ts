import { Order } from "../order/order.model";
import { OrderStatus } from "../order/order.types";
import { Product } from "../product/product.model";
import { Customer } from "../customer/customer.model";
import { Review } from "../review/review.model";
import { Types } from "mongoose";

export class AnalyticsService {
  static async getRevenueReport() {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$paymentStatus",

          totalRevenue: {
            $sum: {
              $ifNull: ["$totalPrice", 0],
            },
          },
        },
      },
    ]);

    let paidRevenue = 0;
    let unpaidRevenue = 0;
    let partialRevenue = 0;

    result.forEach((item) => {
      if (item._id === "PAID") paidRevenue = item.totalRevenue;

      if (item._id === "UNPAID") unpaidRevenue = item.totalRevenue;

      if (item._id === "PARTIAL") partialRevenue = item.totalRevenue;
    });

    return {
      totalRevenue: paidRevenue + unpaidRevenue + partialRevenue,

      paidRevenue,

      unpaidRevenue,

      partialRevenue,
    };
  }

  static async getMonthlySalesReport() {
    const result = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },

          totalOrders: {
            $sum: 1,
          },

          totalRevenue: {
            $sum: {
              $ifNull: ["$totalPrice", 0],
            },
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    return result.map((item) => ({
      year: item._id.year,
      month: item._id.month,
      totalOrders: item.totalOrders,
      totalRevenue: item.totalRevenue,
    }));
  }

  static async getOrderStatusStatistics() {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const statistics = {
      PENDING: 0,
      CONFIRMED: 0,
      IN_PROGRESS: 0,
      READY: 0,
      DELIVERED: 0,
      CANCELLED: 0,
      TOTAL: 0,
    };

    result.forEach((item) => {
      statistics[item._id as keyof typeof statistics] = item.count;
      statistics.TOTAL += item.count;
    });

    return statistics;
  }
  static async getTopSellingProducts(limit: number = 10) {
    return await Order.aggregate([
      {
        $match: {
          orderType: "PRODUCT",
          productId: { $exists: true },
        },
      },

      {
        $group: {
          _id: "$productId",

          totalOrders: {
            $sum: 1,
          },

          totalRevenue: {
            $sum: {
              $ifNull: ["$totalPrice", 0],
            },
          },
        },
      },

      {
        $sort: {
          totalOrders: -1,
        },
      },

      {
        $limit: limit,
      },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },

      {
        $unwind: "$product",
      },

      {
        $project: {
          _id: 0,

          productId: "$product._id",

          name: "$product.name",

          category: "$product.category",

          culturalStyle: "$product.culturalStyle",

          estimatedPrice: "$product.estimatedPrice",

          averageRating: "$product.averageRating",

          totalReviews: "$product.totalReviews",

          totalOrders: 1,

          totalRevenue: 1,

          image: {
            $arrayElemAt: ["$product.images", 0],
          },
        },
      },
    ]);
  }

  static async getTopCustomers(limit: number = 10) {
    return await Order.aggregate([
      {
        $group: {
          _id: "$customerId",

          totalOrders: {
            $sum: 1,
          },

          totalSpent: {
            $sum: {
              $ifNull: ["$totalPrice", 0],
            },
          },

          lastOrderDate: {
            $max: "$createdAt",
          },
        },
      },

      {
        $sort: {
          totalSpent: -1,
        },
      },

      {
        $limit: limit,
      },

      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "_id",
          as: "customer",
        },
      },

      {
        $unwind: "$customer",
      },

      {
        $lookup: {
          from: "accounts",
          localField: "customer.accountId",
          foreignField: "_id",
          as: "account",
        },
      },

      {
        $unwind: "$account",
      },

      {
        $project: {
          _id: 0,

          customerId: "$customer._id",

          fullName: "$account.fullName",

          email: "$account.email",

          phone: "$account.phone",

          totalOrders: 1,

          totalSpent: 1,

          lastOrderDate: 1,
        },
      },
    ]);
  }

  static async getCustomerGrowth() {
    const result = await Customer.aggregate([
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },

            month: {
              $month: "$createdAt",
            },
          },

          newCustomers: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    return result.map((item) => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,

      newCustomers: item.newCustomers,
    }));
  }

  static async getProductPerformance(productId: string) {
    const product = await Product.findById(productId).populate(
      "createdBy",
      "fullName email",
    );

    if (!product) {
      throw new Error("Product not found");
    }

    const sales = await Order.aggregate([
      {
        $match: {
          productId: product._id,
        },
      },

      {
        $group: {
          _id: "$productId",

          totalOrders: {
            $sum: 1,
          },

          totalRevenue: {
            $sum: {
              $ifNull: ["$totalPrice", 0],
            },
          },

          deliveredOrders: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "DELIVERED"],
                },
                1,
                0,
              ],
            },
          },

          cancelledOrders: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "CANCELLED"],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    const statistics = sales[0] || {
      totalOrders: 0,
      totalRevenue: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
    };

    return {
      product,

      statistics,
    };
  }
  static async getDashboardCharts() {
    const [revenue, monthlySales, orderStatus, customerGrowth, topProducts] =
      await Promise.all([
        this.getRevenueReport(),
        this.getMonthlySalesReport(),
        this.getOrderStatusStatistics(),
        this.getCustomerGrowth(),
        this.getTopSellingProducts(5),
      ]);

    return {
      summary: revenue,

      monthlySales,

      orderStatus,

      customerGrowth,

      topProducts,
    };
  }
}
