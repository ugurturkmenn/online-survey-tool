export interface Option {
  name: string;
  image: string;
}

export interface Survey {
  id?: string;
  title: string;
  coverImage: string;
  options: Option[];
}
