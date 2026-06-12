import React, { useState } from 'react';
import { Menu, X, BookOpen, FileText, BarChart } from 'lucide-react';

interface NavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeCaseId: string | null;
  clearActiveCase: () => void;
  completedCount: number;
  totalQuestionsCount: number;
}

export default function NavBar({
  activeTab,
  setActiveTab,
  activeCaseId,
  clearActiveCase,
  completedCount,
  totalQuestionsCount,
}: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'how-to-use', label: 'How to Use' },
    { id: 'cdr', label: 'CDR Cases' },
    { id: 'ipdr', label: 'IPDR Cases' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    clearActiveCase();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-dark-card border-b border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 cursor-pointer"
            id="nav-logo"
          >
            <div className="h-8 w-8 rounded bg-brand-blue flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Trinetra Case Portal
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex gap-4">
            {navItems.map((item) => {
              const isActive = activeTab === item.id && !activeCaseId;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-brand-blue text-white' 
                      : 'text-text-secondary hover:text-white hover:bg-dark-bg/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Progress */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-text-secondary font-mono bg-dark-bg px-3 py-1.5 rounded border border-dark-border">
            <span>Completed:</span>
            <span className="text-brand-blue font-bold">{completedCount} of {totalQuestionsCount}</span>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 px-2 text-text-secondary hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav items */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-card border-t border-dark-border py-2 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id && !activeCaseId;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors block ${
                  isActive 
                    ? 'bg-brand-blue text-white' 
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
