import mongoose from 'mongoose';
const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 8,
    },
    profilePic: {
      type: String,
      default: '',
    },
  },

  { timeStamp: true }
);

const userModel = mongoose.model('User', UserSchema);
export default userModel;
