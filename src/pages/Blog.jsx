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
  const { data = [], loading, error } = useSupabaseQuery(fetchPosts, [])

  return (
    <RetailLayout>
      <PageHeader
        kicker="Guides"
        title="Practical buying advice for Indian PC builders"
        description="No generic blog filler. These guides are written around component pricing, upgrade decisions, and common build mistakes."
      />
      <section className="container-max py-10">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-200">{error.message}</div>}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {loading && Array.from({ length: 3 }).map((_, i) => <div key={i} className="panel h-80 animate-pulse rounded-2xl" />)}
          {data.map((post) => (
            <article key={post.id} className="panel overflow-hidden rounded-2xl">
              <img src={post.cover_image} alt={post.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#f26522]">{post.category} - {post.read_time}</p>
                <h2 className="text-xl font-black tracking-tight">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/58">{post.excerpt}</p>
                <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-6 text-white/48">{post.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </RetailLayout>
  )
}
