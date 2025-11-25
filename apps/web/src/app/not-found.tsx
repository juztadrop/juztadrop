import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search, Droplet } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex-1 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated water drops background */}
      <div className="absolute inset-0 bg-gradient-to-br from-drop-50 via-white to-drop-100"></div>

      {/* Floating animated drops */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-drop-200/30 to-drop-300/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-drop-100/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-drop-400/10 to-transparent rounded-full blur-2xl animate-pulse delay-500"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Animated 404 with water drop */}
          <div className="relative inline-block">
            <div className="text-[200px] md:text-[280px] font-black leading-none text-slate-100 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-drop-400 to-drop-600 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-drop-500 to-drop-600 rounded-full p-12 shadow-2xl animate-bounce">
                  <Droplet className="h-24 w-24 text-white fill-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4 pt-8">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              Lost in the <span className="text-drop-500">Flow</span>?
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Looks like this page has evaporated. Don't worry, we'll help you find your way back to making an impact.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-drop-500 to-drop-600 hover:from-drop-600 hover:to-drop-700 text-white text-lg font-bold px-10 py-7 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/">
                <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Back to Home
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-slate-300 text-slate-700 hover:border-drop-500 hover:bg-drop-50 text-lg font-bold px-10 py-7 h-auto bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/opportunities">
                <Search className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                Find Opportunities
              </Link>
            </Button>
          </div>

          {/* Subtle animation hint */}
          <p className="text-sm text-slate-400 pt-12">
            Error 404 • Page not found
          </p>
        </div>
      </div>
    </main>
  )
}
