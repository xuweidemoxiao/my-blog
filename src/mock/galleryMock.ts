import { faker } from "@faker-js/faker";
const count = 100;
export const galleryMock = {
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
                    introduce: faker.lorem.sentence({ min: 20, max: 50 }),
                    views: faker.number.int({ min: 0, max: 1000 }),
                    state: faker.number.int({ min: 0, max: 1 }),
                    comment: faker.number.int({ min: 0, max: 100 }),
                    praise: faker.number.int({ min: 0, max: 100 }),
                    content: faker.helpers.multiple(
                        () => faker.image.url(),
                        { count: faker.number.int({ min: 1, max: 8 }) }
                    ),
                };
            },
            { count }
        ),
    }
}
