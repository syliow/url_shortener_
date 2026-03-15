export default function Button({ type = "button", onClick, disabled = false, children }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
