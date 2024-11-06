import { Data } from './types';

export class MoodWidget {
	private bgElement!: HTMLDivElement;
	private captionElement!: HTMLHeadingElement;
	private appElement!: HTMLDivElement;
	private moodsWrapperElement!: HTMLDivElement;
	private volumeElement!: HTMLInputElement;
	private audios: HTMLAudioElement[] = [];
	private icons: HTMLImageElement[] = [];
	private volume: number = 50;
	private playingIndex: number = 0;
	constructor(private data: Data) {
		this.init(this.data);
	}

	private setPlayingIndex(index: number) {
		this.playingIndex = index;
	}

	private setVolume(volume: string) {
		this.volume = Number(volume) / 100;
		this.audios.forEach(audio => (audio.volume = Number(volume) / 100));
	}

	private init(data: Data) {
		this.bgElement = document.createElement('div');
		this.bgElement.id = 'bg';
		this.captionElement = document.createElement('h3');
		this.captionElement.id = 'caption';
		this.captionElement.textContent = 'Weather sounds';
		this.appElement = document.createElement('div');
		this.appElement.id = 'app';
		this.moodsWrapperElement = document.createElement('div');
		this.moodsWrapperElement.id = 'moodsWrapper';
		this.volumeElement = document.createElement('input');
		this.volumeElement.type = 'range';
		this.volumeElement.value = `${this.volume}`;
		this.volumeElement.id = 'moodVolume';

		this.volumeElement.oninput = ({ target }) =>
			this.setVolume((<HTMLInputElement>target).value);

		data.moods.forEach((mood, index) => {
			const moodBlock = document.createElement('div');
			moodBlock.classList.add('moodItem');
			moodBlock.dataset.index = `${index}`;
			moodBlock.style.backgroundImage = `url("${mood.image}")`;

			moodBlock.onclick = () => {
				if (this.playingIndex === index) {
					if (this.audios[index].paused) {
						this.audios[index].play();
						this.icons[index].src = data.pauseIcon;
					} else {
						this.audios[index].pause();
						this.icons[index].src = <string>mood.icon;
					}
					this.setPlayingIndex(index);
				} else if (this.playingIndex !== index) {
					this.audios[this.playingIndex].pause();
					this.icons[this.playingIndex].src = <string>mood.icon;
					this.audios[index].currentTime = 0;
					this.audios[index].play();
					this.icons[index].src = data.pauseIcon;
					this.setPlayingIndex(index);
					this.bgElement.style.backgroundImage = `url("${mood.image}")`;
				}
			};

			const icon = document.createElement('img');
			this.icons.push(icon);
			icon.src = <string>mood.icon;
			icon.classList.add('icon');

			const audio = document.createElement('audio');
			this.audios.push(audio);
			audio.src = mood.sound;
			audio.classList.add('moodSound');
			audio.dataset.index = `${index}`;

			moodBlock.append(icon);
			moodBlock.append(audio);
			this.moodsWrapperElement.append(moodBlock);
		});

		this.setVolume(`${this.volume}`);
		this.appElement.append(this.moodsWrapperElement);
		this.appElement.append(this.volumeElement);
		this.bgElement.style.backgroundImage = `url("${data.moods[0].image}")`;
	}

	render() {
		document.body.append(this.bgElement, this.captionElement, this.appElement);
	}
}
