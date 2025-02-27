import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthImagePattern } from '../Components/AuthImagePattern';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const { signup, isSigningUp } = useAuthStore();
  const validateForm = (error) => {
    if (!formData.fullName.trim()) {
      toast.error('Fullname is required');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!formData.password.trim()) {
      toast.error('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be greater than 8 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents form from refreshing
    const success = validateForm();
    if (success) {
      try {
        await signup(formData);
        toast.success('Signup successful!');
      } catch (error) {
        toast.error(error.message || 'Signup failed');
      }
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-4">
            <div className="flex flex-col items-center gap-8 group">
              <div className="size-10 rounded-xl flex items-center justify-center bg-primary/10  group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-10 text-primary" />
              </div>
              <h1 className="text-lg mt-2 font-bold"> Create Accout</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label p-2">
                <span className="text-base label-text">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>

                <input
                  type="text"
                  placeholder="John Doe"
                  className={`input input-bordered w-full pl-10 `}
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
              <label className="label p-2">
                <span className="text-base label-text">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`input input-bordered w-full pl-10 `}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>

                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="**********"
                  className={`input input-bordered w-full pl-10 `}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Loading...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/40">already have an Account</p>
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Join our Community"
        subtitle="Connect with friends, share a moment stay in touch with you"
      />
    </div>
  );
};

export default SignUp;
