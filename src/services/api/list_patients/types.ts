  export interface TypeListPatient  {
  data: {
    title: string;
    items: ListPatientItem[]; // Array of ReportItem for main items
  };
  message: string;
  status: boolean;
  client_ip: string;
}

export interface ListPatientItem {
  id: string;
  item_label: string;
  item_value: number | null;
  sequence: number;
 
}
