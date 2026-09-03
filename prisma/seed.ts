// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Uploading Database Seed')

  // Create initial Questions
  const q1 = await prisma.question.create({
    data: {
      title: "Thank You",
      content: "ありがとうございます",
      askerName: "..."
    }
  })

  const q2 = await prisma.question.create({
    data: {
      title: "You're Welcome",
      content: "どういたしまして",
      askerName: "..."
    }
  })

  // Create some Answers
  await prisma.answer.create({
    data: {
      questionId: q1.id,
      content: "Use display: flex; justify-content: center;",
      author: "...",
      accepted: true
    }
  })

  console.log('Seed Data Uploaded')
}

main()
  .catch((e) => { throw e })
  .finally(async () => { await prisma.$disconnect() })
