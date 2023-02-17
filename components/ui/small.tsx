export default function Small({ children }: { children: React.ReactNode }) {
  return (
    <small className="text-sm text-neutral-500 dark:text-neutral-400">
      {children}
    </small>
  )
}
