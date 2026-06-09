import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import { Account } from "./modules/auth/account.model";

const startServer = async () => {
  try {
    await connectDB();
    const count = await Account.countDocuments();

console.log(`Users in DB: ${count}`);

    app.listen(env.PORT, () => {
      console.log(
        `🚀 Server running on port ${env.PORT}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();