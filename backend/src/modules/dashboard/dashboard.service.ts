import { Account } from "../auth/account.model";
import { Customer } from "../customer/customer.model";
import { Product } from "../product/product.model";
import { Order } from "../order/order.model";


import {
  OrderStatus,
  OrderType,
} from "../order/order.types";

import { Role } from "../auth/auth.constants";

export class DashboardService {
  static async getAdminStats() {
    const [
      totalCustomers,
      totalStaff,
      totalProducts,
      totalOrders,

      pendingOrders,
      confirmedOrders,
      inProgressOrders,
      readyOrders,
      deliveredOrders,
      cancelledOrders,

      customOrders,
      productOrders,
    ] = await Promise.all([
      Customer.countDocuments(),

      Account.countDocuments({
        role: Role.STAFF,
      }),

      Product.countDocuments(),

      Order.countDocuments(),

      Order.countDocuments({
        status: OrderStatus.PENDING,
      }),

      Order.countDocuments({
        status: OrderStatus.CONFIRMED,
      }),

      Order.countDocuments({
        status: OrderStatus.IN_PROGRESS,
      }),

      Order.countDocuments({
        status: OrderStatus.READY,
      }),

      Order.countDocuments({
        status: OrderStatus.DELIVERED,
      }),

      Order.countDocuments({
        status: OrderStatus.CANCELLED,
      }),

      Order.countDocuments({
        orderType: OrderType.CUSTOM,
      }),

      Order.countDocuments({
        orderType: OrderType.PRODUCT,
      }),
    ]);

    const revenueResult =
      await Order.aggregate([
        {
          $match: {
            status:
              OrderStatus.DELIVERED,
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$totalPrice",
            },
          },
        },
      ]);

    const totalRevenue =
      revenueResult[0]
        ?.totalRevenue || 0;

    const averageOrderValue =
      deliveredOrders > 0
        ? totalRevenue /
          deliveredOrders
        : 0;

    const now = new Date();

    const startOfToday =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

    const startOfMonth =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );

    const startOfYear =
      new Date(
        now.getFullYear(),
        0,
        1
      );

    const [
      todayRevenueResult,
      monthRevenueResult,
      yearRevenueResult,
    ] = await Promise.all([
      Order.aggregate([
        {
          $match: {
            status:
              OrderStatus.DELIVERED,
            createdAt: {
              $gte:
                startOfToday,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum:
                "$totalPrice",
            },
          },
        },
      ]),

      Order.aggregate([
        {
          $match: {
            status:
              OrderStatus.DELIVERED,
            createdAt: {
              $gte:
                startOfMonth,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum:
                "$totalPrice",
            },
          },
        },
      ]),

      Order.aggregate([
        {
          $match: {
            status:
              OrderStatus.DELIVERED,
            createdAt: {
              $gte:
                startOfYear,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum:
                "$totalPrice",
            },
          },
        },
      ]),
    ]);

    const todayRevenue =
      todayRevenueResult[0]
        ?.total || 0;

    const thisMonthRevenue =
      monthRevenueResult[0]
        ?.total || 0;

    const thisYearRevenue =
      yearRevenueResult[0]
        ?.total || 0;

    return {
      totalCustomers,
      totalStaff,
      totalProducts,

      totalOrders,

      pendingOrders,
      confirmedOrders,
      inProgressOrders,
      readyOrders,
      deliveredOrders,
      cancelledOrders,

      customOrders,
      productOrders,

      totalRevenue,
      todayRevenue,
      thisMonthRevenue,
      thisYearRevenue,

      averageOrderValue,

      productRevenue: 0,
      customRevenue: 0,
    };
  }

  static async getStaffStats() {
    const [
      pendingOrders,
      confirmedOrders,
      inProgressOrders,
      readyOrders,

      customOrders,
      productOrders,
    ] = await Promise.all([
      Order.countDocuments({
        status: OrderStatus.PENDING,
      }),

      Order.countDocuments({
        status: OrderStatus.CONFIRMED,
      }),

      Order.countDocuments({
        status: OrderStatus.IN_PROGRESS,
      }),

      Order.countDocuments({
        status: OrderStatus.READY,
      }),

      Order.countDocuments({
        orderType: OrderType.CUSTOM,
      }),

      Order.countDocuments({
        orderType: OrderType.PRODUCT,
      }),
    ]);

    const todayOrders =
      await Order.countDocuments({
        createdAt: {
          $gte: new Date(
            new Date().setHours(
              0,
              0,
              0,
              0
            )
          ),
        },
      });

    return {
      pendingOrders,
      confirmedOrders,
      inProgressOrders,
      readyOrders,

      customOrders,
      productOrders,

      todayOrders,
    };
  }

  static async getCustomerStats(
    customerId: string
  ) {
    const [
      totalOrders,
      pendingOrders,
      inProgressOrders,
      deliveredOrders,

      customOrders,
      productOrders,
    ] = await Promise.all([
      Order.countDocuments({
        customerId,
      }),

      Order.countDocuments({
        customerId,
        status:
          OrderStatus.PENDING,
      }),

      Order.countDocuments({
        customerId,
        status:
          OrderStatus.IN_PROGRESS,
      }),

      Order.countDocuments({
        customerId,
        status:
          OrderStatus.DELIVERED,
      }),

      Order.countDocuments({
        customerId,
        orderType:
          OrderType.CUSTOM,
      }),

      Order.countDocuments({
        customerId,
        orderType:
          OrderType.PRODUCT,
      }),
    ]);

    const spending =
      await Order.aggregate([
        {
          $match: {
            customerId,
            status:
              OrderStatus.DELIVERED,
          },
        },
        {
          $group: {
            _id: null,
            totalSpent: {
              $sum:
                "$totalPrice",
            },
          },
        },
      ]);

    return {
      totalOrders,
      pendingOrders,
      inProgressOrders,
      deliveredOrders,

      customOrders,
      productOrders,

      totalSpent:
        spending[0]
          ?.totalSpent || 0,
    };
  }

  static async getRecentOrders(limit = 10) {
  const orders = await Order.find()
    .populate({
      path: "customerId",
      populate: {
        path: "accountId",
        select: "fullName email",
      },
    })
    .sort({
      createdAt: -1,
    })
    .limit(limit);

  return orders.map((order: any) => ({
    id: order._id,
    customerName:
      order.customerId?.accountId?.fullName ||
      "Unknown",

    orderType: order.orderType,

    status: order.status,

    totalPrice: order.totalPrice,

    createdAt: order.createdAt,
  }));
}

