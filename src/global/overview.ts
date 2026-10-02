import Home from '@primeicons/vue/home';
import File from '@primeicons/vue/file';
import Book from '@primeicons/vue/book';
import Camera from '@primeicons/vue/camera';
import Pencil from '@primeicons/vue/pencil';
import Cog from '@primeicons/vue/cog';

// 菜单
export const menuIcon = [
    {
        name: '总览',
        icon: Home,
        path: '/overview',
    },
    {
        name: '本地文件',
        icon: File,
        path: '/file',
    },
    {
        name: '博客文章',
        icon: Book,
        path: '/article',
    },
    {
        name: '摄影图库',
        icon: Camera,
        path: '/gallery',
    },
    {
        name: '随笔随记',
        icon: Pencil,
        path: '/diary',
    },
    {
        name: '设置',
        icon: Cog,
        path: '/settings',
    },
]
    
// 总览菜单
export const overviewMenu = [
    {
        name: '本地文件',
        dataKey: 'file' as const,
        editPath: '',
        total: '0M',
        color: 'bg-blue-500',
        darkColor: 'dark:bg-blue-700',
    },
    {
        name: '博客文章',
        dataKey: 'article' as const,
        editPath: 'edit-article',
        total: 0,
        color: 'bg-red-200',
        darkColor: 'dark:bg-red-900',
    },
    {
        name: '摄影图库',
        dataKey: 'gallery' as const,
        editPath: 'edit-gallery',
        total: 0,
        color: 'bg-green-200',
        darkColor: 'dark:bg-green-700',
    },
    {
        name: '随笔随记',
        dataKey: 'diary' as const,
        editPath: 'edit-diary',
        total: 0,
        color: 'bg-yellow-200',
        darkColor: 'dark:bg-yellow-700',
    },
    
]
