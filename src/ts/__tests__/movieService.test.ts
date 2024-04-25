import axios, { AxiosResponse } from 'axios';
import { IMovie } from '../models/Movie';
import { getData } from '../services/movieService';

// jest.mock('axios');

describe('fetch with mocked axios', () => {
  let mockedAxios: jest.SpyInstance;

  beforeEach(() => {
    mockedAxios = jest.spyOn(axios, 'get');
  });
  afterEach(() => {
    mockedAxios.mockRestore();
  });

  test('it should call axios and return mock data', async () => {
    const data = {
      data: {
        Search: [
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
        ],
      },
    };
    const mockedAxios = (
      axios.get as jest.MockedFunction<typeof axios.get>
    ).mockResolvedValue(data);
    const mockedData: IMovie[] = await getData('');

    expect(jest.isMockFunction(mockedAxios)).toBeTruthy();
    expect(mockedData).toHaveLength(2);
    expect(mockedData[mockedData.length - 1].Title).toBe('Nellie Poo');
    expect(mockedAxios).toHaveBeenCalled();
  });

  test('reject', async () => {
    const mockedAxios = (
      axios.get as jest.MockedFunction<typeof axios.get>
    ).mockRejectedValue('');

    const mockedData: IMovie[] = await getData('');

    expect(jest.isMockFunction(mockedAxios)).toBeTruthy();
    expect(mockedData).toEqual([]);
    expect(mockedAxios).toHaveBeenCalled();
  });
});

describe('get data with real Axios', () => {
  test('it should get a list of movies', async () => {
    const url = 'http://omdbapi.com/?apikey=aa369c07&s=star';
    const axiosResponse: AxiosResponse = await axios.get(url);
    const movies: IMovie[] = axiosResponse.data.Search;

    expect(movies.length).toBeGreaterThan(0);
    expect(movies[0].Title).toContain('Star');
  });
});
