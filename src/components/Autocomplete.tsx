"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface AutocompleteOption {
  value: string
  label: string
}

interface AutocompleteProps {
  options: AutocompleteOption[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  onSelect?: (option: AutocompleteOption) => void
  className?: string
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value = "",
  placeholder = "Type to search...",
  onChange,
  onSelect,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const filtered = options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
    setFilteredOptions(filtered)
    setHighlightedIndex(-1)
  }, [inputValue, options])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setIsOpen(true)
    onChange?.(newValue)
  }

  const handleSelect = (option: AutocompleteOption) => {
    setInputValue(option.label)
    setIsOpen(false)
    onSelect?.(option)
    onChange?.(option.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0) {
          handleSelect(filteredOptions[highlightedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setHighlightedIndex(-1)
        break
    }
  }

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-input border border-border rounded-lg 
                   hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring 
                   transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
      />

      {isOpen && filteredOptions.length > 0 && (
        <div
          ref={listRef}
          className="absolute z-10 w-full mt-2 bg-popover border border-border rounded-lg shadow-lg 
                     animate-in fade-in-0 zoom-in-95 duration-200"
        >
          <div className="py-2 max-h-60 overflow-auto">
            {filteredOptions.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full px-4 py-2 text-left transition-colors duration-150 
                           focus:outline-none ${
                             index === highlightedIndex
                               ? "bg-primary text-primary-foreground"
                               : "hover:bg-accent hover:text-accent-foreground"
                           }`}
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
