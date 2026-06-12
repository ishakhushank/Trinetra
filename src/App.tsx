/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import HomeView from './components/HomeView';
import HowToUseView from './components/HowToUseView';
import CasesListView from './components/CasesListView';
import CaseDetailView from './components/CaseDetailView';
import { CASE_STUDIES } from './casesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  
  // Track validated correct answers
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Restore task progress from localStorage on boot
  useEffect(() => {
    const savedProgress = localStorage.getItem('trinetra-answers-checkpoint');
    if (savedProgress) {
      try {
        setAnswers(JSON.parse(savedProgress));
      } catch (err) {
        console.error('Failed reading saved progress token', err);
      }
    }
  }, []);

  // Save answer to global state and local storage
  const handleSaveAnswer = (questionId: string, answer: string, isCorrect: boolean) => {
    if (!activeCaseId) return;
    
    // Only persist and record if validated as correct
    if (isCorrect) {
      const compositeKey = `${activeCaseId}-${questionId}`;
      const updated = {
        ...answers,
        [compositeKey]: answer
      };
      setAnswers(updated);
      localStorage.setItem('trinetra-answers-checkpoint', JSON.stringify(updated));
    }
  };

  // Locate the open case details
  const activeCase = CASE_STUDIES.find((c) => c.id === activeCaseId) || null;

  // Compute overall statistics
  const totalQuestionsList = CASE_STUDIES.flatMap(c => c.investigationQuestions);
  const totalQuestionsCount = totalQuestionsList.length;
  
  // Calculate specific questions answered per case study
  const getQuestionsProgressMap = () => {
    const map: Record<string, { completed: number; total: number }> = {};
    CASE_STUDIES.forEach((caseStudy) => {
      let completed = 0;
      caseStudy.investigationQuestions.forEach((q) => {
        if (answers[`${caseStudy.id}-${q.id}`]) {
          completed++;
        }
      });
      map[caseStudy.id] = {
        completed,
        total: caseStudy.investigationQuestions.length
      };
    });
    return map;
  };

  const progressProgressMap = getQuestionsProgressMap();
  const completedQuestionsCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col justify-between font-sans text-text-primary selection:bg-brand-blue/30">
      <div>
        {/* Simple Global Navigation Bar */}
        <NavBar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setActiveCaseId(null);
          }}
          activeCaseId={activeCaseId}
          clearActiveCase={() => setActiveCaseId(null)}
          completedCount={completedQuestionsCount}
          totalQuestionsCount={totalQuestionsCount}
        />

        {/* Primary Page Content Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeCase ? (
            <CaseDetailView
              caseStudy={activeCase}
              onBack={() => {
                setActiveCaseId(null);
              }}
              answersState={answers}
              onSaveAnswer={handleSaveAnswer}
              questionsProgress={progressProgressMap[activeCase.id]}
            />
          ) : (
            <>
              {activeTab === 'home' && (
                <HomeView
                  onExploreCases={(category) => {
                    setActiveTab(category);
                    setActiveCaseId(null);
                  }}
                  onNavigateToTab={(tabId) => {
                    setActiveTab(tabId);
                    setActiveCaseId(null);
                  }}
                />
              )}

              {activeTab === 'how-to-use' && (
                <HowToUseView
                  onStartAnalyzing={() => {
                    setActiveTab('cdr');
                    setActiveCaseId('cdr-case-1'); // Open the first clean sample case
                  }}
                />
              )}

              {activeTab === 'cdr' && (
                <CasesListView
                  cases={CASE_STUDIES}
                  selectedCategory="cdr"
                  setSelectedCategory={(cat) => {
                    if (cat !== 'cdr') {
                      setActiveTab(cat);
                    }
                  }}
                  questionsProgress={progressProgressMap}
                  onOpenCase={(caseId) => setActiveCaseId(caseId)}
                />
              )}

              {activeTab === 'ipdr' && (
                <CasesListView
                  cases={CASE_STUDIES}
                  selectedCategory="ipdr"
                  setSelectedCategory={(cat) => {
                    if (cat !== 'ipdr') {
                      setActiveTab(cat);
                    }
                  }}
                  questionsProgress={progressProgressMap}
                  onOpenCase={(caseId) => setActiveCaseId(caseId)}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Simplified Footer */}
      <footer className="border-t border-dark-border bg-dark-card py-6 mt-12 text-xs text-text-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; 2026 Trinetra Case Portal. Built for simple practice & file analysis.</span>
          <div className="flex gap-3">
            <span className="text-text-muted">Offline Mode</span>
            <span className="text-text-muted">•</span>
            <span className="text-text-muted">Local Storage Saved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
