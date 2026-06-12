import React from 'react';
import { Check, ArrowRight, ArrowRightCircle } from 'lucide-react';

interface HowToUseViewProps {
  onStartAnalyzing: () => void;
}

export default function HowToUseView({ onStartAnalyzing }: HowToUseViewProps) {
  const steps = [
    {
      num: 1,
      title: 'Select an investigation case',
      text: 'Browse the available lists under CDR Cases or IPDR Cases. Click "Open Dossier" on any scenario cards to view details.'
    },
    {
      num: 2,
      title: 'Download the provided datasets',
      text: 'Download the prepared practice CSV / spreadsheet files from the Evidence Files section on the case detail page.'
    },
    {
      num: 3,
      title: 'Open Trinetra',
      text: 'Launch the Trinetra parsing client software or import the files into your favorite spreadsheet tool on your work desktop.'
    },
    {
      num: 4,
      title: 'Upload CDR/IPDR files',
      text: 'Upload your downloaded CSV logs into Trinetra to parse call logs, IP records, or cell coordinates correctly.'
    },
    {
      num: 5,
      title: 'Perform analysis',
      text: 'Filter records check timestamps, calculate duration counts, or verify cell tower IDs to locate anomalous entries.'
    },
    {
      num: 6,
      title: 'Answer investigation questions',
      text: 'Return to the Case Detail page and type your calculated values into the interactive fields to see if your findings are correct.'
    },
    {
      num: 7,
      title: 'Generate findings',
      text: 'Compile your findings into the notes scratchpad to build a clear diagnostic view. Everything is autosaved automatically.'
    }
  ];

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">How To Use the Portal</h1>
        <p className="text-sm text-text-secondary">
          Follow this straightforward 7-step guide to complete any interactive telecom log case study.
        </p>
      </div>

      <hr className="border-dark-border" />

      {/* Checklist layout */}
      <div className="bg-dark-card border border-dark-border rounded-xl divide-y divide-dark-border overflow-hidden max-w-4xl">
        {steps.map((step) => (
          <div 
            key={step.num}
            id={`step-row-${step.num}`}
            className="p-5 flex gap-4 items-start hover:bg-dark-bg/40 transition-colors"
          >
            <div className="h-8 w-8 font-mono text-sm font-bold bg-brand-blue text-white rounded flex items-center justify-center shrink-0">
              {step.num}
            </div>
            
            <div className="space-y-1">
              <h3 className="font-semibold text-white text-base">{step.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Button interface */}
      <div className="pt-2 max-w-4xl flex justify-start">
        <button
          onClick={onStartAnalyzing}
          id="how-to-cta-start"
          className="px-5 py-3 rounded bg-brand-blue hover:bg-brand-hover text-white text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
        >
          Begin first case
          <ArrowRightCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
