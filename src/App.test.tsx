import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import App from "./App"

describe("App", () => {
  it("renders the main heading", () => {
    render(<App />)
    expect(screen.getByText("Vite + React")).toBeInTheDocument()
  })

  it("increments count when button is clicked", () => {
    render(<App />)
    const button = screen.getByRole("button", { name: /count is 0/i })

    fireEvent.click(button)

    expect(screen.getByText("count is 1")).toBeInTheDocument()
  })

  it("displays the correct initial count", () => {
    render(<App />)
    expect(screen.getByText("count is 0")).toBeInTheDocument()
  })
})
