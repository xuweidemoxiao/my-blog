import { faker } from "@faker-js/faker";

export const labelMock = {
    code: 200,
    data: {
        list: faker.helpers.multiple(
            (_, index) => {
                return {
                    id: index,
                    name: faker.word.adjective(),
                };
            },
            { count: 10 }
        ),
    }
}

const count = 100;
export const articleMock = {
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
                    label: faker.helpers.arrayElements(labelMock.data.list.map((item) => item.name)),
                    introduce: faker.lorem.sentence({ min: 20, max: 50 }),
                    cover: faker.image.url(),
                    views: faker.number.int({ min: 0, max: 1000 }),
                    state: faker.number.int({ min: 0, max: 1 }),
                    comment: faker.number.int({ min: 0, max: 100 }),
                    praise: faker.number.int({ min: 0, max: 100 }),
                    content: faker.lorem.paragraph({ min: 1, max: 3 }),
                };
            },
            { count }
        ),
    }
}
