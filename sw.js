self.addEventListener('install', (event) => {
  console.log(`Serviceeeee worker installed, details:,`, event)
})

self.addEventListener('message', (e) => {
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
