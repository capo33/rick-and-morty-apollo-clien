export interface Episode {
  name: string;
  episode: string;
}

export interface Data {
  character: {
    id: string;
    name: string;
    image: string;
    gender: string;
    episode: Episode[];
  };
}
