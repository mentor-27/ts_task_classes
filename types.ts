export type Mood = {
	image: string;
	sound: string;
	icon?: string;
};

export type Data = {
	moods: Mood[];
	pauseIcon: string;
};
