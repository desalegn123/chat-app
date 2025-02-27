import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User } from 'lucide-react';

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const handleImageUpload = (e) => {
    const file =e.target.files[0]
    if(!file) return
    const reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onload=async()=>{
      const base64Image=reader.result
      setSelectedImg(base64Image)
      await updateProfile({ProfilePic:base64Image})
    }
  };
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">your profile information</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={selectedImg || authUser.ProfilePic || '/avatar.webp'}
                alt="profile"
                className="size-32 border-4 rounded-full object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-4 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? 'animate-pulse cursor-events-none' : ''
                }`}
              >
                <Camera className="h-4 w-4 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? 'Uploading...'
                : 'click Camera icon to update photo'}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-5 h-5" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg">
                {authUser?.fullName}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg">
                {authUser?.email}
              </p>
            </div>
          </div>
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h1 className="text-lg font-medium mb-4">Account Information</h1>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member since</span>
                <span>{authUser.createdAt?.spilt("T")[0]}</span>
              </div>
              <div className='flex items-center justify-between py-2'>
                <span>Account status</span>
                <span className='text-green-500'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
