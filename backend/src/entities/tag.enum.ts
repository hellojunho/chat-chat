export enum TagType {
  Sports = 'sports',
  Reading = 'reading',
  Movie = 'movie',
  Walking = 'walking',
  Travel = 'travel',
  Stock = 'stock',
  Finance = 'finance'
}

export const TagTypeLabels: Record<TagType, string> = {
  [TagType.Sports]: '스포츠',
  [TagType.Reading]: '독서',
  [TagType.Movie]: '영화시청',
  [TagType.Walking]: '산책',
  [TagType.Travel]: '여행',
  [TagType.Stock]: '주식',
  [TagType.Finance]: '재태크'
};
