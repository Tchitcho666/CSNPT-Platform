import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../src/generated/prisma/client';
import { PRACTITIONERS } from '../src/lib/data';

const prisma = new PrismaClient({ adapter: new PrismaLibSql({ url: 'file:./prisma/dev.db' }) });

const knownGovernorates: Record<string, string> = {
  tunis: 'tunis',
  ariana: 'ariana',
  'ben arous': 'ben arous',
  sfax: 'sfax',
  sousse: 'sousse',
  nabeul: 'nabeul',
  bizerte: 'bizerte',
};

async function main() {
  const records = PRACTITIONERS.filter((person) => person.type === 'praticien');
  let seeded = 0;
  for (const person of records) {
    const city = person.city.fr.trim();
    const governorate = knownGovernorates[city.toLocaleLowerCase('fr')];
    if (!governorate) continue;

    const fullName = person.name;
    const specialty = person.roleOrSpecialty.fr.split('•')[0].trim();
    const existing = await prisma.psychomotricien.findFirst({ where: { fullName } });
    const data = {
      fullName,
      specialty,
      city,
      governorate,
      phone: person.phone || '',
      exactAddress: person.address.fr || '',
    };
    if (existing) {
      await prisma.psychomotricien.update({ where: { id: existing.id }, data });
    } else {
      await prisma.psychomotricien.create({
        data: { ...data, isPublished: person.id === 'p1' },
      });
    }
    seeded += 1;
  }
  console.info(`Seeded ${seeded} existing static practitioner record(s).`);
}

main()
  .catch((error) => {
    console.error('Prisma seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
