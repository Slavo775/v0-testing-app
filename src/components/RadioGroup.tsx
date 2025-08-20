"use client"

import type React from "react"
import { useState } from "react"

interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  name: string
  className?: string
  title?: string
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange, name, className = "", title }) => {
  const [selectedValue, setSelectedValue] = useState(value || "")

  const handleChange = (optionValue: string) => {
    setSelectedValue(optionValue)
    onChange?.(optionValue)
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
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleChange(option.value)}
              disabled={option.disabled}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 border-2 rounded-full transition-all duration-200 flex items-center justify-center
                         ${
                           selectedValue === option.value
                             ? "border-primary transform scale-110"
                             : "border-border group-hover:border-primary"
                         }`}
            >
              {selectedValue === option.value && (
                <div className="w-2.5 h-2.5 bg-primary rounded-full animate-in zoom-in-50 duration-200" />
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
