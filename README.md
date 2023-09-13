Countries Component Documentation
Props
The Countries component accepts the following prop:

countries (Required): This prop contains the list of countries to be displayed. Each country should be represented as an object with the following properties:

name (string): The name of the country.
languages (array): An array of languages spoken in the country.
continent (object): An object representing the continent where the country is located.
capital (string): The capital city of the country.
Features
The Countries component provides the following features:

Searching

Users can filter countries by entering search terms in the search input field. The component automatically filters the countries based on the entered search terms, including country names, codes, continents, languages, and capitals.

Country Selection

Users can select a country from the filtered list. When a country is selected, its details are displayed, including its name, languages spoken, continent, and capital.

Example Usage
In the example above, the Countries component is used to create a user interface for searching and selecting countries. Users can enter search terms in the search input field, and the component will automatically filter the countries accordingly. When a country is selected, its details are displayed, including the number of languages spoken, the list of languages, the continent, and the capital city.

Example Search:
When the user enters a search term like "search: Germany code: FR lang: English":

First, the term starting with "search:" is compared with the name of Germany, and countries containing "Germany" in their names are found.
Then, the term starting with "code:" is compared with the code of France, and countries with the code "FR" are found.
Finally, the term starting with "lang:" is compared with the English language, and countries where English is spoken are found.