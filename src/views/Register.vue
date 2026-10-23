<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputPassword from 'primevue/inputpassword';

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import UserPlus from '@primeicons/vue/user-plus';
import { useUserStore } from '@/stores/modules/user';

const router = useRouter();
const userStore = useUserStore();
const toast = useToast();

const username = ref('');
const nickname = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);

const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const submit = async () => {
    if (!username.value.trim()) {
        toast.add({ severity: 'warn', summary: '提示', detail: '请输入用户名', life: 3000 });
        return;
    }
    if (!nickname.value.trim()) {
        toast.add({ severity: 'warn', summary: '提示', detail: '请输入昵称', life: 3000 });
        return;
    }
    if (!email.value.trim() || !emailReg.test(email.value.trim())) {
        toast.add({ severity: 'warn', summary: '提示', detail: '请输入正确的邮箱地址', life: 3000 });
        return;
    }
    if (password.value.length < 6) {
        toast.add({ severity: 'warn', summary: '提示', detail: '密码至少 6 位', life: 3000 });
        return;
    }
    if (password.value !== confirmPassword.value) {
        toast.add({ severity: 'warn', summary: '提示', detail: '两次输入的密码不一致', life: 3000 });
        return;
    }

    loading.value = true;
    try {
        await userStore.register({
            username: username.value.trim(),
            nickname: nickname.value.trim(),
            email: email.value.trim(),
            password: password.value,
            confirmPassword: confirmPassword.value,
        });
        toast.add({ severity: 'success', summary: '注册成功', detail: '已自动登录', life: 3000 });
        setTimeout(() => router.push('/'), 600);
    } catch (e) {
        toast.add({ severity: 'error', summary: '注册失败', detail: (e as Error).message, life: 3000 });
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-sky-50 dark:bg-gray-900 px-4 py-8">
        <div class="w-full max-w-md">
            <!-- 注册卡片 -->
            <div class="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm p-8 space-y-5">
                <div class="text-center text-2xl font-bold text-gray-900 dark:text-white">注册博客</div>
                <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">用户名</label>
                    <InputText v-model="username" class="w-full" placeholder="请输入用户名" autocomplete="username" />
                </div>
                <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">昵称</label>
                    <InputText v-model="nickname" class="w-full" placeholder="请输入昵称" />
                </div>
                <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">邮箱</label>
                    <InputText v-model="email" class="w-full" placeholder="请输入邮箱" autocomplete="email" />
                </div>
                <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">密码</label>
                    <InputPassword v-model="password" class="w-full" placeholder="至少 6 位" :feedback="false" toggle-mask
                        autocomplete="new-password" />
                </div>
                <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">确认密码</label>
                    <InputPassword v-model="confirmPassword" class="w-full" placeholder="再次输入密码" :feedback="false"
                        toggle-mask autocomplete="new-password" @keyup.enter="submit" />
                </div>
                <Button severity="primary" class="w-full" :loading="loading" @click="submit">
                    注册
                </Button>
                <div class="text-center text-sm text-muted-color">
                    已有账号？
                    <span class="text-[#007bff] cursor-pointer hover:underline" @click="router.push({ name: 'login' })">
                        去登录
                    </span>
                </div>
            </div>
        </div>
        <Toast />
    </div>
</template>

<style scoped lang="less">
</style>
