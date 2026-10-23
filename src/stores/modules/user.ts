import { defineStore } from 'pinia';
import type { LoginForm, RegisterForm, UserData } from '@/types/modules/user';
import { userMock } from '@/mock/userMock';

const TOKEN_KEY = 'blog_token';
const USER_KEY = 'blog_user';

function readUser(): UserData | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as UserData;
    } catch {
        return null;
    }
}

function readToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export const useUserStore = defineStore('user', {
    state: () => ({
        token: readToken(),
        userInfo: readUser() as UserData | null,
    }),
    getters: {
        isLogin: (state) => !!state.token && !!state.userInfo, //任意值转布尔值
    },
    actions: {
        // 登录（mock：从 userMock 校验用户名密码）
        login(form: LoginForm): Promise<void> {
            return new Promise((resolve, reject) => {
                const user = userMock.data.list.find(
                    (u) => u.username === form.username && u.password === form.password
                );
                if (!user) {
                    reject(new Error('用户名或密码错误'));
                    return;
                }
                const { password: _pwd, ...safeUser } = user;
                this.token = `mock-token-${user.id}-${Date.now()}`;
                this.userInfo = safeUser;
                localStorage.setItem(TOKEN_KEY, this.token);
                localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
                resolve();
            });
        },

        // 注册（mock：校验用户名唯一后写入）
        register(form: RegisterForm): Promise<void> {
            return new Promise((resolve, reject) => {
                const exists = userMock.data.list.some((u) => u.username === form.username);
                if (exists) {
                    reject(new Error('用户名已被注册'));
                    return;
                }
                const newUser: UserData & { password: string } = {
                    id: userMock.data.list.length,
                    username: form.username,
                    nickname: form.nickname || form.username,
                    email: form.email,
                    avatar: 'https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png',
                    moment: new Date().toISOString().replace('T', ' ').slice(0, 19),
                    password: form.password,
                };
                userMock.data.list.push(newUser);

                // 注册成功后自动登录
                const { password: _pwd, ...safeUser } = newUser;
                this.token = `mock-token-${newUser.id}-${Date.now()}`;
                this.userInfo = safeUser;
                localStorage.setItem(TOKEN_KEY, this.token);
                localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
                resolve();
            });
        },

        // 退出登录
        logout() {
            this.token = null;
            this.userInfo = null;
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        },
    },
});
