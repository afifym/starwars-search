import * as React from "react"

interface TextInputProps {
  value: string
  onChange: (val: string) => void
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const { value, onChange } = props

  const handleChange = (e: any) => {
    onChange(e.target.value)
  }

  return (
    <div className="w-full">
      <input
        className="input w-full max-w-[350px]"
        value={value}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  )
}

export default TextInput
