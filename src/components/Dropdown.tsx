"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownOption[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  className?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder = "Select an option",
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    setIsOpen(false)
    onChange?.(optionValue)
  }

  const selectedOption = options.find((opt) => opt.value === selectedValue)

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-input border border-border rounded-lg 
                   hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring 
                   transition-all duration-200 flex items-center justify-between
                   hover:shadow-md transform hover:scale-[1.02]"
      >
        <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-10 w-full mt-2 bg-popover border border-border rounded-lg shadow-lg 
                        animate-in fade-in-0 zoom-in-95 duration-200"
        >
          <div className="py-2 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground
                           transition-colors duration-150 focus:outline-none focus:bg-accent 
                           focus:text-accent-foreground"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
