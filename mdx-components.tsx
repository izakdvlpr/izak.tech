import type { MDXComponents } from 'mdx/types'

import { MDXParagraph } from './components/ui/mdx/mdx-paragraph'
import { MDXHeading1, MDXHeading2, MDXHeading3 } from './components/ui/mdx/mdx-heading'
import { MDXCodeBlock } from './components/ui/mdx/mdx-code-block'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    p: MDXParagraph,
    h1: MDXHeading1,
    h2: MDXHeading2,
    h3: MDXHeading3,
    pre: MDXCodeBlock,
  }
}
