

export type ProvinceItem = {
  province_id: string;
  province_name: string;
};


export type RespPv = {
  data: ProvinceItem[];
  message: string;
  status: boolean;
  client_ip: string;
};
export type DistrictItem = {
  district_id: string;
  district_name: string;
};


export type RespDt = {
  data: DistrictItem[];
  message: string;
  status: boolean;
  client_ip: string;
};
export type WardItem = {
  ward_id: string;
  ward_name: string;
};


export type RespW = {
  data: WardItem[];
  message: string;
  status: boolean;
  client_ip: string;
};
