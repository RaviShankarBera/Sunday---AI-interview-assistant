import { app, BrowserWindow, ipcMain, screen, desktopCapturer } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;
let overlayWindow: BrowserWindow | null = null;

const isDev = !app.isPackaged;

function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1100,
    minHeight: 700,
    title: 'Sunday',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.close();
    }
    overlayWindow = null;
  });
}

function createOverlayWindow(): void {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    overlayWindow.focus();
    return;
  }

  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  overlayWindow = new BrowserWindow({
    width: 400,
    height: 550,
    x: screenWidth - 420,
    y: 100,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: true,
    skipTaskbar: true,
    title: 'Sunday Overlay',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  overlayWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    overlayWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}#/overlay`);
  } else {
    overlayWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      { hash: '/overlay' },
    );
  }

  overlayWindow.once('ready-to-show', () => {
    overlayWindow?.show();
  });

  overlayWindow.on('closed', () => {
    overlayWindow = null;
  });
}

// IPC Handlers
ipcMain.handle('sunday:app:get-version', () => app.getVersion());

ipcMain.handle('sunday:overlay:show', () => {
  createOverlayWindow();
});

ipcMain.handle('sunday:overlay:hide', () => {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    overlayWindow.hide();
  }
});

ipcMain.handle('sunday:overlay:toggle', () => {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    if (overlayWindow.isVisible()) {
      overlayWindow.hide();
    } else {
      overlayWindow.show();
    }
  } else {
    createOverlayWindow();
  }
});

ipcMain.handle('sunday:audio:get-sources', async () => {
  const sources = await desktopCapturer.getSources({
    types: ['window', 'screen'],
    thumbnailSize: { width: 0, height: 0 },
  });
  return sources.map((s) => ({
    id: s.id,
    name: s.name,
    thumbnailDataURL: '',
  }));
});

ipcMain.handle('sunday:screen:get-sources', async () => {
  const sources = await desktopCapturer.getSources({
    types: ['window', 'screen'],
    thumbnailSize: { width: 320, height: 180 },
  });
  return sources.map((s) => ({
    id: s.id,
    name: s.name,
    thumbnailDataURL: s.thumbnail.toDataURL(),
  }));
});

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
