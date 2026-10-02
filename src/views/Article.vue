<template>
    <Tabs value="tab1">
        <TabList
            :pt="{
                activeBar: {
                    class: 'w-[calc(var(--px-active-bar-width)-10px)]! h-[calc(var(--px-active-bar-height)-16px)]! left-[calc(var(--px-active-bar-left)+5px)]! top-[calc(var(--px-active-bar-top)+8px)]! bg-surface-100! dark:bg-surface-800! rounded-md! transition-[left,width]! duration-200!'
                }
            }"
        >
            <Tab v-for="tab in tabs" :key="tab.id" :value="tab.id" class="z-10">{{ tab.title }}</Tab>
        </TabList>
        <TabPanels>
            <TabPanel v-for="tab in tabs" :key="tab.id" :value="tab.id">
                <h2 class="text-lg font-bold">{{ tab.title }}</h2>
                <p class="text-surface-500 mt-1">{{ tab.content }}</p>
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>

<script setup>
import { ref } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

const tabs = ref([
    { id: 'tab1', title: 'Account Info', content: 'Update your personal information such as name, email address, and profile picture.' },
    { id: 'tab2', title: 'Payment', content: 'Manage your subscription plan, view invoices, and update your payment method.' },
    { id: 'tab3', title: 'Preferences', content: 'Customize how the application looks and behaves to match your personal preferences.' }
]);
</script>