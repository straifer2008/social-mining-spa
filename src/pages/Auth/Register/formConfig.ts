import { FormConfigItem, InputTypes, Option } from 'types';

type FormConfigRegister = 'role' | 'firstName' | 'lastName' | 'email' | 'password' | 'passwordConfirm' |
	'gender' | 'birthDate' | 'countryId' | 'companyName' | 'companyProfile' | 'companyStaffQuantity';

const countries: Option<string | number>[] = [
	{
		"value": 253,
		"label":  "Abkhazia"
	},
	{
		"value": 102,
		"label":  "Australia"
	},
	{
		"value": 152,
		"label":  "Austria"
	},
	{
		"value": 34,
		"label":  "Azerbaijan"
	},
	{
		"value": 41,
		"label":  "Åland"
	},
	{
		"value": 46,
		"label":  "Albania"
	},
	{
		"value": 144,
		"label":  "Algeria"
	},
	{
		"value": 241,
		"label":  "American Samoa"
	},
	{
		"value": 196,
		"label":  "Anguilla"
	},
	{
		"value": 174,
		"label":  "Angola"
	},
	{
		"value": 159,
		"label":  "Andorra"
	},
	{
		"value": 248,
		"label":  "Antarctica"
	},
	{
		"value": 200,
		"label":  "Antigua and Barbuda"
	},
	{
		"value": 223,
		"label":  "Argentina"
	},
	{
		"value": 10,
		"label":  "Armenia"
	},
	{
		"value": 203,
		"label":  "Aruba"
	},
	{
		"value": 63,
		"label":  "Afghanistan"
	},
	{
		"value": 194,
		"label":  "Bahamas"
	},
	{
		"value": 65,
		"label":  "Bangladesh"
	},
	{
		"value": 178,
		"label":  "Barbados"
	},
	{
		"value": 22,
		"label":  "Bahrain"
	},
	{
		"value": 39,
		"label":  "Belarus"
	},
	{
		"value": 212,
		"label":  "Belize"
	},
	{
		"value": 153,
		"label":  "Belgium"
	},
	{
		"value": 129,
		"label":  "Benin"
	},
	{
		"value": 195,
		"label":  "Bermuda"
	},
	{
		"value": 45,
		"label":  "Bulgaria"
	},
	{
		"value": 225,
		"label":  "Bolivia"
	},
	{
		"value": 251,
		"label":  "Bonaire, Sint Eustatius, and Saba"
	},
	{
		"value": 173,
		"label":  "Bosnia and Herzegovina"
	},
	{
		"value": 55,
		"label":  "Botswana"
	},
	{
		"value": 187,
		"label":  "Brazil"
	},
	{
		"value": 72,
		"label":  "British Indian Ocean Territory"
	},
	{
		"value": 204,
		"label":  "British Virgin Islands"
	},
	{
		"value": 91,
		"label":  "Brunei"
	},
	{
		"value": 125,
		"label":  "Burkina Faso"
	},
	{
		"value": 31,
		"label":  "Burundi"
	},
	{
		"value": 69,
		"label":  "Bhutan"
	},
	{
		"value": 110,
		"label":  "Vanuatu"
	},
	{
		"value": 167,
		"label":  "Vatican City"
	},
	{
		"value": 148,
		"label":  "United Kingdom"
	},
	{
		"value": 44,
		"label":  "Hungary"
	},
	{
		"value": 218,
		"label":  "Venezuela"
	},
	{
		"value": 239,
		"label":  "U.S. Virgin Islands"
	},
	{
		"value": 240,
		"label":  "U.S. Minor Outlying Islands"
	},
	{
		"value": 99,
		"label":  "East Timor"
	},
	{
		"value": 82,
		"label":  "Vietnam"
	},
	{
		"value": 130,
		"label":  "Gabon"
	},
	{
		"value": 222,
		"label":  "Haiti"
	},
	{
		"value": 180,
		"label":  "Guyana"
	},
	{
		"value": 134,
		"label":  "Gambia"
	},
	{
		"value": 122,
		"label":  "Ghana"
	},
	{
		"value": 209,
		"label":  "Guadeloupe"
	},
	{
		"value": 214,
		"label":  "Guatemala"
	},
	{
		"value": 135,
		"label":  "Guinea"
	},
	{
		"value": 127,
		"label":  "Guinea-Bissau"
	},
	{
		"value": 154,
		"label":  "Germany"
	},
	{
		"value": 163,
		"label":  "Guernsey"
	},
	{
		"value": 133,
		"label":  "Gibraltar"
	},
	{
		"value": 215,
		"label":  "Honduras"
	},
	{
		"value": 90,
		"label":  "Hong Kong"
	},
	{
		"value": 210,
		"label":  "Grenada"
	},
	{
		"value": 184,
		"label":  "Greenland"
	},
	{
		"value": 30,
		"label":  "Greece"
	},
	{
		"value": 37,
		"label":  "Georgia"
	},
	{
		"value": 237,
		"label":  "Guam"
	},
	{
		"value": 146,
		"label":  "Denmark"
	},
	{
		"value": 161,
		"label":  "Jersey"
	},
	{
		"value": 13,
		"label":  "Djibouti"
	},
	{
		"value": 191,
		"label":  "Dominican Republic"
	},
	{
		"value": 28,
		"label":  "Egypt"
	},
	{
		"value": 12,
		"label":  "DR Congo"
	},
	{
		"value": 51,
		"label":  "Zambia"
	},
	{
		"value": 139,
		"label":  "Western Sahara"
	},
	{
		"value": 50,
		"label":  "Zimbabwe"
	},
	{
		"value": 24,
		"label":  "Israel"
	},
	{
		"value": 70,
		"label":  "India"
	},
	{
		"value": 84,
		"label":  "Indonesia"
	},
	{
		"value": 17,
		"label":  "Hashemite Kingdom of Jordan"
	},
	{
		"value": 4,
		"label":  "Iraq"
	},
	{
		"value": 6,
		"label":  "Iran"
	},
	{
		"value": 156,
		"label":  "Ireland"
	},
	{
		"value": 147,
		"label":  "Iceland"
	},
	{
		"value": 141,
		"label":  "Spain"
	},
	{
		"value": 169,
		"label":  "Italy"
	},
	{
		"value": 3,
		"label":  "Yemen"
	},
	{
		"value": 76,
		"label":  "Kazakhstan"
	},
	{
		"value": 211,
		"label":  "Cayman Islands"
	},
	{
		"value": 93,
		"label":  "Cambodia"
	},
	{
		"value": 116,
		"label":  "Cameroon"
	},
	{
		"value": 242,
		"label":  "Canada"
	},
	{
		"value": 21,
		"label":  "Qatar"
	},
	{
		"value": 11,
		"label":  "Kenya"
	},
	{
		"value": 7,
		"label":  "Cyprus"
	},
	{
		"value": 230,
		"label":  "Kiribati"
	},
	{
		"value": 89,
		"label":  "China"
	},
	{
		"value": 80,
		"label":  "Cocos [Keeling] Islands"
	},
	{
		"value": 220,
		"label":  "Colombia"
	},
	{
		"value": 52,
		"label":  "Comoros"
	},
	{
		"value": 118,
		"label":  "Congo Republic"
	},
	{
		"value": 49,
		"label":  "Kosovo"
	},
	{
		"value": 217,
		"label":  "Costa Rica"
	},
	{
		"value": 121,
		"label":  "Ivory Coast"
	},
	{
		"value": 192,
		"label":  "Cuba"
	},
	{
		"value": 19,
		"label":  "Kuwait"
	},
	{
		"value": 77,
		"label":  "Kyrgyzstan"
	},
	{
		"value": 250,
		"label":  "Curaçao"
	},
	{
		"value": 85,
		"label":  "Laos"
	},
	{
		"value": 33,
		"label":  "Latvia"
	},
	{
		"value": 54,
		"label":  "Lesotho"
	},
	{
		"value": 120,
		"label":  "Liberia"
	},
	{
		"value": 18,
		"label":  "Lebanon"
	},
	{
		"value": 115,
		"label":  "Libya"
	},
	{
		"value": 35,
		"label":  "Republic of Lithuania"
	},
	{
		"value": 160,
		"label":  "Liechtenstein"
	},
	{
		"value": 155,
		"label":  "Luxembourg"
	},
	{
		"value": 56,
		"label":  "Mauritius"
	},
	{
		"value": 128,
		"label":  "Mauritania"
	},
	{
		"value": 62,
		"label":  "Madagascar"
	},
	{
		"value": 60,
		"label":  "Mayotte"
	},
	{
		"value": 92,
		"label":  "Macao"
	},
	{
		"value": 53,
		"label":  "Malawi"
	},
	{
		"value": 88,
		"label":  "Malaysia"
	},
	{
		"value": 138,
		"label":  "Mali"
	},
	{
		"value": 71,
		"label":  "Maldives"
	},
	{
		"value": 143,
		"label":  "Malta"
	},
	{
		"value": 142,
		"label":  "Morocco"
	},
	{
		"value": 193,
		"label":  "Martinique"
	},
	{
		"value": 104,
		"label":  "Marshall Islands"
	},
	{
		"value": 227,
		"label":  "Mexico"
	},
	{
		"value": 105,
		"label":  "Federated States of Micronesia"
	},
	{
		"value": 61,
		"label":  "Mozambique"
	},
	{
		"value": 38,
		"label":  "Republic of Moldova"
	},
	{
		"value": 157,
		"label":  "Monaco"
	},
	{
		"value": 101,
		"label":  "Mongolia"
	},
	{
		"value": 206,
		"label":  "Montserrat"
	},
	{
		"value": 74,
		"label":  "Myanmar"
	},
	{
		"value": 162,
		"label":  "Isle of Man"
	},
	{
		"value": 175,
		"label":  "Namibia"
	},
	{
		"value": 109,
		"label":  "Nauru"
	},
	{
		"value": 73,
		"label":  "Nepal"
	},
	{
		"value": 137,
		"label":  "Niger"
	},
	{
		"value": 124,
		"label":  "Nigeria"
	},
	{
		"value": 151,
		"label":  "Netherlands"
	},
	{
		"value": 216,
		"label":  "Nicaragua"
	},
	{
		"value": 235,
		"label":  "Niue"
	},
	{
		"value": 113,
		"label":  "New Zealand"
	},
	{
		"value": 111,
		"label":  "New Caledonia"
	},
	{
		"value": 166,
		"label":  "Norway"
	},
	{
		"value": 23,
		"label":  "United Arab Emirates"
	},
	{
		"value": 20,
		"label":  "Oman"
	},
	{
		"value": 177,
		"label":  "Bouvet Island"
	},
	{
		"value": 199,
		"label":  "Dominica"
	},
	{
		"value": 112,
		"label":  "Norfolk Island"
	},
	{
		"value": 103,
		"label":  "Christmas Island"
	},
	{
		"value": 208,
		"label":  "Saint Barthélemy"
	},
	{
		"value": 207,
		"label":  "Saint Martin"
	},
	{
		"value": 176,
		"label":  "Saint Helena"
	},
	{
		"value": 179,
		"label":  "Cabo Verde"
	},
	{
		"value": 98,
		"label":  "Cook Islands"
	},
	{
		"value": 202,
		"label":  "Turks and Caicos Islands"
	},
	{
		"value": 79,
		"label":  "Heard Island and McDonald Islands"
	},
	{
		"value": 64,
		"label":  "Pakistan"
	},
	{
		"value": 81,
		"label":  "Palau"
	},
	{
		"value": 244,
		"label":  "Palestine"
	},
	{
		"value": 221,
		"label":  "Panama"
	},
	{
		"value": 106,
		"label":  "Papua New Guinea"
	},
	{
		"value": 185,
		"label":  "Paraguay"
	},
	{
		"value": 226,
		"label":  "Peru"
	},
	{
		"value": 229,
		"label":  "Pitcairn Islands"
	},
	{
		"value": 47,
		"label":  "Poland"
	},
	{
		"value": 119,
		"label":  "Portugal"
	},
	{
		"value": 238,
		"label":  "Puerto Rico"
	},
	{
		"value": 58,
		"label":  "Réunion"
	},
	{
		"value": 100,
		"label":  "Russia"
	},
	{
		"value": 1,
		"label":  "Rwanda"
	},
	{
		"value": 48,
		"label":  "Romania"
	},
	{
		"value": 213,
		"label":  "El Salvador"
	},
	{
		"value": 234,
		"label":  "Samoa"
	},
	{
		"value": 168,
		"label":  "San Marino"
	},
	{
		"value": 132,
		"label":  "São Tomé and Príncipe"
	},
	{
		"value": 5,
		"label":  "Saudi Arabia"
	},
	{
		"value": 57,
		"label":  "Eswatini"
	},
	{
		"value": 36,
		"label":  "Svalbard and Jan Mayen"
	},
	{
		"value": 96,
		"label":  "North Korea"
	},
	{
		"value": 43,
		"label":  "North Macedonia"
	},
	{
		"value": 236,
		"label":  "Northern Mariana Islands"
	},
	{
		"value": 16,
		"label":  "Seychelles"
	},
	{
		"value": 183,
		"label":  "Saint Pierre and Miquelon"
	},
	{
		"value": 117,
		"label":  "Senegal"
	},
	{
		"value": 205,
		"label":  "Saint Vincent and the Grenadines"
	},
	{
		"value": 198,
		"label":  "St Kitts and Nevis"
	},
	{
		"value": 201,
		"label":  "Saint Lucia"
	},
	{
		"value": 247,
		"label":  "Serbia"
	},
	{
		"value": 97,
		"label":  "Singapore"
	},
	{
		"value": 249,
		"label":  "Sint Maarten"
	},
	{
		"value": 9,
		"label":  "Syria"
	},
	{
		"value": 164,
		"label":  "Slovakia"
	},
	{
		"value": 170,
		"label":  "Slovenia"
	},
	{
		"value": 107,
		"label":  "Solomon Islands"
	},
	{
		"value": 2,
		"label":  "Somalia"
	},
	{
		"value": 29,
		"label":  "Sudan"
	},
	{
		"value": 182,
		"label":  "Suriname"
	},
	{
		"value": 243,
		"label":  "United States"
	},
	{
		"value": 131,
		"label":  "Sierra Leone"
	},
	{
		"value": 67,
		"label":  "Tajikistan"
	},
	{
		"value": 86,
		"label":  "Taiwan"
	},
	{
		"value": 83,
		"label":  "Thailand"
	},
	{
		"value": 8,
		"label":  "Tanzania"
	},
	{
		"value": 126,
		"label":  "Togo"
	},
	{
		"value": 231,
		"label":  "Tokelau"
	},
	{
		"value": 232,
		"label":  "Tonga"
	},
	{
		"value": 197,
		"label":  "Trinidad and Tobago"
	},
	{
		"value": 108,
		"label":  "Tuvalu"
	},
	{
		"value": 140,
		"label":  "Tunisia"
	},
	{
		"value": 66,
		"label":  "Turkmenistan"
	},
	{
		"value": 25,
		"label":  "Turkey"
	},
	{
		"value": 14,
		"label":  "Uganda"
	},
	{
		"value": 75,
		"label":  "Uzbekistan"
	},
	{
		"value": 42,
		"label":  "Ukraine"
	},
	{
		"value": 233,
		"label":  "Wallis and Futuna"
	},
	{
		"value": 186,
		"label":  "Uruguay"
	},
	{
		"value": 145,
		"label":  "Faroe Islands"
	},
	{
		"value": 114,
		"label":  "Fiji"
	},
	{
		"value": 87,
		"label":  "Philippines"
	},
	{
		"value": 40,
		"label":  "Finland"
	},
	{
		"value": 188,
		"label":  "Falkland Islands"
	},
	{
		"value": 158,
		"label":  "France"
	},
	{
		"value": 181,
		"label":  "French Guiana"
	},
	{
		"value": 228,
		"label":  "French Polynesia"
	},
	{
		"value": 78,
		"label":  "French Southern Territories"
	},
	{
		"value": 172,
		"label":  "Croatia"
	},
	{
		"value": 15,
		"label":  "Central African Republic"
	},
	{
		"value": 136,
		"label":  "Chad"
	},
	{
		"value": 171,
		"label":  "Montenegro"
	},
	{
		"value": 165,
		"label":  "Czechia"
	},
	{
		"value": 224,
		"label":  "Chile"
	},
	{
		"value": 149,
		"label":  "Switzerland"
	},
	{
		"value": 150,
		"label":  "Sweden"
	},
	{
		"value": 68,
		"label":  "Sri Lanka"
	},
	{
		"value": 219,
		"label":  "Ecuador"
	},
	{
		"value": 123,
		"label":  "Equatorial Guinea"
	},
	{
		"value": 27,
		"label":  "Eritrea"
	},
	{
		"value": 32,
		"label":  "Estonia"
	},
	{
		"value": 26,
		"label":  "Ethiopia"
	},
	{
		"value": 59,
		"label":  "South Africa"
	},
	{
		"value": 189,
		"label":  "South Georgia and the South Sandwich Islands"
	},
	{
		"value": 94,
		"label":  "South Korea"
	},
	{
		"value": 252,
		"label":  "South Sudan"
	},
	{
		"value": 190,
		"label":  "Jamaica"
	},
	{
		"value": 95,
		"label":  "Japan"
	}
];

