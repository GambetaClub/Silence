// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function generateCategories() {
  await database.category.createMany({
    data: [
      { name: 'Books' },
      { name: 'Electronics' },
      { name: 'Clothing' },
    ],
  });
}

function createRandomArticle() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.float({ min: 10, max: 100, precision: 0.02 }),
  };
}

async function generateArticles() {
  const categories = await database.category.findMany();
  const articles = [];

  // Step 1: Create articles without connecting them to categories
  for (let i = 0; i < 50; i++) { // Adjust the number of articles as needed
    const article = createRandomArticle();
    articles.push(article);
  }

  await database.article.createMany({ data: articles });

  // Step 2: Connect articles to categories
  const createdArticles = await database.article.findMany(); // Retrieve created articles

  for (const article of createdArticles) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    await database.article.update({
      where: { id: article.id },
      data: {
        categories: {
          connect: { id: randomCategory.id },
        },
      },
    });
  }
}

async function main() {
  await generateArticles();
  console.log('Categories and articles generated successfully');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await database.$disconnect();
  });
