import express from 'express';
import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utilis.js';
import cloudinary from '../lib/cloudinary.js';
export const signup = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: 'all fields are mmust be required' });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'password must be greater than 8 character' });
    }
    const user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already exist' });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      fullName,
      email,
      password: hashPassword,
      profilePic,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: 'invalid data from user' });
    }
  } catch (err) {
    console.log('error in signup controller', err.message);
    res.status(500).json({ message: 'internal server error' });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    generateToken(user._id, res);

    res.status(200).json({
      id: user._id, // ✅ Fixed (was "newUser._id")
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log('Error in login controller:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    console.log('Error in logout controller:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: 'profile pic reqiured' });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log('error to update profile pic', err);
    res.status(500).json('internal server error');
  }
};
export const checkAuth=(req, res)=>{
  try{
    res.status(200).json(req.user)
  }
  catch(err){
    console.log("error in authcheck controller", err.message)
    res.status(500).json({message:"internal server error"})
  }

}

