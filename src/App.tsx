"use client"

import { useState } from "react"
import { Title } from "./components/Title"
import { Dropdown } from "./components/Dropdown"
import { Autocomplete } from "./components/Autocomplete"
import { CheckboxGroup } from "./components/CheckboxGroup"
import { RadioGroup } from "./components/RadioGroup"
import { SubmitButton } from "./components/SubmitButton"

function App() {
  const [formData, setFormData] = useState({
    dropdown: "",
    autocomplete: "",
    checkboxes: [] as string[],
    radio: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sample data for components
  const dropdownOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ]

  const autocompleteOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
  ]

  const checkboxOptions = [
    { value: "frontend", label: "Frontend Development" },
    { value: "backend", label: "Backend Development" },
    { value: "mobile", label: "Mobile Development" },
    { value: "devops", label: "DevOps" },
    { value: "design", label: "UI/UX Design" },
  ]

  const radioOptions = [
    { value: "beginner", label: "Beginner (0-1 years)" },
    { value: "intermediate", label: "Intermediate (2-4 years)" },
    { value: "advanced", label: "Advanced (5+ years)" },
    { value: "expert", label: "Expert (10+ years)" },
  ]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert("Form submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Title level={1} className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Modern Control Elements Showcase
          </Title>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our collection of interactive form controls with vibrant styling and smooth animations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Dropdown Section */}
          <div className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
            <Title level={3} className="text-primary mb-4">
              Framework Selector
            </Title>
            <Dropdown
              options={dropdownOptions}
              value={formData.dropdown}
              placeholder="Choose your favorite framework"
              onChange={(value) => setFormData({ ...formData, dropdown: value })}
            />
          </div>

          {/* Autocomplete Section */}
          <div className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
            <Title level={3} className="text-primary mb-4">
              Programming Language
            </Title>
            <Autocomplete
              options={autocompleteOptions}
              value={formData.autocomplete}
              placeholder="Search for a programming language..."
              onChange={(value) => setFormData({ ...formData, autocomplete: value })}
            />
          </div>

          {/* Checkbox Group Section */}
          <div className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
            <CheckboxGroup
              title="Areas of Interest"
              options={checkboxOptions}
              value={formData.checkboxes}
              onChange={(values) => setFormData({ ...formData, checkboxes: values })}
            />
          </div>

          {/* Radio Group Section */}
          <div className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
            <RadioGroup
              title="Experience Level"
              name="experience"
              options={radioOptions}
              value={formData.radio}
              onChange={(value) => setFormData({ ...formData, radio: value })}
            />
          </div>
        </div>

        {/* Form State Display */}
        <div className="bg-muted p-6 rounded-xl mb-8">
          <Title level={3} className="text-foreground mb-4">
            Current Form State
          </Title>
          <div className="bg-background p-4 rounded-lg border border-border">
            <pre className="text-sm text-foreground overflow-auto">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        </div>

        {/* Submit Button Section */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <SubmitButton variant="primary" size="lg" loading={isSubmitting} onClick={handleSubmit}>
              Submit Form
            </SubmitButton>
            <SubmitButton
              variant="secondary"
              size="md"
              onClick={() => setFormData({ dropdown: "", autocomplete: "", checkboxes: [], radio: "" })}
            >
              Reset Form
            </SubmitButton>
            <SubmitButton variant="destructive" size="sm">
              Delete Data
            </SubmitButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
