const user = require("../services/user.service");

async function create(req, res, next) {
  try {
    res.json(await user.create(req.body));
  } catch (err) {
    console.error(`Error creating user account`, err.message);
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { status, message, token } = await user.login(req.body);

    res.status(status).json({ message, token });
  } catch (err) {
    console.error(`Error fetching user account`, err.message);
    next(err);
  }
}

module.exports = {
  create,
  login,
};
