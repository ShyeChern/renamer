const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs/promises');
const path = require('path');
const constants = require('../utils/constants');
const { shuffleArray } = require('../utils/functions');

/**
 * Return ipcMain function that can invoke from renderer process
 * @param {BrowserWindow} mainWindow parent browser window
 * @return {ipcMain} ipcMain function
 */
module.exports.init = (mainWindow) => {
	// Open choose folder dialog and rename files for selected folder
	ipcMain.handle('choose-folder', async () => {
		try {
			const folder = await dialog.showOpenDialog({
				buttonLabel: 'Select Directory',
				defaultPath: app.getPath('desktop'),
				properties: ['openDirectory'],
			});

			if (!folder.canceled) {
				// get the length
				const dirPath = folder.filePaths[0];
				let files = await fs.readdir(folder.filePaths[0]);
				files = shuffleArray(files);
				// get maximum digit
				const prefixLength = files.length.toString().length;

				await Promise.all(
					files.map(async (file, index) => {
						// prefix start with 001. filename , 002. filename
						const newFilename = `${(index + 1).toString().padStart(prefixLength, '0')}. ${file}`;
						return await fs.rename(path.join(dirPath, file), path.join(dirPath, newFilename));
					})
				);

				dialog.showMessageBox({
					title: constants.APP_NAME,
					type: 'info',
					message: 'Rename successfully.',
				});
			}
		} catch (e) {
			fs.appendFile('error.log', `${new Date().toISOString()} ${e.stack.toString()}\n`);
			dialog.showMessageBox({
				title: constants.APP_NAME,
				type: 'error',
				message: 'Something error',
			});
		}
	});

	// Open new browser window to show demo
	ipcMain.handle('view-demo', async () => {
		const demo = new BrowserWindow({
			parent: mainWindow,
			modal: true,
			minimizable: false,
			maximizable: false,
			resizable: false,
			width: 400,
			height: 400,
		});
		demo.setMenu(null);
		demo.loadFile('./src/assets/gif/demo.gif');
	});
};
