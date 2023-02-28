const cacheList = ['/webpush/']
const cacheName = `tstapp`
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install')
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName)
      console.log('[Service Worker] Caching all: app shell and content')
      await cache.addAll(cacheList)
    })()
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request)
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`)
      if (r) {
        return r
      }
      const response = await fetch(e.request)
      const cache = await caches.open(cacheName)
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`)
      cache.put(e.request, response.clone())
      return response
    })()
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return
          }
          return caches.delete(key)
        })
      )
    })
  )
})

self.addEventListener('message', (e) => {
  if (e.data.test === `tstt`) {
    setTimeout(() => {
      self.registration.showNotification(`8MILES`, {
        body: `8000 milliseconds went by like drops in a river, dun you think?`
      })
    }, 8000)
  }
  console.log('GOTMSGGGG2', e)
  self.clients
    .matchAll({
      includeControlled: true,
      type: `window`
    })
    .then((clients) => {
      console.log('NEXTLOGG', clients)
      if (clients[0]) {
        const rand = Math.floor(Math.random() * 5)
        console.log('NR', rand)
        const color = getColor(rand)
        const client = clients[0]
        console.log('CLIENT', client)
        client.postMessage({
          sender: `appsw`,
          color: color
        })
      }
    })
})

function getColor(nr) {
  const calc = nr % 5

  let color
  switch (calc) {
    case 1:
      color = `#ffffff`
      break
    case 2:
      color = `#cc333b`
      break
    case 3:
      color = `#f8b533`
      break
    case 4:
      color = `#424242`
      break
    default:
      color = `#de21uu`
      break
  }
  return color
}
