import React from 'react'
import { Check } from 'lucide-react'

export default function MultiStepForm({ steps = [], currentStep = 1, onStepClick }) {
  return (
    <div className="w-full py-4 mb-6">
      <div className="flex items-center justify-between relative">
        {/* Progress Background Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-600 transition-all duration-300 z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <div
              key={step.id || index}
              className="relative z-10 flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => isCompleted && onStepClick && onStepClick(stepNumber)}
                disabled={!isCompleted}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                  isCompleted
                    ? 'bg-primary-600 text-white cursor-pointer hover:bg-primary-700'
                    : isCurrent
                    ? 'bg-primary-600 text-white ring-4 ring-primary-100 ring-offset-2'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNumber}
              </button>

              <span
                className={`mt-2 text-[11px] font-semibold tracking-tight hidden sm:block whitespace-nowrap ${
                  isCurrent ? 'text-primary-600 font-bold' : isCompleted ? 'text-gray-800' : 'text-gray-400'
                }`}
              >
                {step.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
