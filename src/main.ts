import {
	App,
	Editor,
	MarkdownView,
	MarkdownFileInfo,
	Modal,
	Notice,
	Plugin,
} from 'obsidian';
import {
	DEFAULT_SETTINGS,
	CmptrSampleSettings,
	CmptrSampleSettingTab,
} from './settings';

export default class CmptrSamplePlugin extends Plugin {
	settings!: CmptrSampleSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('dice', 'Show greeting', (_evt: MouseEvent) => {
			new Notice(this.settings.greeting);
		});

		this.addCommand({
			id: 'open-greeting-modal',
			name: 'Open greeting modal',
			callback: () => {
				new GreetingModal(this.app, this.settings.greeting).open();
			},
		});

		this.addCommand({
			id: 'insert-greeting',
			name: 'Insert greeting at cursor',
			editorCallback: (
				editor: Editor,
				_ctx: MarkdownView | MarkdownFileInfo,
			) => {
				editor.replaceSelection(this.settings.greeting);
			},
		});

		this.addSettingTab(new CmptrSampleSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<CmptrSampleSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class GreetingModal extends Modal {
	private readonly greeting: string;

	constructor(app: App, greeting: string) {
		super(app);
		this.greeting = greeting;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText(this.greeting);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
