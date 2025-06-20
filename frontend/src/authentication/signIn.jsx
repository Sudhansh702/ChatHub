import { Link } from 'react-router-dom';


export default function Login() {
  return (
    <div className="bg-gradient-to-b from-[#262e46] to-[#12151f] min-h-screen flex items-center justify-center p-4">
      <main className="rounded-3xl w-full max-w-md p-8 text-gray-300 ">
        <h1 className="text-3xl font-semibold text-white mb-8 text-center">Welcome Back</h1>
        <form className="space-y-6" action="#" method="POST" novalidate>
          <div>
            <label for="email" className="block mb-2 text-sm font-medium text-gray-400">Email address</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" className="w-full rounded-xl bg-[#2a2f42] border border-transparent focus:border-pink-600 focus:ring-1 focus:ring-pink-600 py-3 px-4 text-gray-300 placeholder-gray-500 transition" />
          </div>
          <div>
            <label for="password" className="block mb-2 text-sm font-medium text-gray-400">Password</label>
            <input id="password" name="password" type="password" required placeholder="••••••••" className="w-full rounded-xl bg-[#2a2f42] border border-transparent focus:border-pink-600 focus:ring-1 focus:ring-pink-600 py-3 px-4 text-gray-300 placeholder-gray-500 transition" />
          </div>
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center text-sm text-gray-400">
              <input type="checkbox" className="form-checkbox text-pink-600 rounded focus:ring-pink-600" />
              <span className="ml-2">Remember me</span>
            </label>
            <Link to="#" className="text-pink-600 text-sm font-semibold hover:underline">Forgot password?</Link>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl py-3 text-white font-semibold hover:from-pink-700 hover:to-purple-700 transition">
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500 text-sm">
          Don't have an account?
          <Link to="/signup" className="text-pink-600 font-semibold hover:underline">Sign up</Link>
        </p>
      </main>

      <div className='glow'></div>
    </div>
  );
}