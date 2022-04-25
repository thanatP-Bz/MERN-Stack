import User from "../model/User.js";

const register = async (req, res) => {
  let { name, password, email } = req.body;

  if ((!name || !password, !email)) {
    throw new Error("please provide all values");
  }

  const user = await User.create({ name, password, email });
  res.status(201).json({ user });
};

const login = async (req, res) => {
  res.send("login");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
