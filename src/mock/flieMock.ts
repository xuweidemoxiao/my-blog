import { faker } from "@faker-js/faker";

const count = 300;
export const fileMock = {
    code: 200,
    data: {
        count,
        list: faker.helpers.multiple(
            (_, index) => {
                const fileName = faker.system.commonFileName(); 
                return {
                    id: index,
                    url: faker.image.url(),
                    fileName,                                    
                    format: fileName.split('.').pop() ?? '', // 提取后缀
                    subsetId: faker.number.int({ min: -1, max: 8 }),
                };
            },
            { count }
        ),
    }
}