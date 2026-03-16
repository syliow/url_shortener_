export default function Input({ id, type = "text", placeholder, value, onChange, required = false }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-1.5 border"
    />
  )
}
