import { defineStore } from "pinia";
import type { GroupData, Messages } from "@/types/index";

export const useMainStore = defineStore('main', {
    state: () => ({
        groupList: [
            { id: -2, name: '全部', count: 0, moment: '' },
            { id: -1, name: '未分组', count: 0, moment: '' },     
        ] as GroupData[],
        messageList: {} as Messages,
    }),
    getters: {
        sortedMessageList: (state) => state.messageList.list.sort((a, b) => new Date(b.moment).getTime() - new Date(a.moment).getTime()),
    },
    actions: {
        // 删除消息
        deleteMessage(id: number) {
            this.messageList.list = this.messageList.list.filter((item) => item.id !== id);
            this.messageList.count!--;
        },

        /* 分组相关 */
        // 创建分组
        createGroup(name: string) {
            this.groupList.push({
                id: this.groupList.length,
                name,
                count: 0,
                moment: new Date().toISOString().replace('T', ' ') .slice(0, 19),
            });
        },

        // 重命名分组
        renameGroup(id: number, newName: string) {
            if (id < 0) return; 
            const group = this.groupList.find(g => g.id === id);
            if (group && newName !== group.name) {
                group.name = newName.trim();
            }
        },

        // 删除分组
        deleteGroup(id: number) {
            if (id < 0) return; 
            this.groupList = this.groupList.filter(g => g.id !== id);
        }
    }
})


