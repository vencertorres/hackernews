import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme()

  let icon
  switch (resolvedTheme) {
    case 'dark':
      icon = <MoonIcon className="h-5 w-5" />
      break
    case 'light':
    default:
      icon = <SunIcon className="h-5 w-5" />
      break
  }

  return (
    <button
      className="rounded p-1 hover:bg-neutral-200 dark:hover:text-neutral-800"
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      type="button"
    >
      {icon}
    </button>
  )
}
