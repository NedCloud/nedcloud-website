import { prisma } from '@/lib/prisma'
import { Mail, Building, Calendar, CheckCircle, Circle, Trash2 } from 'lucide-react'

export default async function AdminContactsPage() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const statusColors: Record<string, string> = {
    new: 'bg-neon-blue/10 text-neon-blue',
    read: 'bg-yellow-500/10 text-yellow-500',
    replied: 'bg-neon-green/10 text-neon-green',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Contact Submissions</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <Circle className="w-3 h-3 text-neon-blue fill-neon-blue" />
            New
          </span>
          <span className="flex items-center gap-2">
            <Circle className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            Read
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-neon-green" />
            Replied
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700/50 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-medium text-lg">{contact.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Mail size={14} />
                    {contact.email}
                  </span>
                  {contact.company && (
                    <span className="flex items-center gap-1">
                      <Building size={14} />
                      {contact.company}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                  statusColors[contact.status] || statusColors.new
                }`}>
                  {contact.status}
                </span>
              </div>
            </div>

            {contact.subject && (
              <p className="text-neon-blue text-sm mb-2">{contact.subject}</p>
            )}
            
            <p className="text-gray-300">{contact.message}</p>

            <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-dark-700/50">
              <a
                href={`mailto:${contact.email}`}
                className="btn-secondary px-4 py-2 text-sm flex items-center gap-2"
              >
                <Mail size={16} />
                Reply
              </a>
              <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No contact submissions yet.
        </div>
      )}
    </div>
  )
}