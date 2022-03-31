import { app, BrowserWindow } from 'electron'

async function onInit() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('../web/index.html')
}

async function onExit() {
  // do something...
}

app.whenReady().then(onInit)
app.on('window-all-closed', async () => {
  await onExit()
  app.quit()
})
