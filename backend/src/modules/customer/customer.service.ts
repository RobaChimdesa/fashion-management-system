import { Customer } from "./customer.model";

export class CustomerService {
  static async getMyProfile(accountId: string) {
    const customer = await Customer.findOne({
      accountId,
    }).populate("accountId", "-password");

    if (!customer) {
      throw new Error("Customer profile not found");
    }

    return customer;
  }

  static async updateMyProfile(accountId: string, payload: any) {
    const customer = await Customer.findOneAndUpdate({ accountId }, payload, {
      // new: true,
      // runValidators: true,
      returnDocument: "after",
      runValidators: true,
    }).populate("accountId", "-password");

    if (!customer) {
      throw new Error("Customer profile not found");
    }

    return customer;
  }
}
