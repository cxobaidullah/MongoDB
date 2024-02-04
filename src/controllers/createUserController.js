const CreateUser = require("../models/createUser");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = crypto.randomBytes(32).toString("hex");
console.log(jwtSecret);
// Create a new product
exports.createUser = async (req, res) => {
    try {
      // Check for existing user with the same email or mobile number
      const existingUserWithEmail = await CreateUser.findOne({ email: req.body.email });
      const existingUserWithMobile = await CreateUser.findOne({ mobile: req.body.mobile });
  
      if (existingUserWithEmail || existingUserWithMobile) {
        let errorMessage = 'User already exists';
        if (existingUserWithEmail && existingUserWithMobile) {
          errorMessage += ' with both email and mobile number';
        } else if (existingUserWithEmail) {
          errorMessage += ' with this email';
        } else {
          errorMessage += ' with this mobile number';
        }
        return res.status(400).json({ message: errorMessage });
      }
  
      const user = await CreateUser.create(req.body);//here we need to save user token aswell
      const userWithoutPassword = { ...user.toJSON(), password: undefined };
      const token = jwt.sign({ user: userWithoutPassword }, jwtSecret, { expiresIn: '1h' });

      // Send response with user data and token
      res.status(200).json({
        ...userWithoutPassword,
        token
      });
    //   res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Error:", error);
      if (error.code === 11000) { // Duplicate key error (specific to MongoDB)
        let errorMessage = 'User already exists';
        if (error.keyPattern.email) {
          errorMessage += ' with email';
        } else if (error.keyPattern.mobile) {
          errorMessage += ' with mobile number';
        } else {
          errorMessage += ' (unknown reason)';
        }
        return res.status(400).json({ message: errorMessage });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  };

// Get all products
exports.getUser = async (req, res) => {
  try {
    const user = await CreateUser.find({});
    res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await CreateUser.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update product by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await CreateUser.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateUser) {
      return res
        .status(404)
        .json({ message: `Cannot find data against this id ${id}` });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete product by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('req.params', req.params)
    const user = await CreateUser.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "Cannot find user with ID" });
    }
    res.status(200).json({ message: "User is deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(email);
    const user = await CreateUser.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
