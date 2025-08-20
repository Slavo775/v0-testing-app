import type React from "react"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

interface TitleProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

export const Title: React.FC<TitleProps> = ({ children, level = 1, className = "" }) => {
  const baseClasses = "font-bold text-foreground transition-colors duration-200"

  const sizeClasses = {
    1: "text-4xl md:text-5xl mb-6",
    2: "text-3xl md:text-4xl mb-5",
    3: "text-2xl md:text-3xl mb-4",
    4: "text-xl md:text-2xl mb-3",
    5: "text-lg md:text-xl mb-2",
    6: "text-base md:text-lg mb-2",
  }

  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return <Tag className={`${baseClasses} ${sizeClasses[level]} ${className}`}>{children}</Tag>
}
