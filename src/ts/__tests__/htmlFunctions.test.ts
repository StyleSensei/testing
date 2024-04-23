import { handleSubmit } from '../functions';
import { createHtml } from '../htmlFunctions';
import { IMovie } from '../models/Movie';
import { getData } from '../services/movieService';
import * as HtmlFunctions from './../htmlFunctions';

jest.mock('./../services/movieService.ts');
let mockedDisplayNoResult: jest.SpyInstance;
let mockedCreateHtml: jest.SpyInstance;

describe('render html', () => {
  beforeEach(() => {
    mockedDisplayNoResult = jest.spyOn(HtmlFunctions, 'displayNoResult');
    mockedCreateHtml = jest.spyOn(HtmlFunctions, 'createHtml');

    document.body.innerHTML = `<div id="app">
          <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
          </form>
          <div id="movie-container"></div>
        </div>`;
  });

  afterEach(() => {
    mockedDisplayNoResult.mockReset();
    mockedCreateHtml.mockReset();
  });

  test('it should render the movies', async () => {
    const movies: IMovie[] = [
      {
        Title: 'Nalle Puh',
        imdbID: '1',
        Poster: 'image-url',
        Type: 'lorem',
        Year: '1989',
      },
      {
        Title: 'Nellie Poo',
        imdbID: '2',
        Poster: 'image-url',
        Type: 'lorem',
        Year: '1990',
      },
    ];

    let container: HTMLDivElement = document.getElementById(
      'movie-container'
    ) as HTMLDivElement;
    const movieTags = document.getElementsByClassName('movie');
    
    createHtml(movies, container);

    expect(movieTags.length).toBe(2);
    expect(document.querySelectorAll('h3')[0].innerHTML).toBe('Nalle Puh')
    
  });

//   test('it should run displayNoResult', async () => {
//     handleSubmit();
//     await getData('');
//     expect(mockedDisplayNoResult).toHaveBeenCalled();
//   });

  test('it should run createHtml', async () => {
    handleSubmit();
    await getData('');
    expect(mockedCreateHtml).toHaveBeenCalled();
  });
});


