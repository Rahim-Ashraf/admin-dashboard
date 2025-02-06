import Link from "next/link";

export default function Home() {

  return (
    <div className="max-w-screen-sm mx-auto">
      <h1 className="text-2xl p-2">Welcome to Admin-dashbord</h1>
      <Link href="/login" className="text-blue-500">Login</Link>
    </div>
  );
}
