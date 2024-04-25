import { handleSubmit, movieSort } from '../functions';
import { IMovie } from '../models/Movie';
import * as movieService from '../services/movieService';
import * as HtmlFunctions from './../htmlFunctions';

jest.mock('./../services/movieService.ts');

let mockedDisplayNoResult: jest.SpyInstance;
let mockedCreateHtml: jest.SpyInstance;

mockedDisplayNoResult = jest.spyOn(HtmlFunctions, 'displayNoResult');
mockedCreateHtml = jest.spyOn(HtmlFunctions, 'createHtml');

describe('handle submit', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app">
      <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" value="Nalle Puh" />
        <button type="submit" id="search">Sök</button>
      </form>
      <div id="movie-container"></div>
    </div>`;
  });

  afterEach(() => {
    mockedDisplayNoResult.mockReset();
    mockedCreateHtml.mockReset();
  });

  test('it should call getData with searchtext value', async () => {
    let mockedGetData: jest.SpyInstance<Promise<IMovie[]>>;
    mockedGetData = jest.spyOn(movieService, 'getData');
    await handleSubmit();
    expect(mockedGetData).toHaveBeenCalledWith('Nalle Puh');
  });

  test('it should call createHtml if getData returned movies', async () => {
    await handleSubmit();
    expect(mockedCreateHtml).toHaveBeenCalled();
    expect(mockedDisplayNoResult).not.toHaveBeenCalled();
  });

  test('it should call displayNoResult if no movies found', async () => {
    const movies: IMovie[] = [];

    let mockedGetData: jest.SpyInstance<Promise<IMovie[]>>;
    mockedGetData = jest.spyOn(movieService, 'getData');
    mockedGetData.mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(movies);
      });
    });
    await handleSubmit();

    expect(mockedDisplayNoResult).toHaveBeenCalled();
    expect(mockedCreateHtml).not.toHaveBeenCalled();
  });

  test('it should call displayNoResult in catch', async () => {
    let mockedGetData: jest.SpyInstance<Promise<IMovie[]>>;
    mockedGetData = jest.spyOn(movieService, 'getData');
    mockedGetData.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve;
        reject(new Error('error'));
      });
    });
    await handleSubmit();

    expect(mockedDisplayNoResult).toHaveBeenCalled();
    expect(mockedCreateHtml).not.toHaveBeenCalled();
  });
});

describe('movieSort', () => {
  test('it should sort the movies in decending order', async () => {
    let movies: IMovie[] = [
      {
        Title: 'Nellie Poo',
        imdbID: '2',
        Poster: 'image-url',
        Type: 'lorem',
        Year: '1990',
      },
      {
        Title: 'Nalle Puh',
        imdbID: '1',
        Poster: 'image-url',
        Type: 'lorem',
        Year: '1989',
      },
    ];

    movieSort(movies, true);
    expect(movies[0].Title).toBe('Nalle Puh');
    expect(movies[0].imdbID).toBe('1');
    expect(movies[1].Title).toBe('Nellie Poo');
    expect(movies[1].imdbID).toBe('2');
  });

  test('it should keep the movies in decending order', () => {
    let movies: IMovie[] = [
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
    movieSort(movies, true);
    expect(movies[0].Title).toBe('Nalle Puh');
    expect(movies[0].imdbID).toBe('1');
    expect(movies[1].Title).toBe('Nellie Poo');
    expect(movies[1].imdbID).toBe('2');
  });

  test('it should keep movies in decending order when titles are equal', () => {
    let movies: IMovie[] = [
      {
        Title: 'Nalle Puh',
        imdbID: '1',
        Poster: 'image-url',
        Type: 'lorem',
        Year: '1989',
      },
      {
        Title: 'Nalle Puh',
        imdbID: '2',
        Poster: 'image-url',
        Type: 'lorem',
        Year: '1990',
      },
    ];
    movieSort(movies, true);
    expect(movies[0].Title).toBe('Nalle Puh');
    expect(movies[0].imdbID).toBe('1');
    expect(movies[1].imdbID).toBe('2');
  });

  test('it should sort the movies in ascending order', () => {
    let movies: IMovie[] = [
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
    movieSort(movies, false);
    expect(movies[0].Title).toBe('Nellie Poo');
    expect(movies[0].imdbID).toBe('2');
    expect(movies[1].Title).toBe('Nalle Puh');
    expect(movies[1].imdbID).toBe('1');
  });

  test('it should keep the movies in ascending order', () => {
    let movies: IMovie[] = [
      {
        Title: 'Nellie Poo',
        imdbID: '2',
        Poster: 'image-url',
        Type: 'lorem',
        Year: '1990',
      },
      {
        Title: 'Nalle Puh',
        imdbID: '1',
        Poster: 'image-url',
        Type: 'lorem',
        Year: '1989',
      },
    ];
    movieSort(movies, false);
    expect(movies[0].Title).toBe('Nellie Poo');
    expect(movies[0].imdbID).toBe('2');
    expect(movies[1].Title).toBe('Nalle Puh');
    expect(movies[1].imdbID).toBe('1');
  });

  test('it should keep movies in ascending order when titles are equal', () => {
    let movies: IMovie[] = [
      {
        Title: 'Nalle Puh',
        imdbID: '1',
        Poster: 'image-url',
        Type: 'lorem',
        Year: '1989',
      },
      {
        Title: 'Nalle Puh',
        imdbID: '2',
        Poster: 'image-url',
        Type: 'lorem',
        Year: '1990',
      },
    ];
    movieSort(movies, false);
    expect(movies[0].Title).toBe('Nalle Puh');
    expect(movies[0].imdbID).toBe('1');
    expect(movies[1].imdbID).toBe('2');
  });
});
