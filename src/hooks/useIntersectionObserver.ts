import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue';

/**
 * 监听目标元素进入/离开视口。
 * 相比手动监听 scroll + 计算 scrollTop，IntersectionObserver 由浏览器在合成器线程判断"是否可见"，
 * 不受亚像素布局、系统缩放、节流采样等影响，判断更可靠。
 *
 * @param targetRef  目标元素 ref（可为空；元素晚于挂载才就绪时，watch 到后自动补观察）
 * @param onEnter    目标进入视口时触发（可选）
 * @param onLeave    目标离开视口时触发（可选）
 * @param options    IntersectionObserver 配置（threshold / root / rootMargin）
 * @returns 手动控制方法 { observe, unobserve }
 */
export default function useIntersectionObserver(
    targetRef: Ref<HTMLElement | undefined>,
    onEnter?: (entry: IntersectionObserverEntry) => void,
    onLeave?: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = {},
) {
    let observer: IntersectionObserver | null = null;

    const callback: IntersectionObserverCallback = (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                onEnter?.(entry);
            } else {
                onLeave?.(entry);
            }
        }
    };

    const observe = () => {
        const el = targetRef.value;
        if (el && observer) {
            observer.observe(el);
        }
    };

    const unobserve = () => {
        const el = targetRef.value;
        if (el && observer) {
            observer.unobserve(el);
        }
    };

    onMounted(() => {
        observer = new IntersectionObserver(callback, options);
        observe();
    });

    // 目标元素晚于挂载才就绪时（如 v-if 条件渲染），就绪后自动补观察
    watch(targetRef, (el) => {
        if (el && observer) {
            observer.observe(el);
        }
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        observer = null;
    });

    return { observe, unobserve };
}
