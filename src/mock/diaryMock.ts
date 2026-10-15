import { faker } from "@faker-js/faker";

const count = 100;
export const diaryMock = {
    code: 200,
    data: {
        count,
        list: faker.helpers.multiple(
            (_, index) => {
                return {
                    id: index,
                    title: faker.lorem.sentence({ min: 3, max: 5 }),
                    subsetId: faker.number.int({ min: 0, max: 9 }),
                    moment: faker.date.recent({ days: 30 }).toISOString().replace('T', ' ').slice(0, 19),
                    weatherId: faker.number.int({ min: 0, max: 10 }),
                    content: faker.lorem.paragraph({ min: 10, max: 30 }),
                    pictures: faker.helpers.multiple(() => faker.image.url(), { count: faker.number.int({ min: 0, max: 9 }) }),
                };
            },
            { count }
        ),
    }
}
