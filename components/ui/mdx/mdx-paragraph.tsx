import type { HTMLAttributes, PropsWithChildren } from 'react'

type MDXParagraphProps = PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>

export function MDXParagraph({ children, ...rest }: MDXParagraphProps) {
  return (
    <p className="text-lg leading-7 text-gray-300" {...rest}>
      {children}
    </p>
  )
}
