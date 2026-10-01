import { useMemo } from 'react';
import katex from 'katex';
import ReactMarkdown, { type Options } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const remarkPlugins: Options['remarkPlugins'] = [remarkMath];
const rehypePlugins: Options['rehypePlugins'] = [[rehypeKatex, { throwOnError: false, strict: false }]];

interface MarkdownProps {
  children: string;
  /** Render paragraphs inline (for list items, badges, table cells). */
  inline?: boolean;
  className?: string;
}

/** Markdown + KaTeX renderer. Display math is forced LTR by the stylesheet so it reads correctly inside the RTL page. */
export function Markdown({ children, inline = false, className = '' }: MarkdownProps) {
  const Tag = inline ? 'span' : 'div';
  return (
    <Tag className={`md ${inline ? 'md-inline' : ''} ${className}`.trim()}>
      <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
        {children}
      </ReactMarkdown>
    </Tag>
  );
}

interface LatexProps {
  latex: string;
  display?: boolean;
  className?: string;
}

/** Renders a bare KaTeX expression (no Markdown, no $ delimiters). */
export function Latex({ latex, display = false, className = '' }: LatexProps) {
  const html = useMemo(() => katex.renderToString(latex, { throwOnError: false, displayMode: display, strict: false }), [latex, display]);
  return <span className={className} dir="ltr" dangerouslySetInnerHTML={{ __html: html }} />;
}
