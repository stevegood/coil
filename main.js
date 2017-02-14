const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win

const createWindow = (win) => {
  win = new BrowserWindow({
    width: 174,
    height: 174,
    resizable: false,
    frame: false
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('closed', () => {
    win = null
  })

  return win
}

app.on('ready', () => {
  win = createWindow(win)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!win) {
    win = createWindow(win)
  }
})

app.commandLine.appendSwitch('--enable-viewport-meta', 'true')
