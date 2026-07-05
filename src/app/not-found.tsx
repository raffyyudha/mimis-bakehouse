import Link from "next/link";
 
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf6f0] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">Could not find requested resource</p>
      <Link href="/" className="bg-[#c084a0] text-white px-6 py-2.5 rounded hover:bg-[#a06080] transition font-semibold">
        Return Home
      </Link>
    </div>
  );
}
