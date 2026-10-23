export type UserData = {
    id: number;
    username: string;   // 登录账号
    nickname: string;   // 昵称
    email: string;
    avatar: string;     // 头像地址
    moment: string;     // 注册时间
}

export type LoginForm = {
    username: string;
    password: string;
}

export type RegisterForm = {
    username: string;
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
}
