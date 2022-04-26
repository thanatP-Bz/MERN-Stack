import User from "../model/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../error/index.js";

const register = async (req, res) => {
  let { name, password, email } = req.body;

  if ((!name || !password, !email)) {
    throw new BadRequestError("please provide all values");
  }

  const user = await User.create({ name, password, email });
  res.status(StatusCodes.OK).json({ user });
};

const login = async (req, res) => {
  res.send("login");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
