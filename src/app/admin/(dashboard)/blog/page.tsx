import { prisma } from '@/lib/prisma'
import { FileText, Calendar, User, Eye, EyeOff, Pencil, Trash2, Plus } from 'lucide-react'

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: { name: true },
      },
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
        <a
          href="/admin/blog/new"
          className="btn-primary px-4 py-2 flex items-center gap-2"
        >
          <Plus size={18} />
          New Post
        </a>
      </div>

      <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-700/50">
              <th className="text-left p-4 text-gray-400 font-medium">Title</th>
              <th className="text-left p-4 text-gray-400 font-medium">Author</th>
              <th className="text-left p-4 text-gray-400 font-medium">Date</th>
              <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-dark-700/30 last:border-0">
                <td className="p-4">
                  <div className="text-white font-medium">{post.title}</div>
                  <div className="text-gray-500 text-sm">{post.excerpt?.slice(0, 60)}...</div>
                </td>
                <td className="p-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    {post.author.name}
                  </div>
                </td>
                <td className="p-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : 'Not published'}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`flex items-center gap-1 px-2 py-1 rounded text-sm w-fit ${
                    post.published
                      ? 'bg-neon-green/10 text-neon-green'
                      : 'bg-gray-600/10 text-gray-400'
                  }`}>
                    {post.published ? <Eye size={14} /> : <EyeOff size={14} />}
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {posts.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No blog posts yet. Write your first post to get started.
          </div>
        )}
      </div>
    </div>
  )
}