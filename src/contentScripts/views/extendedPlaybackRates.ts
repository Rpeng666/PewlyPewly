import { settings } from '~/logic'
import { runWhenIdle } from '~/utils/lazyLoad'

export function setupExtendedPlaybackRates() {
  const speeds = [3.0, 4.0, 5.0]
  let observer: MutationObserver | null = null

  const injectSpeeds = () => {
    const menu = document.querySelector('.bpx-player-ctrl-playbackrate-menu')
    if (!menu)
      return

    // Check if already injected
    if (menu.querySelector('[data-value="3.0"]'))
      return

    const firstItem = menu.querySelector('li')
    if (!firstItem)
      return

    speeds.forEach((speed) => {
      const li = firstItem.cloneNode(true) as HTMLLIElement
      li.dataset.value = speed.toFixed(1)
      li.innerText = `${speed.toFixed(1)}x`
      li.classList.remove('bpx-state-active') // Ensure not active by default

      li.onclick = (e) => {
        e.stopPropagation()
        const video = document.querySelector('video')
        if (video) {
          video.playbackRate = speed
          // Update active state in menu
          menu.querySelectorAll('li').forEach(item => item.classList.remove('bpx-state-active'))
          li.classList.add('bpx-state-active')
          // Update the displayed rate on the button
          const result = document.querySelector('.bpx-player-ctrl-playbackrate-result')
          if (result)
            result.textContent = `${speed.toFixed(1)}x`
        }
      }

      // Insert at the top
      menu.insertBefore(li, menu.firstChild)
    })
  }

  const init = () => {
    if (observer)
      observer.disconnect()

    observer = new MutationObserver(() => {
      injectSpeeds()
    })

    // Observe the player container or body for the menu creation
    // The menu might be created only when hovered, or it might exist but be hidden.
    // Usually it's inside .bpx-player-ctrl-playbackrate
    const playerContainer = document.querySelector('#bilibili-player') || document.body
    observer.observe(playerContainer, { childList: true, subtree: true })
    
    // Try to inject immediately in case it's already there
    injectSpeeds()
  }

  watch(
    () => settings.value.enableExtendedPlaybackSpeeds,
    (enabled) => {
      if (enabled) {
        runWhenIdle(init)
      }
      else {
        if (observer) {
          observer.disconnect()
          observer = null
        }
        // Remove injected items
        const menu = document.querySelector('.bpx-player-ctrl-playbackrate-menu')
        if (menu) {
          speeds.forEach((speed) => {
            const item = menu.querySelector(`[data-value="${speed.toFixed(1)}"]`)
            if (item)
              item.remove()
          })
        }
      }
    },
    { immediate: true },
  )
}
