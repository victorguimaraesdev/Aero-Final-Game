import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "url";
import { isDev } from "./utils.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
  const win = new BrowserWindow({
    icon: "./public/invader.png",
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      sandbox: false,
      preload: path.join(__dirname, "preload.cjs"),
    },

    height: 800,
    width: 800,
    minHeight: 800,
    minWidth: 800,
    fullscreen: false,
  });

  isDev()
    ? win.loadURL("http://localhost:5173/")
    : win.loadFile(path.join(__dirname, "../index.html"));

  ipcMain.on("minimizar", () => {
    win.minimize();
  });

  ipcMain.on("maximizar", () => {
    if (win.isFullScreen()) {
      win.setFullScreen(false);
      win.webContents.send("telacheia", false);
    } else {
      win.setFullScreen(true);
      win.webContents.send("telacheia", true);
    }
  });

  ipcMain.on("fechar", () => {
    win.close();
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
