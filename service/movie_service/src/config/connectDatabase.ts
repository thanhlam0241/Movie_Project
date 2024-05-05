import mongoose from "mongoose";

type TInput = {
  db: string | undefined;
};

export default ({ db }: TInput) => {
  const connect = () => {
    if (!db) {
      console.error("Error connecting to database: No URI provided");
      return process.exit(1);
    }
    mongoose
      .connect(db)
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch((error) => {
        console.error("Error connecting to database: ", error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on("disconnected", connect);
};
