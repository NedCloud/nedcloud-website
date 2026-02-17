import { prisma } from '@/lib/prisma'
import { ContactsManager } from '@/components/admin/ContactsManager'

export default async function AdminContactsPage() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const typedContacts = contacts.map(c => ({
    ...c,
    status: c.status as 'new' | 'read' | 'replied'
  }))

  return <ContactsManager initialContacts={typedContacts} />
}