static async getRecentCustomers(
  limit = 10
) {
  const customers =
    await Customer.find()
      .populate(
        "accountId",
        "fullName email"
      )
      .sort({
        createdAt: -1,
      })
      .limit(limit);

  return customers.map(
    (customer: any) => ({
      id: customer._id,

      fullName:
        customer.accountId
          ?.fullName,

      email:
        customer.accountId
          ?.email,

      createdAt:
        customer.createdAt,
    })
  );
}

static async getTopCategories() {
  const result =
    await Order.aggregate([
      {
        $match: {
          productId: {
            $exists: true,
          },
        },
      },

      {
        $lookup: {
          from: "products",
          localField:
            "productId",
          foreignField:
            "_id",
          as: "product",
        },
      },

      {
        $unwind:
          "$product",
      },

      {
        $group: {
          _id:
            "$product.category",

          orders: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          orders: -1,
        },
      },

      {
        $limit: 5,
      },
    ]);

  return result.map(
    (item) => ({
      category: item._id,
      orders:
        item.orders,
    })
  );
}

static async getMonthlyRevenue() {
  const result =
    await Order.aggregate([
      {
        $match: {
          status:
            OrderStatus.DELIVERED,
        },
      },

      {
        $group: {
          _id: {
            year: {
              $year:
                "$createdAt",
            },

            month: {
              $month:
                "$createdAt",
            },
          },

          revenue: {
            $sum:
              "$totalPrice",
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

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return result.map(
    (item) => ({
      month:
        months[
          item._id.month -
            1
        ],

      revenue:
        item.revenue,
    })
  );
}

static async getAdminOverview() {
  const [
    stats,
    recentOrders,
    recentCustomers,
    topCategories,
    monthlyRevenue,
  ] = await Promise.all([
    this.getAdminStats(),

    this.getRecentOrders(),

    this.getRecentCustomers(),

    this.getTopCategories(),

    this.getMonthlyRevenue(),
  ]);

  return {
    stats,
    recentOrders,
    recentCustomers,
    topCategories,
    monthlyRevenue,
  };
}

}