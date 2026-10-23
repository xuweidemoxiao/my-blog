import type { UserData } from '@/types/modules/user';

// 模拟已注册用户（后端就绪后改为真实接口）
export const userMock: {
    code: number;
    data: {
        list: (UserData & { password: string })[];
    };
} = {
    code: 200,
    data: {
        list: [
            {
                id: 0,
                username: 'admin',
                nickname: '管理员',
                email: 'admin@blog.com',
                avatar: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
                moment: '2026-01-01 00:00:00',
                password: '123456',
            },
            {
                id: 1,
                username: 'demo',
                nickname: '演示用户',
                email: 'demo@blog.com',
                avatar: 'https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png',
                moment: '2026-02-15 10:30:00',
                password: '123456',
            },
        ],
    },
};
