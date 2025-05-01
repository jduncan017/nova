import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="LoginContainer bg-g4 flex h-full grow flex-col items-center justify-center">
      <div className="LoginCard bg-g5 flex w-full max-w-md flex-col items-center gap-8 rounded-2xl p-8 shadow-lg">
        <div className="LoginHeader flex flex-col items-center gap-2">
          <h1 className="text-p1 text-4xl font-bold">DigitalNova AI</h1>
          <p className="text-g1">Welcome to Nova Assistant</p>
        </div>

        <div className="LoginForm w-full space-y-4">
          <div className="FormInput">
            <label className="text-g2 block text-sm font-medium">Email</label>
            <input
              type="email"
              className="border-g2 bg-n1 text-g4 focus:border-p1 mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="FormInput">
            <label className="text-g1 block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              className="border-g2 bg-n1 text-g4 focus:border-p1 mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <Link href="/chat" className="block">
            <button className="LoginButton bg-p1 hover:bg-p2 w-full rounded-md px-4 py-2 text-white">
              Sign In
            </button>
          </Link>
        </div>

        <div className="LoginFooter text-g2 text-center text-sm">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-p1 hover:text-p2">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
