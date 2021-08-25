const { contextBridge, ipcRenderer } = require('electron');

/**
 * API/Function allowed from the renderer process
 */
contextBridge.exposeInMainWorld('myAPI', {
	chooseFolder: () => ipcRenderer.invoke('choose-folder'),
	viewDemo: () => ipcRenderer.invoke('view-demo'),
});
