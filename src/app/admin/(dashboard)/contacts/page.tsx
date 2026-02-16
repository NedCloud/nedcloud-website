import { prisma } from '@/lib/prisma'
import { ContactsManager } from '@/components/admin/ContactsManager'

export default async function AdminContactsPage() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return <ContactsManager initialContacts={contacts as any} />
}