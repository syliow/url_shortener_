export default function Button({ type = "button", onClick, disabled = false, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
    >
      {children}
    </button>
  )
}
