import { Types } from "mongoose";

import { Customer } from "../customer/customer.model";
import { Measurement } from "./measurement.model";
import { IMeasurement } from "./measurement.types";

export class MeasurementService {
  static async addMeasurement(
    accountId: string,
    payload: Partial<IMeasurement>,
  ) {
    const customer = await Customer.findOne({
      accountId,
    });

    if (!customer) {
      throw new Error("Customer profile not found");
    }

    // Make previous measurements non-current
    await Measurement.updateMany(
      {
        customerId: customer._id,
        isCurrent: true,
      },
      {
        isCurrent: false,
      },
    );

    const measurement = await Measurement.create({
      ...payload,
      customerId: customer._id,
      isCurrent: true,
    });

    return measurement;
  }

  static async getCurrentMeasurement(accountId: string) {
    const customer = await Customer.findOne({
      accountId,
    });

    if (!customer) {
      throw new Error("Customer profile not found");
    }

    const measurement = await Measurement.findOne({
      customerId: customer._id,
      isCurrent: true,
    });

    return measurement;
  }

  static async getMeasurementHistory(accountId: string) {
    const customer = await Customer.findOne({
      accountId,
    });

    if (!customer) {
      throw new Error("Customer profile not found");
    }

    return Measurement.find({
      customerId: customer._id,
    }).sort({
      createdAt: -1,
    });
  }

  static async updateMeasurement(
    measurementId: string,
    accountId: string,
    payload: Partial<IMeasurement>,
  ) {
    const customer = await Customer.findOne({
      accountId,
    });

    if (!customer) {
      throw new Error("Customer profile not found");
    }

    const measurement = await Measurement.findOneAndUpdate(
      {
        _id: measurementId,
        customerId: customer._id,
      },
      payload,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!measurement) {
      throw new Error("Measurement not found");
    }

    return measurement;
  }

  static async deleteMeasurement(measurementId: string, accountId: string) {
    const customer = await Customer.findOne({
      accountId,
    });

    if (!customer) {
      throw new Error("Customer profile not found");
    }

    const measurement = await Measurement.findOne({
      _id: measurementId,
      customerId: customer._id,
    });

    if (!measurement) {
      throw new Error("Measurement not found");
    }

    // Prevent deleting current measurement if it's the only one
    const totalMeasurements = await Measurement.countDocuments({
      customerId: customer._id,
    });

    if (measurement.isCurrent && totalMeasurements === 1) {
      throw new Error("Cannot delete the only current measurement");
    }

    await Measurement.findByIdAndDelete(measurementId);

    // If deleted measurement was current,
    // make the latest measurement current
    if (measurement.isCurrent) {
      const latestMeasurement = await Measurement.findOne({
        customerId: customer._id,
      }).sort({
        createdAt: -1,
      });

      if (latestMeasurement) {
        latestMeasurement.isCurrent = true;
        await latestMeasurement.save();
      }
    }

    return {
      message: "Measurement deleted successfully",
    };
  }
}
