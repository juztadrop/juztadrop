'use client'

import { Heart, Users, Shield, Globe, Zap, Eye } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Every Act Counts',
    description: 'No contribution is too small. From ₹1 to one hour : every drop creates ripples.',
    color: 'from-red-400 to-red-600',
  },
  {
    icon: Users,
    title: 'Every Person Matters',
    description: 'Whether volunteer or beneficiary, every individual is valued and respected.',
    color: 'from-drop-400 to-drop-600',
  },
  {
    icon: Shield,
    title: 'Transparency First',
    description: 'All organizations are verified. All contributions are tracked. Trust is earned.',
    color: 'from-green-400 to-green-600',
  },
  {
    icon: Globe,
    title: 'Accessible to All',
    description: 'No city restrictions. No complicated paperwork. Service made simple.',
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: Zap,
    title: 'Human-Centered',
    description: 'Technology serves people, not the other way around. Simplicity over complexity.',
    color: 'from-amber-400 to-amber-600',
  },
  {
    icon: Eye,
    title: 'Community Driven',
    description: 'Built by volunteers, for volunteers. Your feedback shapes our evolution.',
    color: 'from-pink-400 to-pink-600',
  },
]

export function ValuesSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block px-4 py-2 bg-drop-100 rounded-full text-sm font-bold text-drop-700 mb-4">
            Our Values
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
            What We Stand For
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            These principles guide everything we do from how we build the platform to how we serve our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group relative bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Gradient border on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
              <div className="absolute inset-0.5 bg-white rounded-2xl -z-10"></div>

              <div className="space-y-4">
                <div className={`h-14 w-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900">{value.title}</h3>
                
                <p className="text-base text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="max-w-3xl mx-auto text-center mt-16 space-y-6">
          <div className="text-2xl md:text-3xl font-bold text-slate-900 leading-relaxed">
            We believe every act counts. Every person matters.
          </div>
          <div className="text-xl text-slate-600">
            And together, even the smallest drop can create a ripple worth remembering.
          </div>
        </div>
      </div>
    </section>
  )
}
