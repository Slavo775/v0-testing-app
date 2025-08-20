"use client"

import type React from "react"

interface SubmitButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  variant?: "primary" | "secondary" | "destructive"
  size?: "sm" | "md" | "lg"
  className?: string
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const baseClasses =
    "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"

  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary shadow-lg hover:shadow-xl",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive shadow-lg hover:shadow-xl",
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <div className="flex items-center justify-center space-x-2">
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span>{children}</span>
      </div>
    </button>
  )
}
