import React, { useState, useMemo } from 'react';
import { CaseStudy, DifficultyType } from '../types';
import { Search, ChevronRight, Check, FolderOpen, ClipboardList, HelpCircle } from 'lucide-react';

interface CasesListViewProps {
  cases: CaseStudy[];
  onOpenCase: (caseId: string) => void;
  selectedCategory: 'all' | 'cdr' | 'ipdr';
  setSelectedCategory: (category: 'all' | 'cdr' | 'ipdr') => void;
  questionsProgress: Record<string, { completed: number; total: number }>;
}

export default function CasesListView({
  cases,
  onOpenCase,
  selectedCategory,
  setSelectedCategory,
  questionsProgress,
}: CasesListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | DifficultyType>('All');

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty;
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [cases, selectedCategory, selectedDifficulty, searchTerm]);

  const getDifficultyStyles = (diff: DifficultyType) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'Medium':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'Hard':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
      default:
        return 'bg-dark-bg border-dark-border text-text-primary';
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {selectedCategory === 'cdr' ? 'CDR Cases' : selectedCategory === 'ipdr' ? 'IPDR Cases' : 'All Cases'}
          </h1>
          <p className="text-sm text-text-secondary">
            Select an investigation scenario to examine datasets and complete objectives.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex bg-dark-card border border-dark-border p-1 rounded">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              selectedCategory === 'all' ? 'bg-brand-blue text-white' : 'text-text-secondary hover:text-white'
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setSelectedCategory('cdr')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              selectedCategory === 'cdr' ? 'bg-brand-blue text-white' : 'text-text-secondary hover:text-white'
            }`}
          >
            CDR Cases
          </button>
          <button
            onClick={() => setSelectedCategory('ipdr')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              selectedCategory === 'ipdr' ? 'bg-brand-blue text-white' : 'text-text-secondary hover:text-white'
            }`}
          >
            IPDR Cases
          </button>
        </div>
      </div>

      <hr className="border-dark-border" />

      {/* Basic Search filter row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
          <input
            id="case-search-input"
            type="text"
            placeholder="Search cases by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-dark-card border border-dark-border rounded text-sm focus:outline-none focus:border-brand-blue text-white"
          />
        </div>

        <select
          id="difficulty-select"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value as any)}
          className="bg-dark-card border border-dark-border rounded px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-brand-blue cursor-pointer"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Grid List of Cards */}
      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCases.map((caseStudy) => {
            const progress = questionsProgress[caseStudy.id] || { completed: 0, total: caseStudy.investigationQuestions.length };
            const isFinished = progress.completed === progress.total;

            return (
              <div
                key={caseStudy.id}
                id={`case-card-${caseStudy.id}`}
                className="bg-dark-card border border-dark-border rounded-xl p-6 flex flex-col justify-between hover:border-text-secondary transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-brand-blue uppercase bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/20">
                      {caseStudy.category.toUpperCase()} Case
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded border font-semibold ${getDifficultyStyles(caseStudy.difficulty)}`}>
                      {caseStudy.difficulty}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-white leading-tight">{caseStudy.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">{caseStudy.shortDescription}</p>
                  </div>

                  {/* Quantitative Metrics with clean Icons */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-text-muted pt-1">
                    <span className="flex items-center gap-1.5 bg-dark-bg px-2.5 py-1.5 rounded border border-dark-border">
                      <FolderOpen className="h-3.5 w-3.5 text-brand-blue" />
                      {caseStudy.evidenceFiles.length} Evidence {caseStudy.evidenceFiles.length === 1 ? 'File' : 'Files'}
                    </span>
                    <span className="flex items-center gap-1.5 bg-dark-bg px-2.5 py-1.5 rounded border border-dark-border">
                      <ClipboardList className="h-3.5 w-3.5 text-emerald-400" />
                      {caseStudy.investigationQuestions.length} Clues to Solve
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-dark-border flex items-center justify-between">
                  <div className="text-xs text-text-muted font-mono">
                    {isFinished ? (
                      <span className="text-green-400 font-bold flex items-center gap-1">
                        <Check className="h-3.5 w-3.5 stroke-[3]" /> Solved
                      </span>
                    ) : (
                      <span>Progress: {progress.completed} of {progress.total} solved</span>
                    )}
                  </div>

                  <button
                    id={`open-btn-${caseStudy.id}`}
                    onClick={() => onOpenCase(caseStudy.id)}
                    className="flex items-center gap-1 text-xs bg-brand-blue hover:bg-brand-hover text-white px-3.5 py-1.5 rounded font-semibold transition-colors cursor-pointer"
                  >
                    Open Case
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-dark-card border border-dark-border rounded-xl p-12 text-center text-text-secondary">
          No investigation cases found matching those filters.
        </div>
      )}
    </div>
  );
}
