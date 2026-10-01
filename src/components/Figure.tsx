export function Figure({ svg, caption }: { svg: string; caption?: string }) {
  return (
    <figure className="figure my-3 rounded-xl bg-surface-2 p-3">
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      {caption && <figcaption className="mt-2 text-center text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}
