import express from "express";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware";
import userRoutes from "./routes/user";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api/v1/user", userRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT ?? 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`server is up on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
