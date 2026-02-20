import Link from "next/link";

export default function Home() {
  return (
    <div className="p-20 space-y-4 text-center">
      <h1 className="text-4xl font-bold">Email Cadence Dashboard</h1>

      <div className="space-x-10">
        <Link href="/cadence" className="text-xl text-red-500">
          Cadence Editor
        </Link>
        <Link href="/enrollments" className="text-xl text-red-500">
          Enrollments
        </Link>
      </div>
    </div>
  );
}
