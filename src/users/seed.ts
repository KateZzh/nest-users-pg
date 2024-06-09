import { Users } from './entities/users.entity';
import { faker } from '@faker-js/faker';
import { AppDataSource } from '../db.connection';

async function seed() {
  await AppDataSource.initialize();
  const userRepository = AppDataSource.getRepository(Users);

  try {
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      for (let i = 0; i < 10; i++) {
        const users = [];

        for (let j = 0; j < 10; j++) {
          const user = userRepository.create({
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            age: faker.number.int({ min: 18, max: 80 }),
            gender: faker.helpers.arrayElement(['man', 'woman']),
            isproblems: faker.helpers.arrayElement([true, false]),
          });
          users.push(user);
        }

        await transactionalEntityManager.save(users);
      }
    });

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding:', error);
  }
}

seed();
