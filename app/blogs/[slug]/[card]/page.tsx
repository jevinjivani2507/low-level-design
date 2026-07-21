import { notFound } from "next/navigation"
import { flashCardTopics, getFlatDocs, docHref } from "@/lib/topics-data"
import { TopicCodeBlock } from "@/components/topics/topic-code-block"
import { DocPager } from "@/components/blogs/doc-pager"
import { renderInline } from "@/components/blogs/highlight"

export function generateStaticParams() {
  return getFlatDocs().map((d) => ({ slug: d.topicSlug, card: d.card.id }))
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string; card: string }>
}) {
  const { slug, card: cardId } = await params
  const topic = flashCardTopics.find((t) => t.slug === slug)
  const card = topic?.cards.find((c) => c.id === cardId)
  if (!topic || !card) notFound()

  const flat = getFlatDocs()
  const idx = flat.findIndex(
    (d) => d.topicSlug === slug && d.card.id === cardId
  )
  const prev = flat[idx - 1]
  const next = flat[idx + 1]

  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {topic.title}
      </p>
      <h1 className="mt-1.5 text-2xl font-semibold tracking-tight">
        {card.title}
      </h1>

      <hr className="my-6 border-border" />

      <ul className="flex flex-col gap-2.5">
        {card.bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex gap-2.5 text-sm leading-relaxed text-foreground/90"
          >
            <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/50" />
            <span>{renderInline(bullet)}</span>
          </li>
        ))}
      </ul>

      {card.code && (
        <div className="mt-6">
          <TopicCodeBlock code={card.code} language={card.language} />
        </div>
      )}

      <DocPager
        prev={
          prev
            ? {
                href: docHref(prev.topicSlug, prev.card.id),
                title: prev.card.title,
              }
            : null
        }
        next={
          next
            ? {
                href: docHref(next.topicSlug, next.card.id),
                title: next.card.title,
              }
            : null
        }
      />
    </article>
  )
}
