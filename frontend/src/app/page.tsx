import Link from "next/link"
import { WavyWater } from "@/components/wavy-water"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-blue-500 -z-10" />

      {/* Navigation bar */}
      <header className="w-full p-4">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-full p-1">
              <div className="text-red-500 text-2xl font-bold">+</div>
            </div>
            <h1 className="text-xl font-serif italic font-bold">Lifeguard Vision</h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="#how-it-works" className="text-gray-800 hover:text-gray-600 font-medium">
              How It Works
            </Link>
            <Link href="#about-us" className="text-gray-800 hover:text-gray-600 font-medium">
              About Us
            </Link>
          </div>

          <Link
            href="#try-now"
            className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-md font-medium transition-colors"
          >
            Try it now →
          </Link>
        </nav>
      </header>

      {/* Wavy water line with floating element */}
      <div className="relative w-full mt-12">
        <WavyWater />
      </div>

      {/* Content area */}
      <div className="container mx-auto flex-1 px-4 py-12">{/* Add your content here */}</div>
    </main>
  )
}
