import { defineStore } from "pinia";

const DARK_CLASS = 'my-app-dark';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        // 以 DOM 上的 my-app-dark 类作为唯一事实来源，初始化时同步一次
        isDark: typeof document !== 'undefined'
            ? document.documentElement.classList.contains(DARK_CLASS)
            : false,
    }),
    actions: {
        toggle() {
            this.isDark = !this.isDark;
            document.documentElement.classList.toggle(DARK_CLASS, this.isDark);
        },
        setDark(value: boolean) {
            this.isDark = value;
            document.documentElement.classList.toggle(DARK_CLASS, value);
        },
    },
});
