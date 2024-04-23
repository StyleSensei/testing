import { IMovie } from '../../models/Movie';


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
    Year: '1990'
  }
];

export const getData = async(): Promise<IMovie[]> => {
    return new Promise((resolve) => {
        resolve(movies)
    })
}
