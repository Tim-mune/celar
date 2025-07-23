import jwt from "jsonwebtoken";
export const generateToken = ({
  payload,
}: {
  payload: { id: string };
  expiresIn?: string;
}) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  return token;
};
