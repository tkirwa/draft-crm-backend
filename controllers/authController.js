const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    // Find user by phone (username)
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(401).json({ error: 'Invalid phone number or password' });
    }

    // Check if the provided password matches the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid phone number or password' });
    }

    // Generate JWT token based on user role
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      jwtSecret,
      { expiresIn: '1h' } // Token expiration time
    );

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
