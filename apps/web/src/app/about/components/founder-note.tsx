'use client'

import { Code, Heart, Users } from 'lucide-react'

export function FounderNote() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-drop-100 rounded-full text-sm font-bold text-drop-700 mb-6">
              Founder's Note
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
              Why I Built This
            </h2>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl">
            {/* Founder info */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-drop-400 to-drop-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Shravan</h3>
                <p className="text-slate-600">Volunteer Zero</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 text-base md:text-lg text-slate-700 leading-relaxed">
              <p>
                Watching our small community of volunteers grow from 10 to 100+ members was incredible. But I kept seeing the same pattern: <span className="font-semibold text-slate-900">people genuinely wanted to help, but didn't know where to start</span>.
              </p>

              <p>
                There was confusion. Paperwork. Geographic limitations. The process of volunteering felt complicated when it should have been simple.
              </p>

              <p className="text-xl font-semibold text-drop-600 py-4">
                That's why I built Just A Drop, the platform.
              </p>

              <p>
                A place where anyone can contribute their time, skills, or energy to meaningful opportunities, <span className="font-semibold text-slate-900">without confusion, without paperwork, and without needing to live in a particular city</span>.
              </p>

              <p>
                Whether it's teaching, planting trees, helping the elderly, supporting NGOs, or lending a hand during emergencies; the platform connects volunteers with verified organizations in seconds.
              </p>
            </div>

            {/* Mission cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200">
              <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                <Users className="h-8 w-8 text-drop-500 mx-auto mb-2" />
                <div className="font-semibold text-slate-900 text-sm">Accessible</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                <Heart className="h-8 w-8 text-drop-500 mx-auto mb-2" />
                <div className="font-semibold text-slate-900 text-sm">Human-Centered</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                <Code className="h-8 w-8 text-drop-500 mx-auto mb-2" />
                <div className="font-semibold text-slate-900 text-sm">Simple</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
