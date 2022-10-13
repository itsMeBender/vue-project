// A single SHOW data object
// Derived from https://api.tvmaze.com/shows

export interface Show {
  genres: string[];
  id: string;
  image: {
    medium: string;
    original: string;
  };
  name: string;
  schedule: {
    time: string;
  };
  summary: string;
  rating: {
    average: number;
  };
}
