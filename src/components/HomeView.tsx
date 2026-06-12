import React from 'react';
import { FileText, Navigation, Search, CheckSquare, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  onExploreCases: (category: 'cdr' | 'ipdr') => void;
  onNavigateToTab: (tabId: string) => void;
}

export default function HomeView({ onExploreCases, onNavigateToTab }: HomeViewProps) {
  const features = [
    {
      icon: FileText,
      title: 'CDR Log Organizing',
      description: 'Easily organize Call Detail Records (CDR) from cellular networks to see who called whom, call dates, and duration profiles.',
    },
    {
      icon: Navigation,
      title: 'Cell Tower Tracking',
      description: 'Cross-reference cell tower identification numbers to follow physical coordinates and map target routing over time.',
    },
    {
      icon: Search,
      title: 'IPDR Connection Matching',
      description: 'Analyze Internet Protocol Detail Records (IPDR) to trace server connections, port traffic, and periodic data transfers.',
    },
    {
      icon: CheckSquare,
      title: 'Offline Browser Safe',
      description: 'Everything is computed securely on your local computer. No registration or server accounts are required to analyze your files.',
    }
  ];

  return (
    <div className="space-y-12 py-4">
      {/* Introduction Banner */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-8 md:p-12 space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Trinetra Case Portal
          </h1>
          <p className="text-text-secondary text-base md:text-lg max-w-3xl leading-relaxed">
            Trinetra is a powerful, user-friendly tool designed to help you analyze telecommunication logs 
            effectively. It parses and formats complex data records so that digital investigators can reconstruct 
            schedules and verify locations easily.
          </p>
          <p className="text-text-secondary text-base md:text-lg max-w-3xl leading-relaxed">
            Use this case portal to select sample cases, download provided practice datasets, and answer investigation questions to build your analyst skills.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            id="cta-cdr-cases"
            onClick={() => onExploreCases('cdr')}
            className="px-5 py-3 rounded bg-brand-blue hover:bg-brand-hover text-white text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            Browse CDR Cases
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            id="cta-ipdr-cases"
            onClick={() => onExploreCases('ipdr')}
            className="px-5 py-3 rounded bg-dark-bg hover:bg-dark-border text-text-primary text-sm font-semibold border border-dark-border transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            Browse IPDR Cases
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            id="cta-how-to"
            onClick={() => onNavigateToTab('how-to-use')}
            className="px-5 py-3 rounded text-text-secondary hover:text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Read Tutorial Guide
          </button>
        </div>
      </div>

      {/* Feature Listing Grid */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Practical Features
          </h2>
          <p className="text-sm text-text-secondary">
            Learn and practice these essential logging concepts using the sample exercises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-3"
              >
                <div className="p-2.5 bg-brand-blue/10 text-brand-blue rounded w-fit">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-white text-base">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Information Segment */}
      <div className="bg-dark-card/60 border border-dark-border/80 rounded-xl p-6 text-center space-y-2">
        <h3 className="font-bold text-white text-base">Simple & persistent analysis</h3>
        <p className="text-xs text-text-secondary max-w-2xl mx-auto">
          Your case answers and custom investigator notes are saved automatically to your local browser storage. You can close your browser tab and return at any time without losing your workspace progress.
        </p>
      </div>
    </div>
  );
}
