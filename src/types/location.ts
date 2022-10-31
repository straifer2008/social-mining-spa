
export type CountryItem = {
	id: number;
	name: string;
}

export type CountriesResponse = {
	message: string;
	data: CountryItem[];
}
