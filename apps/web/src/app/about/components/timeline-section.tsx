'use client'

import { Users, Heart, Globe, Sparkles } from 'lucide-react'

const timelineEvents = [
  {
    year: '2019',
    title: 'The Beginning',
    description: 'During the COVID crisis, a handful of friends started pooling ₹1 every day to support people struggling through tough times.',
    icon: Heart,
    color: 'from-red-400 to-red-600',
  },
  {
    year: '2020',
    title: '10 Volunteers',
    description: 'Word spread. Our tiny drops turned into groceries, emergency support, medicines, and countless acts of care.',
    icon: Users,
    color: 'from-drop-400 to-drop-600',
  },
  {
    year: '2021-2023',
    title: '50+ Volunteers',
    description: 'The community grew. People kept showing up with sincerity, month after month. The magic was in the people.',
    icon: Sparkles,
    color: 'from-amber-400 to-amber-600',
  },
  {
    year: '2024',
    title: '100+ & The Platform',
    description: 'Just A Drop evolved. A platform was born to connect volunteers with verified organizations: simple, trustworthy, accessible to all.',
    icon: Globe,
    color: 'from-green-400 to-green-600',
  },
]

export function TimelineSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block px-4 py-2 bg-drop-100 rounded-full text-sm font-bold text-drop-700 mb-4">
            Our Journey
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
            How We Grew Together
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            From a simple idea to a movement that connects thousands
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-drop-200 via-drop-400 to-drop-600 hidden sm:block"></div>

            {/* Timeline items */}
            <div className="space-y-16">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.year}
                  className={`relative flex flex-col ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center gap-8`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:border-drop-300 transition-all duration-300">
                      <div className={`inline-block px-4 py-1 bg-gradient-to-r ${event.color} rounded-full text-white font-bold text-sm mb-4`}>
                        {event.year}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{event.title}</h3>
                      <p className="text-base text-slate-600 leading-relaxed">{event.description}</p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 shrink-0">
                    <div className="absolute inset-0 bg-drop-100 rounded-full blur-xl opacity-50"></div>
                    <div className={`relative w-full h-full bg-gradient-to-br ${event.color} rounded-full flex items-center justify-center shadow-xl`}>
                      <event.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
