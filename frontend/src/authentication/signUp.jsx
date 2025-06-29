import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuth'
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required.");
    if (!formData.email.trim()) return toast.error("Email is required.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return toast.error("Invalid email address.");
    if (!formData.password) return toast.error("Password is required.");
    if (formData.password.length < 8) return toast.error("Password must be at least 6 characters.");
    if (formData.password !== formData.confirmPassword) return toast.error("Passwords do not match.");
    return true;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() == true) {
      const { confirmPassword, ...submitData } = formData;
      signup(submitData);
    }
  };

  return (
    <div className="flex-3/5">
      <div className="bg-gradient-to-b from-[#262e46] to-[#12151f] min-h-screen flex items-center justify-center p-4 bg-[url('./assets/auth-bg.svg')] bg-cover">
        <main className="rounded-3xl w-full max-w-md p-8 text-gray-300">
          <h1 className="text-3xl font-semibold text-white mb-8 text-center">Create Account</h1>
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-400">Full Name</label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                placeholder="Your full name"
                className="w-full rounded-xl bg-[#2a2f42] border border-transparent focus:border-pink-600 focus:ring-1 focus:ring-pink-600 py-3 px-4 text-gray-300 placeholder-gray-500 transition"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-400">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl bg-[#2a2f42] border border-transparent focus:border-pink-600 focus:ring-1 focus:ring-pink-600 py-3 px-4 text-gray-300 placeholder-gray-500 transition"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-400">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl bg-[#2a2f42] border border-transparent focus:border-pink-600 focus:ring-1 focus:ring-pink-600 py-3 px-4 text-gray-300 placeholder-gray-500 transition"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-400">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl bg-[#2a2f42] border border-transparent focus:border-pink-600 focus:ring-1 focus:ring-pink-600 py-3 px-4 text-gray-300 placeholder-gray-500 transition"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl py-3 text-white font-semibold hover:from-pink-700 hover:to-purple-700 transition"
            >
              {isSigningUp ? <p>Loading...</p> : <p>Sign Up</p>}
            </button>
          </form>
          <p className="mt-6 text-center text-gray-500 text-sm">
            Already have an account?{' '}
            <Link to="/signin" className="text-pink-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </main>
        <div className="glow"></div>
      </div>
    </div>
  );
}