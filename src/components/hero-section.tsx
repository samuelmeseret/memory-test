"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { AnimatedText } from "./animated-text";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="flex flex-col overflow-hidden pb-[10px] pt-[20px] md:pt-[40px]">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-normal leading-tight mb-4 w-full px-4 max-w-6xl mx-auto text-balance text-foreground">
                Never forget a <br />
                <span className="font-bold mt-1 leading-none text-indigo-600 dark:text-indigo-400">
                  <AnimatedText text="familiar face again." delay={0.3} />
                </span>
              </h1>
            </>
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 800" width="100%" height="100%" style={{ maxHeight: "800px", display: "block", margin: "auto", backgroundColor: "transparent" }}>
            <defs>
              <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.1"/>
              </filter>
              <filter id="sm-shadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.05"/>
              </filter>
              
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8"/>
                <stop offset="100%" stopColor="#1e40af"/>
              </linearGradient>
              
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#15803d"/>
                <stop offset="100%" stopColor="#166534"/>
              </linearGradient>
            </defs>

            <rect x="0" y="0" width="360" height="800" rx="40" fill="#f8fafc" stroke="#1f2937" strokeWidth="12" />
            
            <rect x="120" y="20" width="120" height="32" rx="16" fill="#000000" />
            
            <rect x="6" y="60" width="348" height="64" fill="#ffffff" />
            <line x1="6" y1="124" x2="354" y2="124" stroke="#e5e7eb" strokeWidth="1" />
            
            <text x="24" y="100" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="700" fill="#1e40af">Memory Lane</text>
            
            <rect x="260" y="74" width="76" height="36" rx="12" fill="#f3f4f6" />
            <text x="298" y="97" fontFamily="system-ui, -apple-system, sans-serif" fontSize="14" fontWeight="500" fill="#374151" textAnchor="middle">Sign Out</text>

            <text x="24" y="176" fontFamily="system-ui, -apple-system, sans-serif" fontSize="30" fontWeight="700" fill="#111827">Your Family</text>
            <text x="24" y="206" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fill="#4b5563">What would you like to do?</text>

            <rect x="24" y="234" width="148" height="128" rx="16" fill="url(#blueGradient)" filter="url(#shadow)" />
            <svg x="82" y="254" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v16m8-8H4" />
            </svg>
            <text x="98" y="314" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="600" fill="#ffffff" textAnchor="middle">Add a Family</text>
            <text x="98" y="336" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="600" fill="#ffffff" textAnchor="middle">Member</text>

            <rect x="188" y="234" width="148" height="128" rx="16" fill="url(#greenGradient)" filter="url(#shadow)" />
            <svg x="246" y="254" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <text x="262" y="325" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="600" fill="#ffffff" textAnchor="middle">Who Is This?</text>

            <text x="24" y="416" fontFamily="system-ui, -apple-system, sans-serif" fontSize="24" fontWeight="700" fill="#111827">Family Members</text>

            <rect x="24" y="440" width="312" height="112" rx="16" fill="#ffffff" stroke="#f3f4f6" strokeWidth="1" filter="url(#sm-shadow)" />
            <rect x="40" y="456" width="80" height="80" rx="12" fill="#f3f4f6" />
            <text x="80" y="508" fontFamily="system-ui, -apple-system, sans-serif" fontSize="32" fontWeight="600" fill="#9ca3af" textAnchor="middle">M</text>
            <text x="136" y="486" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="600" fill="#111827">Mary (Aunt)</text>
            <text x="136" y="516" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fill="#6b7280">2 photos</text>
            <svg x="288" y="484" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>

            <rect x="24" y="564" width="312" height="112" rx="16" fill="#ffffff" stroke="#f3f4f6" strokeWidth="1" filter="url(#sm-shadow)" />
            <rect x="40" y="580" width="80" height="80" rx="12" fill="#f3f4f6" />
            <text x="80" y="632" fontFamily="system-ui, -apple-system, sans-serif" fontSize="32" fontWeight="600" fill="#9ca3af" textAnchor="middle">J</text>
            <text x="136" y="610" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="600" fill="#111827">Grandpa Joe</text>
            <text x="136" y="640" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fill="#6b7280">5 photos</text>
            <svg x="288" y="608" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>

            <rect x="110" y="775" width="140" height="5" rx="2.5" fill="#9ca3af" />
          </svg>
        </ContainerScroll>
      </div>
    </section>
  );
}
