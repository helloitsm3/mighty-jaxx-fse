const User = require("../models/user.model");

async function create(user) {
  const { email, password } = { ...user };
  const newUser = new User({ email, password });
  await newUser.save();

  return { message: "Successfully created user" };
}

async function login(user) {
  const { email, password } = { ...user };

  try {
    const isUser = await User.findOne({ email });

    if (isUser) {
      const isPassValid = await isUser.verify(password);

      if (isPassValid) {
        return { status: 200, message: "Successfully logged in" };
      } else {
        return { status: 404, message: "Incorrect user credentials" };
      }
    }

    return { status: 404, message: "User currently does not exist" };
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  create,
  login,
};
