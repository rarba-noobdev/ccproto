import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://pvzgvprimajvolfpurqk.supabase.co'
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2emd2cHJpbWFqdm9sZnB1cnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NzQ2NjksImV4cCI6MjA5NTQ1MDY2OX0.wUjBs1aaN52OYVwzIcTfdOTWui7sLKr7ClyWUmwOXDA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchHomeData() {
  const [prebuilts, components, benchmarks, testimonials, posts] = await Promise.all([
    supabase.from('prebuilts').select('*, cpu:cpu_id(*), gpu:gpu_id(*), ram:ram_id(*), storage:storage_id(*), cooler:cooler_id(*), case:case_id(*)').order('price'),
    supabase.from('components').select('*').order('price').limit(24),
    supabase.from('benchmarks').select('*').order('fps', { ascending: false }),
    supabase.from('testimonials').select('*').order('id'),
    supabase.from('posts').select('*').order('published_at', { ascending: false }).limit(3),
  ])

  for (const response of [prebuilts, components, benchmarks, testimonials, posts]) {
    if (response.error) throw response.error
  }

  return {
    prebuilts: prebuilts.data ?? [],
    components: components.data ?? [],
    benchmarks: benchmarks.data ?? [],
    testimonials: testimonials.data ?? [],
    posts: posts.data ?? [],
  }
}

export async function fetchComponents(category) {
  let query = supabase.from('components').select('*').order('price')
  if (category) query = query.eq('category', category)
  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function fetchPrebuilts() {
  const { data, error } = await supabase
    .from('prebuilts')
    .select('*, cpu:cpu_id(*), gpu:gpu_id(*), ram:ram_id(*), storage:storage_id(*), cooler:cooler_id(*), case:case_id(*)')
    .order('price')
  if (error) throw error
  return data ?? []
}

export async function fetchAdminData() {
  const [components, prebuilts, orders, posts] = await Promise.all([
    supabase.from('components').select('*'),
    supabase.from('prebuilts').select('*'),
    supabase.from('orders').select('*').order('created_at', { ascending: false }),
    supabase.from('posts').select('*').order('published_at', { ascending: false }),
  ])
  for (const response of [components, prebuilts, orders, posts]) {
    if (response.error) throw response.error
  }
  return {
    components: components.data ?? [],
    prebuilts: prebuilts.data ?? [],
    orders: orders.data ?? [],
    posts: posts.data ?? [],
  }
}
