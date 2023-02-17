import { forwardRef, MouseEventHandler, ReactNode, Ref } from 'react'

type Props = {
  children?: ReactNode
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  medium?: boolean
}

const Link = forwardRef((props: Props, ref: Ref<HTMLAnchorElement>) => {
  let className = props.medium
    ? 'font-medium visited:text-neutral-500 hover:text-neutral-500'
    : 'inline-block underline underline-offset-2 hover:text-neutral-800 dark:hover:text-neutral-50 text-neutral-500 dark:text-neutral-400'

  return (
    <a
      className={className}
      href={props.href}
      onClick={props.onClick}
      ref={ref}
    >
      {props.children}
    </a>
  )
})
Link.displayName = 'Link'

export default Link
