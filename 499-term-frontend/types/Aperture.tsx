export interface Aperture {
  pk: number;
  fields: ApertureFields;
}

interface ApertureFields {
  type: number;
  title: string;
  status: boolean;
  x: number;
  y: number;
}
