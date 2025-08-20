"use client"

import type React from "react"
import { useState } from "react"

interface CheckboxOption {
  value: string
  label: string
  disabled?: boolean
}

interface CheckboxGroupProps {
  options: CheckboxOption[]
  value?: string[]
  onChange?: (values: string[]) => void
  className?: string
  title?: string
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  value = [],
  onChange,
  className = "",
  title,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value)

  const handleChange = (optionValue: string, checked: boolean) => {
    const newValues = checked ? [...selectedValues, optionValue] : selectedValues.filter((v) => v !== optionValue)

    setSelectedValues(newValues)
    onChange?.(newValues)
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>}
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center space-x-3 cursor-pointer group p-2 rounded-lg
                     transition-all duration-200 hover:bg-muted ${
                       option.disabled ? "opacity-50 cursor-not-allowed" : ""
                     }`}
        >
          <div className="relative">
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              disabled={option.disabled}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center
                         ${
                           selectedValues.includes(option.value)
                             ? "bg-primary border-primary transform scale-110"
                             : "border-border group-hover:border-primary"
                         }`}
            >
              {selectedValues.includes(option.value) && (
                <svg
                  className="w-3 h-3 text-primary-foreground animate-in zoom-in-50 duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-foreground group-hover:text-primary transition-colors duration-200">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  )
}
