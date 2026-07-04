import { Order } from "./order.model";
import { OrderStatus, OrderType } from "./order.types";
import { Account } from "../auth/account.model";
import { Role } from "../auth/auth.constants";
import { Customer } from "../customer/customer.model";

import { NotificationService } from "../notification/notification.service";

import { NotificationType } from "../notification/notification.types";
export class OrderService {
  static async createOrder(payload: any) {
    const order = await Order.create(payload);
    const staffs = await Account.find({
      role: {
        $in: [Role.ADMIN, Role.STAFF],
      },
    });

    for (const staff of staffs) {
      await NotificationService.createNotification(
        staff._id.toString(),

        "New Order",

        "A new order has been placed by a customer.",

        NotificationType.ORDER_CREATED,

        order._id.toString(),
      );
    }

    return order;
  }

  static async getMyOrders(
    customerId: string,
    query: {
      page?: string;
      limit?: string;
    },
  ) {
    const page = Number(query.page || 1);

    const limit = Number(query.limit || 10);

    const skip = (page - 1) * limit;

    const orders = await Order.find({
      customerId,
    })
      .populate("productId", "name images")
      .populate("measurementId")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments({
      customerId,
    });

    return {
      data: orders,

      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getOrderById(orderId: string) {
    const order = await Order.findById(orderId)
      .populate("productId")
      .populate("measurementId")
      .populate("customerId");

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  static async cancelOrder(orderId: string) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== "PENDING") {
      throw new Error("Only pending orders can be cancelled");
    }

    order.status = "CANCELLED" as any;

    await order.save();

    return order;
  }

  static async updateOrderStatus(orderId: string, status: string) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.status = status as any;

    await order.save();
    const customer =
  await Customer.findById(
    order.customerId
  );

if (customer) {
  const customerAccountId =
    customer.accountId.toString();

  await NotificationService.createNotification(
    customerAccountId,

    "Order Updated",

    `Your order status has been changed to ${order.status}`,

    NotificationType.ORDER_CONFIRMED,

    order._id.toString()
  );
}

    return order;
  }

  static async getCustomerStats(customerId: string) {
    const totalOrders = await Order.countDocuments({
      customerId,
    });

    const pendingOrders = await Order.countDocuments({
      customerId,
      status: OrderStatus.PENDING,
    });

    const completedOrders = await Order.countDocuments({
      customerId,
      status: OrderStatus.DELIVERED,
    });

    const cancelledOrders = await Order.countDocuments({
      customerId,
      status: OrderStatus.CANCELLED,
    });

    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
    };
  }
  static async getAllOrders() {
  return await Order.find()
    .populate({
      path: "customerId",
      populate: {
        path: "accountId",
        select: "fullName email",
      },
    })
    .populate("productId", "name")
    .populate("measurementId")
    .sort({
      createdAt: -1,
    });
}
}

// static async getAdminStats() {
//   const totalOrders =
//     await Order.countDocuments();

//   const pendingOrders =
//     await Order.countDocuments({
//       status: OrderStatus.PENDING,
//     });

//   const inProgressOrders =
//     await Order.countDocuments({
//       status: OrderStatus.IN_PROGRESS,
//     });

//   const deliveredOrders =
//     await Order.countDocuments({
//       status: OrderStatus.DELIVERED,
//     });

//   const customOrders =
//     await Order.countDocuments({
//       orderType: OrderType.CUSTOM,
//     });

//   const productOrders =
//     await Order.countDocuments({
//       orderType: OrderType.PRODUCT,
//     });

//   return {
//     totalOrders,
//     pendingOrders,
//     inProgressOrders,
//     deliveredOrders,
//     customOrders,
//     productOrders,
//   };
// }

// static async getStaffStats() {
//   const [
//     pendingOrders,
//     confirmedOrders,
//     inProgressOrders,
//     readyOrders,
//     customOrders,
//     productOrders,
//   ] = await Promise.all([
//     Order.countDocuments({
//       status: OrderStatus.PENDING,
//     }),

//     Order.countDocuments({
//       status: OrderStatus.CONFIRMED,
//     }),

//     Order.countDocuments({
//       status: OrderStatus.IN_PROGRESS,
//     }),

//     Order.countDocuments({
//       status: OrderStatus.READY,
//     }),

//     Order.countDocuments({
//       orderType: OrderType.CUSTOM,
//     }),

//     Order.countDocuments({
//       orderType: OrderType.PRODUCT,
//     }),
//   ]);

//   return {
//     pendingOrders,
//     confirmedOrders,
//     inProgressOrders,
//     readyOrders,
//     customOrders,
//     productOrders,
//   };
// }
// }
