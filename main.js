const {app, autoUpdater, dialog, BrowserWindow} = require('electron');

const url = `https://github.com/juniorHotes/electron-autoupdate.git`
autoUpdater.setFeedURL({ url })

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html', {
    userAgent: 'foo'
  });
});

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }
dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
