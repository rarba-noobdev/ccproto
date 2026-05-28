import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import { supabase } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'

async function fetchPosts() {
  const { data, error } = await supabase.from('posts').select('*').order('published_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export default function Blog() {
  const { data: result = [], loading, error } = useSupabaseQuery(fetchPosts, [])
  const data = Array.isArray(result) ? result : []

  return (
    <RetailLayout>
      <PageHeader
        kicker="Guides"
        title="Buying notes"
        description="Short, practical guides for parts and upgrade decisions."
      />
      <section className="container-max py-8">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-700">{error.message}</div>}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {loading && Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-80 animate-pulse rounded-[28px] border border-[var(--line)] bg-[var(--surface-1)]" />)}
          {data.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface-1)] shadow-[0_12px_36px_rgba(38,38,38,.07)]">
              <img src={post.cover_image} alt={post.title} width="520" height="260" className="m-2 h-44 w-[calc(100%-16px)] rounded-[22px] object-cover" loading="lazy" decoding="async" />
              <div className="p-5">
                <p className="mb-2 text-xs font-black uppercase tracking-wide text-[var(--ink-muted)]">{post.category} / {post.read_time}</p>
                <h2 className="text-xl font-black tracking-[-.04em]">{post.title}</h2>
                <p className="mt-3 truncate-2 text-sm font-semibold leading-6 text-[var(--ink-muted)]">{post.excerpt}</p>
                <p className="mt-5 border-t border-[var(--line)] pt-4 text-sm leading-6 text-[var(--ink-muted)]">{post.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </RetailLayout>
  )
}