export const CONFIG: readonly FormConfigItem<FormConfigRegister>[] = [
	{ name: 'firstName', label: 'registerForm.placeholderName', type: InputTypes.TEXT },
	{ name: 'lastName', label: 'registerForm.placeholderLastName', type: InputTypes.TEXT },
	{ name: 'email', label: 'registerForm.labelEmail', placeholder: 'register.placeholderEmail', type: InputTypes.TEXT },
	{ name: 'password', label: 'registerForm.labelPassword', placeholder: 'register.placeholderPassword', type: InputTypes.TEXT },
	{ name: 'passwordConfirm', label: 'registerForm.labelPasswordRepeat', placeholder: 'register.placeholderPasswordRepeat', type: InputTypes.TEXT },
	{
		name: 'gender',
		label: 'registerForm.labelGender',
		placeholder: 'register.placeholderGender',
		type: InputTypes.TEXT,
		options: [
			{label: 'Female', value: 'female'},
			{label: 'Male', value: 'male'},
			{label: 'I don`t want to specify', value: 'hidden'},
		]
	},
	{ name: 'birthDate', label: 'registerForm.labelBirthDay', type: InputTypes.TEXT },
	{
		name: 'countryId',
		label: 'registerForm.labelCountry',
		placeholder: 'registerForm.labelCountry',
		type: InputTypes.TEXT,
		options: countries
	},
	{ name: 'companyName', label: 'registerForm.placeholderCompanyName', type: InputTypes.TEXT },
	{ name: 'companyProfile', label: 'registerForm.placeholderCompanyProfile', type: InputTypes.TEXT },
	{
		name: 'companyStaffQuantity',
		label: 'registerForm.placeholderCompanyStaffQuantity',
		type: InputTypes.TEXT,
		options: [
			{ label: '2-5', value: 5 },
			{ label: '6-10', value: 10 },
			{ label: '11-20', value: 20 },
			{ label: '21-50', value: 50 },
			{ label: 'Over 50', value: 50 },
		]
	},
];
