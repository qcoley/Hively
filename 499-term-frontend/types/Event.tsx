export interface Event {
  pk: number;
  fields: EventFields;
}

interface EventFields {
  appliance: number;
  on_at: string;
  off_at: string;
  watts_used: number;
  water_used: number;
  cost: number;
  is_active: boolean;
  created_at: string;
  title: string;
}
