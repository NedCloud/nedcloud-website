import { prisma } from '@/lib/prisma'
import { User, Mail, Linkedin, Github, Twitter, Pencil, Trash2, Eye, EyeOff, Plus } from 'lucide-react'

export default async function AdminTeamPage() {
  const team = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Team Members</h1>
        <a
          href="/admin/team/new"
          className="btn-primary px-4 py-2 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Member
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700/50 overflow-hidden"
          >
            <div className="aspect-square bg-dark-700 flex items-center justify-center">
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-gray-600" />
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">{member.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  member.published
                    ? 'bg-neon-green/10 text-neon-green'
                    : 'bg-gray-600/10 text-gray-400'
                }`}>
                  {member.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-neon-blue text-sm mb-2">{member.role}</p>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{member.bio}</p>
              <div className="flex items-center gap-3 mb-4">
                {member.email && <Mail className="w-4 h-4 text-gray-500" />}
                {member.linkedin && <Linkedin className="w-4 h-4 text-gray-500" />}
                {member.github && <Github className="w-4 h-4 text-gray-500" />}
                {member.twitter && <Twitter className="w-4 h-4 text-gray-500" />}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-dark-700/50">
                <span className="text-gray-500 text-sm">Order: {member.order}</span>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {team.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No team members yet. Add your first team member to get started.
        </div>
      )}
    </div>
  )
}