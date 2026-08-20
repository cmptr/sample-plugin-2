import { App, PluginSettingTab, Setting } from 'obsidian';
import CmptrSamplePlugin from './main';

export interface CmptrSampleSettings {
	greeting: string;
}

export const DEFAULT_SETTINGS: CmptrSampleSettings = {
	greeting: 'Hello from the sandbox',
};

export class CmptrSampleSettingTab extends PluginSettingTab {
	plugin: CmptrSamplePlugin;

	constructor(app: App, plugin: CmptrSamplePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Greeting')
			.setDesc('Shown by the greeting modal and ribbon notice.')
			.addText((text) =>
				text
					.setPlaceholder('Enter a greeting')
					.setValue(this.plugin.settings.greeting)
					.onChange(async (value) => {
						this.plugin.settings.greeting = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
