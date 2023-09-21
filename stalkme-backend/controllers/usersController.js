const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// register user
async function registerUser(req, res) {
  try {
    // Check if username or email already exists
    const existingUsername = await User.findOne({
      username: req.body.username,
    });
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already exist' });
    }

    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exist' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // add JWT token to cookie

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find({}, '-password'); // exclude password field

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get user by id
async function getUser(req, res) {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId, '-password'); // exclude password field

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// login user
async function loginUser(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // add JWT token to cookie

    res.status(200).json({user, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// update user
async function updateUser(req, res) {
  try {
    const userId = req.user._id;
    const updates = {
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
    };

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updates.password = hashedPassword;
    }

    await User.findByIdAndUpdate(userId, updates);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// delete user
async function deleteUser(req, res) {
  try {
    const userId = req.user._id;

    // delete user
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// logout user
async function logoutUser(req, res) {
  try {
    res.clearCookie('jwt'); // remove JWT token from cookie

    res.status(200).json({ message: 'User logout successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = {
  registerUser,
  getAllUsers,
  getUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser,
};
