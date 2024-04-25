import { createHtml, displayNoResult } from '../htmlFunctions';
import { IMovie } from '../models/Movie';
import { getData } from '../services/movieService';

jest.mock('./../services/movieService.ts');

describe('render html', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app">
          <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
          </form>
          <div id="movie-container"></div>
        </div>`;
  });


  test('it should render the movies', async () => {

    const movies: IMovie[] = await getData('')

    let container: HTMLDivElement = document.getElementById(
      'movie-container'
    ) as HTMLDivElement;
    const movieTags = document.getElementsByClassName('movie');

    createHtml(movies, container);

    expect(movieTags.length).toBe(2);
    expect(document.querySelectorAll('h3')[0].innerHTML).toBe('Nalle Puh');
  });
});

test('it should render the html in displayNoResult', async () => {
  let container: HTMLDivElement = document.getElementById(
    'movie-container'
  ) as HTMLDivElement;

  displayNoResult(container);
  let noMessage = document.querySelector('p');
  expect(noMessage?.innerHTML).toBe('Inga sökresultat att visa');
});
