const chooseFolderBtn = document.querySelector('.choose-folder-btn');
const viewDemoLink = document.querySelector('.view-demo');

chooseFolderBtn.addEventListener('click', () => {
	window.myAPI.chooseFolder();
});

viewDemoLink.addEventListener('click', () => {
	window.myAPI.viewDemo();
});
