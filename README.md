Your customer is Ash, the Pokemon trainer. Ash is very busy and needs help identifying where various pokemon have been encountered.

Your goal is to build a React application that displays a table of pokemon and the most recent encounter with this pokemon.

The backend team has already been hard at work and has provided us with a collection of api resources.
The docs can be found here: https://pokeapi.co/docs/v2

Let's break this problem up into a few milestones:

1. Render a table of Pokemon

Requirements:

- The table should have a single column
- The table header should be labeled: "Pokemon name"
- The table should contain rows for each pokemon
- The table should obtain the list of pokemon from the provided pokemon api
- The table should only display 10 pokemon at a time

API doc: https://pokeapi.co/docs/v2#pokemon
API URL: https://pokeapi.co/api/v2/pokemon/

2. Get Encounters for the each pokemon

Requirements:

- An additional column should be added to the table to show the most recent encounter
- The most recent encounter for each of the pokemon should be displayed on the table row for that pokemon
- If there are not encounters, "No encounters" should be displayed

API Docs: https://pokeapi.co/docs/v2#encounters-section
API URL: https://pokeapi.co/api/v2/pokemon/<pokemon-id>/encounters

3. Provide Ash with a way to see the next and previous set of pokemon.

- layout should show:
  - current range of pokemon being displayed (e.g. 11-20)
  - total count of pokemon
  - button to move to previous page
  - button to move to next page
  - users shouldn't be able to reach an invalid page
  - e.g. "Results: 11-20 / 1500" "Previous Page" button "Next page" button

More details on how the api handles pagination can be found here:
https://pokeapi.co/docs/v2#resource-listspagination-section

Bonus (discussion based):

- How would you get total encounters
- How would you improve styling
- If you were to ship this to production, how would you cleanup the code.
- Testing, how would you test this?
