export default function Text({ content }: { content: string }) {
  return (
    <div
      className="space-y-2 break-words text-sm [&_*]:whitespace-pre-wrap [&_a:hover]:text-neutral-400 dark:[&_a:hover]:text-neutral-400 [&_a]:underline [&_a]:underline-offset-2"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
