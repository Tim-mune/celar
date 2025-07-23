import express from "express";
const router = express.Router();

import { prisma } from "../prisma/prisma";
import { CustomError } from "../errors/CustomError";
import { generateToken } from "../utils/jwt";
import { authenticate } from "../middleware/authMiddleware";
import axios from "axios";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  const isValidPwd = await Bun.password.verify(password, user?.password ?? "");
  if (!isValidPwd) {
    throw new CustomError("Invalid Credentials", 401);
  }
  const token = generateToken({ payload: { id: user?.id ?? "" } });

  res.json({
    user,
    token,
    message:
      user?.role === "psp"
        ? "You have 20 merchants connected"
        : "You've made 2 API calls this week",
  });
});

router.get("/users", authenticate, async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

router.post("/signup", async (req, res) => {
  const { email, role, password } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    throw new CustomError("User already Exists, Please Login", 400);
  }
  const hashedPwd = await Bun.password.hash(password, { algorithm: "bcrypt" });
  const user = await prisma.user.create({
    data: { email, role, password: hashedPwd },
  });
  res.json({ user });
});
router.get("/transactions", authenticate, async (req, res) => {
  // @ts-ignore
  const userId = req?.user;
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    include: { user: true, recipient: true },
  });
  res.json({ transactions });
});
router.post("/send", authenticate, async (req, res) => {
  const { amount, recipient, currency } = req.body;
  //   @ts-ignore
  const userId = req?.user;

  const recipientExists = await prisma.user.findUnique({
    where: { id: recipient },
  });

  const userBeforeTX = await prisma.user.findUnique({ where: { id: userId } });
  if (!userBeforeTX) {
    throw new CustomError("Invalid user", 400);
  }
  if (userBeforeTX.balance < 0 && userBeforeTX.balance <= -1000) {
    throw new CustomError("You have reached your loan limit", 400);
  }

  if (userId === recipient) {
    throw new CustomError("You cannot send money yo yourseld", 400);
  }

  if (!recipientExists) {
    throw new CustomError("Recipient not found", 404);
  }

  const transaction = await prisma.transaction.create({
    data: {
      amount,
      currency,
      userId,
      recipientId: recipientExists.id,
    },
  });
  axios
    .post("https://usewebhook.com/507af3dc9cc8604d67193588530997ac", {
      type: "transaction.sent",
      data: {
        transactionId: transaction.id,
        amount: transaction.amount,
        currency: transaction.currency,
        from: userId,
        to: recipient,
      },
    })
    .catch((err) => {
      console.error("Webhook failed:", err.message);
    });
  await prisma.user.update({
    where: {
      id: recipient,
    },
    data: { balance: amount + recipientExists.balance },
  });

  const user = await prisma.user.update({
    where: { id: userId },
    data: { balance: userBeforeTX?.balance - amount },
  });
  res.json({
    message: "Transaction successful",
    transaction,
    balance: user.balance,
    user,
    loanLimit: user.balance < 0 ? user.balance + 1000 : 1000,
  });
});
export default router;
