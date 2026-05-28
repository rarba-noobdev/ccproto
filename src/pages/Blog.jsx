import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import { ErrorBanner, EmptyPanel } from '@/components/retail/StatusPanel'
import { supabase } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'

async function fetchPosts() {
  const { data, error } = await supabase.from('posts').select('*').order('published_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export default function Blog() {
  const reduceMotion = useReducedMotion()
  const { data: result = [], loading, error } = useSupabaseQuery(fetchPosts, [])
  const posts = Array.isArray(result) ? result : []
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <RetailLayout>
      <PageHeader
        kicker="Notes"
        title="Field notes."
        description="Spec choices, upgrade paths, benchmark observations."
      />
      <section className="container-max py-40">
        {error && <ErrorBanner className="mb-24" message={error.message} />}

        {loading && (
          <div className="grid gap-px bg-line border border-border-muted md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-surface-1">
                <div className="h-[200px] animate-pulse bg-surface-2" />
                <div className="space-y-10 p-20">
                  <div className="h-16 w-3/4 animate-pulse bg-surface-2" />
                  <div className="h-12 w-1/2 animate-pulse bg-surface-2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <EmptyPanel title="No notes yet" copy="Buying guides and bench logs publish here." />
        )}

        {!loading && posts.length > 0 && (
          <>
            {featured && (
              <motion.article
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35 }}
                className="group mb-24 grid overflow-hidden border border-border-muted bg-surface-1 md:grid-cols-[1.2fr_1fr]"
              >
                <div className="relative h-[300px] overflow-hidden md:h-full">
                  <img
                    src={featured.cover_image || '/placeholder-blog.jpg'}
                    alt={featured.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-col justify-between p-32 md:p-40">
                  <div>
                    <p className="meta">{featured.category || 'Guide'} · {featured.read_time || '5 min'}</p>
                    <h2 className="mt-16 text-title-h3 font-semibold leading-[1.05] tracking-[-.025em] md:text-title-h2">
                      {featured.title}
                    </h2>
                    <p className="mt-16 text-body-large text-ink-soft">{featured.excerpt}</p>
                  </div>
                  <div className="mt-24 flex items-center justify-between border-t border-border-muted pt-20">
                    <p className="meta">{featured.author || 'Challenger team'}</p>
                    <ArrowUpRight className="h-16 w-16 text-ink transition group-hover:-translate-y-0.5 motion-reduce:transform-none" aria-hidden="true" />
                  </div>
                </div>
              </motion.article>
            )}

            <div className="grid gap-px bg-line border border-border-muted md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group flex flex-col bg-surface-1 transition hover:bg-canvas"
                >
                  <div className="relative h-[180px] overflow-hidden">
                    <img
                      src={post.cover_image || '/placeholder-blog.jpg'}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-12 border-t border-border-muted p-20">
                    <p className="meta">{post.category || 'Guide'} · {post.read_time || '5 min'}</p>
                    <h3 className="text-title-h5 font-semibold leading-[1.2] tracking-[-.015em]">{post.title}</h3>
                    <p className="line-clamp-2 text-body-medium text-ink-soft">{post.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-border-muted pt-12">
                      <p className="meta">{post.author || 'Team'}</p>
                      <ArrowUpRight className="h-14 w-14 text-ink-muted transition group-hover:text-ink motion-reduce:transform-none" aria-hidden="true" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        )}
      </section>
    </RetailLayout>
  )
}
