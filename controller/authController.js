import User from "../model/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../error/index.js";

const register = async (req, res) => {
  let { name, password, email } = req.body;

  if ((!name || !password, !email)) {
    throw new BadRequestError("please provide all values");
  }

  //check duplicate email
  const userAlreadyExits = await User.findOne({ email });

  if (userAlreadyExits) {
    throw new BadRequestError("This email is already in use");
  }

  const user = await User.create({ name, password, email });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      userEmail: user.email,
      lastname: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("invalid credentials");
  }
  console.log(user);

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("invalid credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
