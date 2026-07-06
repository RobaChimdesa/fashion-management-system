export interface AdminDashboardStats {
  totalCustomers: number;
  totalStaff: number;

  totalProducts: number;
  activeProducts: number;

  totalOrders: number;

  pendingOrders: number;
  confirmedOrders: number;
  inProgressOrders: number;
  readyOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;

  customOrders: number;
  productOrders: number;

  totalRevenue: number;
  todayRevenue: number;
  thisMonthRevenue: number;
  thisYearRevenue: number;

  averageOrderValue: number;

  productRevenue: number;
  customRevenue: number;

  lowStockProducts: number;
}

export interface StaffDashboardStats {
  pendingOrders: number;
  confirmedOrders: number;
  inProgressOrders: number;
  readyOrders: number;

  customOrders: number;
  productOrders: number;

  todayOrders: number;
}

export interface CustomerDashboardStats {
  totalOrders: number;

  pendingOrders: number;
  inProgressOrders: number;
  deliveredOrders: number;

  customOrders: number;
  productOrders: number;

  totalSpent: number;

  latestMeasurementDate?: Date;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  orderType: string;
  status: string;
  totalPrice?: number;
  createdAt: Date;
}

export interface RecentCustomer {
  id: string;
  fullName: string;
  email: string;
  createdAt: Date;
}

export interface CategoryStat {
  category: string;
  orders: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}
