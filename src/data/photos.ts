import type { Lang } from './locales';

type HomePhoto = {
  src: string;
  alt: string;
};

type HomePhotoStrip = {
  title: string;
  body: string;
  photos: HomePhoto[];
};

const sharedPhotos = [
  '/images/minted/minted-gallery-02.jpg',
  '/images/minted/minted-gallery-04.jpg',
  '/images/minted/minted-gallery-05.jpg',
  '/images/minted/minted-gallery-06.jpg',
] as const;

export const homePhotoStrip: Record<Lang, HomePhotoStrip> = {
  en: {
    title: 'A little Switzerland, a little us',
    body: 'A few photos from Zurich and our favourite Swiss corners.',
    photos: [
      { src: sharedPhotos[0], alt: 'Gabriela and Manfredi dressed for an evening out' },
      { src: sharedPhotos[1], alt: 'Gabriela and Manfredi overlooking snowy Zurich' },
      { src: sharedPhotos[2], alt: 'Gabriela and Manfredi by Lake Zurich' },
      { src: sharedPhotos[3], alt: 'Gabriela and Manfredi in the Swiss Alps' },
    ],
  },
  it: {
    title: "Un po' di Svizzera, un po' di noi",
    body: 'Alcune foto dal nostro sito Minted, tra Zurigo e i nostri luoghi svizzeri preferiti.',
    photos: [
      { src: sharedPhotos[0], alt: 'Gabriela e Manfredi vestiti per una serata fuori' },
      { src: sharedPhotos[1], alt: 'Gabriela e Manfredi con vista sulla Zurigo innevata' },
      { src: sharedPhotos[2], alt: 'Gabriela e Manfredi sul Lago di Zurigo' },
      { src: sharedPhotos[3], alt: 'Gabriela e Manfredi nelle Alpi svizzere' },
    ],
  },
  de: {
    title: 'Ein bisschen Schweiz, ein bisschen wir',
    body: 'Ein paar Fotos von unserer Minted-Seite, aus Zürich und unseren liebsten Ecken der Schweiz.',
    photos: [
      { src: sharedPhotos[0], alt: 'Gabriela und Manfredi festlich angezogen' },
      { src: sharedPhotos[1], alt: 'Gabriela und Manfredi mit Blick auf das verschneite Zürich' },
      { src: sharedPhotos[2], alt: 'Gabriela und Manfredi am Zürichsee' },
      { src: sharedPhotos[3], alt: 'Gabriela und Manfredi in den Schweizer Alpen' },
    ],
  },
};
