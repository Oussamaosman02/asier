'use strict'

self.addEventListener('push', function (event) {
  const URI = 'https://asier-webpush-project.vercel.app'
  const data = JSON.parse(event.data.text())
  event.waitUntil(
    registration.showNotification(data.title, {
      body: data.message,
      icon: '/icons/icon.png',
      badge: '/icons/notis.png',
      actions: [
        {
          action: 'tarea-action',
          title: 'Ver'
        }
      ],
      data: {
        url: `${URI}/app`
      },
      vibrate: [
        100,
        200,
        100,
        100,
        75,
        25,
        100,
        200,
        100,
        500,
        100,
        200,
        100,
        500
      ],
      requireInteraction: true,
      timestamp: data.time
    })
  )
})

self.addEventListener('notificationclick', function (e) {
  e.notification.close()
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientsArr => {
      // If a Window tab matching the targeted URL already exists, focus that;
      const hadWindowToFocus = clientsArr.some(windowClient =>
        windowClient.url === e.notification.data.url
          ? (windowClient.focus(), true)
          : false
      )
      // Otherwise, open a new tab to the applicable URL and focus it.
      if (!hadWindowToFocus) {
        clients
          .openWindow(e.notification.data.url)
          .then(windowClient => (windowClient ? windowClient.focus() : null))
      }
    })
  )
})
