import { faker } from '@faker-js/faker';

// 菜单数据
export const menuMock = {
    code: 200,
    data: {
        file: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }) + 'M',
        article: faker.number.int({ min: 0, max: 100 }),
        gallery: faker.number.int({ min: 0, max: 100 }),
        diary: faker.number.int({ min: 0, max: 100 }),
    }
}

// 折线图数据
export const lineChartMock = {
    code: 200,
    data: faker.helpers.multiple(
        () => ({
            date: faker.date.recent({ days: 30 }).toISOString().slice(5, 10),
            count: faker.number.int({ min: 0, max: 100 }),
        }),
        { count: 30 }
    )
}

// 饼图数据
export const pieChartMock = {
    code: 200,
    data: {
        device: [
            {
                key: 'pc',
                name: '电脑端',
                value: faker.number.int({ min: 0, max: 100 }),
            },
            {
                key: 'mobile',
                name: '移动端',
                value: faker.number.int({ min: 0, max: 100 }),
            },
        ],
        website: [
            {
                key: 'home',
                name: '首页',
                value: faker.number.int({ min: 0, max: 100 }),
            },
            {
                key: 'project',
                name: '项目',
                value: faker.number.int({ min: 0, max: 100 }),
            },
            {
                key: 'diary',
                name: '日记',
                value: faker.number.int({ min: 0, max: 100 }),
            },
            {
                key: 'photo',
                name: '摄影',
                value: faker.number.int({ min: 0, max: 100 }),
            },
            
        ],
    }
}

// 评论数据
const commentCount = faker.number.int({ min: 0, max: 100 });
export const commentMock = {
    code: 200,
    data: {
        count: commentCount,
        list: faker.helpers.multiple(
            (_, index) => ({
                id: index,
                atricle: {
                    id: faker.number.int({ min: 0, max: 1000 }),
                    title: faker.lorem.sentence({ min: 3, max: 5 }),
                },
                user: {
                    id: faker.number.int({ min: 0, max: 1000 }),
                    name: faker.internet.username(),
                    avatar: faker.image.avatar(),
                },
                content: faker.lorem.sentence({ min: 5, max: 10 }),
                moment: faker.date.recent({ days: 30 }).toISOString().replace('T', ' ') .slice(0, 19),
                complaint: faker.number.int({ min: 0, max: 20 }),
            }),
            { count: commentCount }
        ),
    },
}

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