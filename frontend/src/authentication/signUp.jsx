import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div class="bg-gradient-to-b from-[#262e46] to-[#12151f] min-h-screen flex items-center justify-center p-4">
      <main class=" rounded-3xl w-full max-w-md p-8 text-gray-300">
        <h1 class="text-3xl font-semibold text-white mb-8 text-center">Create Account</h1>
        <form class="space-y-6" action="#" method="POST" novalidate>
          <div>
            <label for="fullname" class="block mb-2 text-sm font-medium text-gray-400">Full Name</label>
            <input id="fullname" name="fullname" type="text" required placeholder="Your full name" class="w-full rounded-xl bg-[#2a2f42] border border-transparent focus:border-pink-600 focus:ring-1 focus:ring-pink-600 py-3 px-4 text-gray-300 placeholder-gray-500 transition" />
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-400">Email address</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" class="w-full rounded-xl bg-[#2a2f42] border border-transparent focus:border-pink-600 focus:ring-1 focus:ring-pink-600 py-3 px-4 text-gray-300 placeholder-gray-500 transition" />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-400">Password</label>
            <input id="password" name="password" type="password" required placeholder="••••••••" class="w-full rounded-xl bg-[#2a2f42] border border-transparent focus:border-pink-600 focus:ring-1 focus:ring-pink-600 py-3 px-4 text-gray-300 placeholder-gray-500 transition" />
          </div>
          <div>
            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-400">Confirm Password</label>
            <input id="confirm-password" name="confirm-password" type="password" required placeholder="••••••••" class="w-full rounded-xl bg-[#2a2f42] border border-transparent focus:border-pink-600 focus:ring-1 focus:ring-pink-600 py-3 px-4 text-gray-300 placeholder-gray-500 transition" />
          </div>
          <button type="submit" class="w-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl py-3 text-white font-semibold hover:from-pink-700 hover:to-purple-700 transition">
            Sign Up
          </button>
        </form>
        <p class="mt-6 text-center text-gray-500 text-sm">
          Already have an account?
          <Link to="/signin" class="text-pink-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </main>

      <div className='glow'></div>
    </div>
  );
}