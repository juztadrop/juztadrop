'use client'

import { Heart, Zap, Users, Globe, Shield, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function TwoPillars() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-drop-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
            Two Pillars, One Mission
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Today, Just A Drop stands on two complementary foundations that work together to create lasting impact
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Pillar 1: Community */}
          <Card className="relative border-2 border-slate-200 hover:border-drop-400 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white overflow-hidden group">
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardHeader className="relative z-10 p-8 md:p-10 space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                    Pillar 1
                  </div>
                  <div className="h-16 w-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>
              </div>

              <CardTitle className="text-3xl md:text-4xl font-black text-slate-900">
                The Community
              </CardTitle>
              
              <CardDescription className="text-base md:text-lg text-slate-700 leading-relaxed">
                Our original family of 100+ members who continue the mission that started it all; small, consistent contributions that uplift lives.
              </CardDescription>

              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-slate-600">Monthly pooled contributions from dedicated members</p>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-slate-600">Direct support for emergencies, education, and care</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-slate-600">Consistent presence since 2019</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-black text-red-600">100+</div>
                    <div className="text-sm text-slate-600">Active Members</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-red-600">5+</div>
                    <div className="text-sm text-slate-600">Years Strong</div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Pillar 2: Platform */}
          <Card className="relative border-2 border-slate-200 hover:border-drop-400 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white overflow-hidden group">
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-drop-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardHeader className="relative z-10 p-8 md:p-10 space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="inline-block px-4 py-2 bg-drop-100 text-drop-700 rounded-full text-sm font-bold">
                    Pillar 2
                  </div>
                  <div className="h-16 w-16 bg-gradient-to-br from-drop-400 to-drop-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              <CardTitle className="text-3xl md:text-4xl font-black text-slate-900">
                The Platform
              </CardTitle>
              
              <CardDescription className="text-base md:text-lg text-slate-700 leading-relaxed">
                A volunteering matching platform that opens the door for volunteers everywhere making service accessible, simple, and deeply human.
              </CardDescription>

              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-drop-500 mt-1 flex-shrink-0" />
                  <p className="text-slate-600">Verified NGOs and organizations</p>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-drop-500 mt-1 flex-shrink-0" />
                  <p className="text-slate-600">Instant matching in seconds</p>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-drop-500 mt-1 flex-shrink-0" />
                  <p className="text-slate-600">No city limits, no paperwork barriers</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-black text-drop-600">500+</div>
                    <div className="text-sm text-slate-600">Volunteers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-drop-600">100+</div>
                    <div className="text-sm text-slate-600">Organizations</div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Unified message */}
        <div className="max-w-3xl mx-auto text-center mt-16">
          <div className="bg-gradient-to-r from-drop-500 to-drop-600 rounded-3xl p-8 md:p-12 shadow-2xl">
            <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
              Together, these pillars ensure that every act of kindness whether through contributions or volunteering creates meaningful, lasting change.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
