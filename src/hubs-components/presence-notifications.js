AFRAME.registerSystem("presence-notifications", {
  init: function () {
    // Set up notification permissions
    Notification.requestPermission().catch(() => console.warn("Notification permissions denied"))

    // Monitor presence activity
    APP.messageDispatch.addEventListener("message", (e) => {
      if (e.detail.type === "entered") {
        this.notify(`${e.detail.name} entered the room`)
      } else if (e.detail.type === "leave") {
        this.notify(`${e.detail.name} left the room`)
      } else if (e.detail.type === "display_name_changed") {
        this.notify(`${e.detail.oldName} is now known as ${e.detail.newName}`)
      }
    })
  },
  notify: function (body) {
    console.log(`Notification: ${body}`)
    if (Notification.permission === "granted") {
      new Notification("Hubs Room", { icon: "https://hubs.aelatgt.net/favicon.ico", body })
    }
  },
})
