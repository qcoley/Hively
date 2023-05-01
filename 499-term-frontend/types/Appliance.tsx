export interface Appliance {
  pk: number;
  fields: ApplianceFields;
}

interface ApplianceFields {
  appliance_type: number;
  title: string;
  status: boolean;
  x: number;
  y: number;
}
