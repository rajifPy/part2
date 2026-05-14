import { blogPosts } from '@/data/blog'
import BlogPostClient from './BlogPostClient'

export async function generateStaticParams() {
  return blogPosts.map(post => ({ id: post.id }))
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find(p => p.id === params.id)
  if (!post) return { title: 'Artikel tidak ditemukan' }
  return {
    title:       post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }) {
  return <BlogPostClient params={params} />
}
