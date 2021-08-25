const { app, BrowserWindow, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const { customMenu } = require('./src/components/menu');
const constants = require('./src/utils/constants');
const api = require('./src/api/index');

function createWindow() {
	const main = new BrowserWindow({
		title: constants.APP_NAME,
		width: 600,
		height: 400,
		webPreferences: {
			preload: path.join(__dirname, './src/preload.js'),
			devTools: !app.isPackaged,
			disableHtmlFullscreenWindowResize: true,
		},
		maximizable: false,
	});

	Menu.setApplicationMenu(Menu.buildFromTemplate(customMenu()));
	main.loadFile('./src/view/index.html');
	api.init(main);
}

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 * Some APIs can only be used after this event occurs.
 */
app.whenReady().then(() => {
	createWindow();

	autoUpdater.checkForUpdatesAndNotify();

	/**
	 * On macOS it's common to re-create a window in the app when the
	 * dock icon is clicked and there are no other windows open.
	 */
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

/**
 * Quit when all windows are closed, except on macOS. There, it's common
 * for applications and their menu bar to stay active until the user quits
 * explicitly with Cmd + Q.
 */
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});
