<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputPassword from 'primevue/inputpassword';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import User from '@primeicons/vue/user';
import { useUserStore } from '@/stores/modules/user';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const toast = useToast();

const username = ref('');
const password = ref('');
const loading = ref(false);

const submit = async () => {
    if (!username.value.trim()) {
        toast.add({ severity: 'warn', summary: '提示', detail: '请输入用户名', life: 3000 });
        return;
    }
    if (!password.value) {
        toast.add({ severity: 'warn', summary: '提示', detail: '请输入密码', life: 3000 });
        return;
    }
    loading.value = true;
    try {
        await userStore.login({ username: username.value.trim(), password: password.value });
        toast.add({ severity: 'success', summary: '登录成功', detail: `欢迎回来，${userStore.userInfo?.nickname}`, life: 3000 });
        const redirect = route.query.redirect as string | undefined;
        setTimeout(() => router.push(redirect || '/'), 600);
    } catch (e) {
        toast.add({ severity: 'error', summary: '登录失败', detail: (e as Error).message, life: 3000 });
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-sky-50 dark:bg-gray-900 px-4">
        <div class="w-full max-w-md">
            <!-- 登录卡片 -->
            <div class="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm p-8 space-y-5">
                <div class="text-center text-2xl font-bold text-gray-900 dark:text-white">登录博客</div>
                <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">用户名</label>
                    <InputText v-model="username" class="w-full" placeholder="请输入用户名" autocomplete="username"
                        @keyup.enter="submit" />
                </div>
                <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">密码</label>
                    <InputPassword v-model="password" class="w-full" placeholder="请输入密码" :feedback="false" toggle-mask
                        autocomplete="current-password" @keyup.enter="submit" />
                </div>
                <Button severity="primary" class="w-full" :loading="loading" @click="submit">
                    登录
                </Button>
                <div class="text-center text-sm text-muted-color">
                    还没有账号？
                    <span class="text-[#007bff] cursor-pointer hover:underline" @click="router.push({ name: 'register' })">
                        立即注册
                    </span>
                </div>
            </div>
        </div>
        <Toast />
    </div>
</template>

<style scoped lang="less">
</style>
