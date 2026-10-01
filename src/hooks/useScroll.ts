import { onMounted, onUnmounted, ref, type Ref, } from "vue"
import { throttle } from 'underscore'

export default function useScroll(elRef?: Ref<HTMLElement>) {
  let el: Window | HTMLElement = window

  const reachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollHeight = ref(0)
  const scrollTop = ref(0)

  
  const handleScroll = throttle(() => {
    if(el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollHeight.value = document.documentElement.scrollHeight
      scrollTop.value = document.documentElement.scrollTop
    }
    else {
      const htmlEl = el as HTMLElement
      clientHeight.value = htmlEl.clientHeight
      scrollHeight.value = htmlEl.scrollHeight
      scrollTop.value = htmlEl.scrollTop
    }
    if(clientHeight.value + scrollTop.value >= scrollHeight.value) {
        reachBottom.value = true
    }
  }, 300)

  onMounted(() => {
    if(elRef) el = elRef.value
    el.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    el.removeEventListener('scroll', handleScroll)
  })

  return { reachBottom, clientHeight, scrollHeight, scrollTop }
}