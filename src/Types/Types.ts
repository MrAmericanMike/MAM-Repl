export type WeatherResponse = {
	error?: string;
	main?: Object;
	details?: Object;
};

export type Cost = {
	amount?: number;
	currency?: string;
};

export type Expense = {
	_id: string;
	channel: string;
	expenses: string[];
};

export type Flight = {
	icon: Icon;
	text: string;
	callsign: string;
	model: string;
	airline: string;
	origin_airport: string;
	origin_country: string;
	origin_city: string;
	landing_time: number;
	type: "Estimated" | "Scheduled" | null;
};

export type Icon = "red" | "green" | "yellow";

export type Hashtags = {
	[key: string]: string;
};
