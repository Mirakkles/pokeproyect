import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  // Load React app in development or production
  mainWindow.loadURL(
    process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../build/index.html')}`
  );

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// Quit the app when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Recreate the window if the app is activated (macOS)
app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
      },
    });
    mainWindow.loadURL(
      process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../build/index.html')}`
    );
  }
});
