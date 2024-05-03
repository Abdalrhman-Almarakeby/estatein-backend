import mongoose from "mongoose";
import { app } from "./app";

const dbURI = process.env.DB_URI as string;
const port = process.env.PORT || 1111;

(async () => {
  try {
    await mongoose.connect(dbURI);

    const server = app.listen(port, () => {
      console.log(`The app is listing on port ${port}`);
    });

    server.on("error", (err) => {
      console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
})();
