const buttons = document.querySelectorAll<HTMLButtonElement>(
	'[data-project-filter]',
);
const projects = document.querySelectorAll<HTMLElement>(
	'[data-project-system]',
);
for (const button of buttons) {
	button.addEventListener('click', () => {
		const filter = button.dataset.projectFilter;
		for (const other of buttons)
			other.setAttribute('aria-pressed', String(other === button));
		for (const project of projects) {
			project.hidden =
				filter !== 'all' && project.dataset.projectSystem !== filter;
			if (!project.hidden) project.setAttribute('data-revealed', '');
		}
	});
}
export {};
