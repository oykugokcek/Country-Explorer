export interface Language {
  name: string;
}

export interface Continent {
  name: string;
}

export interface Country {
  name: string;
  capital: string;
  code: string;
  continent: Continent;
  languages: Language[];
}
