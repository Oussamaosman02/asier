"use strict";

self.addEventListener("push", function (event) {
  const URI = "https://asier-webpush-project.vercel.app";
  const data = JSON.parse(event.data.text());
  event.waitUntil(
    registration.showNotification(data.title, {
      body: data.message,
      icon: "/icons/android-chrome-192x192.png",
      badge: "/icons/icons.png",
      actions: [
        {
          action: "tarea-action",
          title: "Ver",
          icon: "/icons/ver.png",
        },
      ],
      data: {
        url: `${URI}/demo`,
      },
      vibrate: [
        500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110,
        170, 40, 500,
      ],
      requireInteraction: true,
    })
  );
});

self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window" }).then((clientsArr) => {
      // If a Window tab matching the targeted URL already exists, focus that;
      const hadWindowToFocus = clientsArr.some((windowClient) =>
        windowClient.url === e.notification.data.url
          ? (windowClient.focus(), true)
          : false
      );
      // Otherwise, open a new tab to the applicable URL and focus it.
      if (!hadWindowToFocus)
        clients
          .openWindow(e.notification.data.url)
          .then((windowClient) => (windowClient ? windowClient.focus() : null));
    })
  );
});
