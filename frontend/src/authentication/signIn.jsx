import image from '../assets/bg-gradient.svg';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuth'
import { useState } from 'react';
import { toast } from 'react-hot-toast';


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { signin, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return toast.error("Invalid email address.");
    if (!formData.password) return toast.error("Password is required.");
    return true;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (validateForm() == true) signin(formData);
  };

  return (
    <div className="flex-3/5">
      {/* <img src={image} alt="" /> */}
      <div className="min-h-screen flex items-center justify-center p-4 bg-[url('./assets/auth-bg.svg')] bg-cover">
        <main className="rounded-3xl w-full max-w-md p-8 text-gray-300">
        <h1 className="text-3xl font-semibold text-white mb-8 text-center">Welcome Back</h1>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-400">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              alue={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#2a2f42] border border-transparent focus:border-pink-600 focus:ring-1 focus:ring-pink-600 py-3 px-4 text-gray-300 placeholder-gray-500 transition" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-400">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#2a2f42] border border-transparent focus:border-pink-600 focus:ring-1 focus:ring-pink-600 py-3 px-4 text-gray-300 placeholder-gray-500 transition" />
          </div>
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center text-sm text-gray-400">
              <input type="checkbox" className="form-checkbox text-pink-600 rounded focus:ring-pink-600" />
              <span className="ml-2">Remember me</span>
            </label>
            {/* <Link to="#" className="text-pink-600 text-sm font-semibold hover:underline">Forgot password?</Link> */}
          </div>
          <button
            type="submit"
            onClick={handleSignIn}
            disabled={isSigningUp}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-700 rounded-xl py-3 text-white font-semibold hover:from-pink-700 hover:to-purple-800 transition cursor-pointer">
            {
              isSigningUp ?"Loading...": "Sign In"
            }
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500 text-sm">
          Don't have an account?
          <Link to="/signup" className="text-pink-600 font-semibold hover:underline">Sign up</Link>
        </p>
      </main>

      <div className='glow'></div>
    </div>
    </div>
  );
}