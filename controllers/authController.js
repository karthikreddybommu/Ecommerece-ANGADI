import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { JWT_SECRET } from "../config/config";

export async function signUp(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "all fields are requied" });
    }

    const user = await userModel.create({
      name,
      email,
      password,
      role,
    });

    if (!user) {
      return res
        .status(500)
        .json({ message: "User not created. Something went wrong" });
    }

    res.status(200).json({ message: "signUp successfull", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "something went wrong" });
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await userModel.find({ email });
    if (!user) {
      return res.status(400).json({ message: "No user with the given email" });
    }

    if (user.password != password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        role: user.role,
      },
      JWT_SECRET,
    );

    await res.cookie("token", token);

    return res.status(200).json({ message: "Signin Successfull" });
  } catch (error) {}
}
