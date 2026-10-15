import { faker } from "@faker-js/faker";

// 私信数据
const messageCount = faker.number.int({ min: 0, max: 100 });
export const messageMock = {
    code: 200,
    data: {
        count: messageCount,
        list: faker.helpers.multiple(
            (_, index) => ({
                id: index,
                user: {
                    id: faker.number.int({ min: 0, max: 1000 }),
                    name: faker.internet.username(),
                    avatar: faker.image.avatar(),
                },
                content: faker.lorem.sentence({ min: 5, max: 10 }),
                moment: faker.date.recent({ days: 30 }).toISOString().replace('T', ' ') .slice(0, 19),
            }),
            { count: messageCount }
        ),
    }
}

// 分组数据
export const groupMock = {
    code: 200,
    data: faker.helpers.multiple(
        (_, index) => ({
            id: index + 2,
            name: faker.word.adjective(),
            count: faker.number.int({ min: 0, max: 100 }),
            moment: faker.date.recent({ days: 30 }).toISOString().replace('T', ' ') .slice(0, 19),
        }),
        { count: 8 }
    )
}