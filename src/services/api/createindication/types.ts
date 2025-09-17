export interface Customer {
  customer_id: string;
  customer_fullname: string;
  customer_phone: string;
  customer_identity_card: string;
  customer_email: string;
  customer_full_address: string;
  gender_id: string;
  gender_name: string;
  day_of_birth: number | null;
  month_of_birth: number | null;
  year_of_birth: number | null;
  country_id: string;
  province_id: string | null;
  district_id: string | null;
  ward_id: string | null;
  career_id: string | null;
  nation_id: string | null;
  create_date: string;
  update_date: string;
  is_actived: boolean;
}

export interface ResponseData {
  data: Customer[];
  message: string;
  status: boolean;
  client_ip: string;
}



export interface TypeGetInfoOfPatient {
  data: MasterDataResponse;
  message: string;
  status: boolean;
  client_ip: string;
}
export interface MasterDataResponse {
  customer: CustomerModel;
  master: DcHisMaster;
  servicepoint: ServicepointModel;
}

export interface CustomerModel
{
  customer_id: string;
  customer_type: string;
  owner_type: string;
  owner_id: string;
  parent_id: string;
  customer_fullname: string;
  customer_lastname: string;
  customer_prefix_gender: string;
  customer_phone: string;
  customer_identity_card: string;
  customer_email: string;
  birthday: Date;
  day_of_birth?: number;
  month_of_birth?: number;
  year_of_birth?: number;
  customer_full_address: string;
  customer_address: string;
  gender: MapObjectModel;
  country: MapObjectModel;
  province: MapObjectModel;
  district: MapObjectModel;
  ward: MapObjectModel;
  nation: MapObjectModel;
  career: MapObjectModel;
  launch_source_group_id?: number;
  launch_source_group: MapIntObjectModel;
  launch_source: MapIntObjectModel;
  launch_source_type: MapIntObjectModel;
  relation_type: MapIntObjectModel;
  portrait_survey_type: string;
  gclid: string;
  facebook_id: string;
  zalo_id: string;
  facebook_ads_id: string;
  create_date?: Date;
  update_date?: Date;
  is_parent_show?: boolean;
  is_actived?: boolean;
  is_affiliate_doctor: boolean;
  member: CustomerMemberDataViewModel;
}

export interface DcHisMaster {
  master_id: string;
  f_type: string;
  master_type: string;
  session_count?: number;
  company_id?: number;
  clinic_id?: number;
  owner_type: string;
  owner_id: string;
  c_owner_id?: number;
  customer_id: string;
  specialist_id: string;
  exams_service_id: string;
  exams_department_id: string;
  exams_doctor_id: string;
  appointment_note: string;
  appointment_affiliate_id: string;
  appointment_type: string;
  exams_reason: string;
  checkin_time?: Date;
  checkout_time?: Date;
  total_time_minutes?: number;
  execution_time_minutes?: number;
  wating_time_minutes?: number;
  master_note: string;
  note_customer: string;
  expected_total?: number;
  create_employee_id: string;
  update_employee_id: string;
  care_employee_id: string;
  is_care?: boolean;
  care_datetime?: Date;
  is_pregnant?: boolean;
  pregnant_number_week?: number;
  register_type_id: string;
  canceled_reason: string;
  appointment_order_number?: number;
  order_discount_refcode: string;
  order_discount_value?: number;
  register_delay_note: string;
  register_delay_date?: Date;
  package_id?: string;
  is_register_delay?: boolean;
  is_register_package?: boolean;
  is_register_subclinical?: boolean;
  is_exams?: boolean;
  is_real_checking?: boolean;
  is_received_alldocs?: boolean;
  is_insurance?: boolean;
  is_insurance_checkcard?: boolean;
  is_insurance_approved?: boolean;
  is_appointment?: boolean;
  is_re_exams?: boolean;
  is_paid?: boolean;
  appointment_date?: Date;
  register_date?: Date;
  create_date?: Date;
  update_date?: Date;
  erp_code: string;
  erp_type: string;
  username: string;
  status: string;
}

export interface ServicepointModel {
  servicepoint_id: string;
  clinic_id?: number;
  master_id: string;
  customer_id: string;
  examination_code: string;
  insurance_object_ratio?: number;
  insurance_hospital_id: string;
  specialist_id: string;
  servicepoint_doctor_id: string;
  servicepoint_department_id: string;
  servicepoint_affiliat_name: string;
  diagnose_note: string;
  total_prepayment?: number;
  total_invoices?: number;
  total_insurance?: number;
  total_drugs?: number;
  total_insurance_drugs?: number;
  total_services?: number;
  total_insurance_services?: number;
  total_supplies?: number;
  total_insurance_payment?: number;
  total_customer_payment?: number;
  package_id?: string;
  create_date?: Date;
  update_date?: Date;
  servicepoint_datetime?: Date;
  invoice_date?: Date;
  is_affiliat_doctor?: boolean;
  is_insurance?: boolean;
  is_prepayment?: boolean;
  is_paid?: boolean;
  is_re_exams?: boolean;
  is_appointment?: boolean;
  items: ServicePointItemsModel[];
  status: string;
}

export interface ServicePointItemsModel {
  servicespoint_detail_id: string;
  servicepoint_id?: string;
  master_id: string;
  customer_id: string;
  specialist_id: string;
  servicepoint_employee_id: string;
  servicepoint_department_id: string;
  execution_employee_id: string;
  execution_department_id: string;
  execution_order_number?: number;
  order_number_date?: Date;
  service_id: string;
  service_name: string;
  insurance_refcode: string;
  insurance_service_name: string;
  service_notice: string;
  service_group_id: string;
  service_group_name: string;
  groupcost_id?: number;
  groupcost_name: string;
  bv01group_id: string;
  bv01group_name: string;
  bv01group_order_number?: number;
  service_group_subname: string;
  service_group_name_order: string;
  service_group_type: string;
  service_order_number?: number;
  service_group_order_number?: number;
  exams_specialist_index?: number;
  package_id?: string;
  supplie_ids: string;
  parent_id: string;
  insurance_contractors: string;
  labtests_sid: string;
  unit_id: string;
  unit_name: string;
  product_status: string;
  service_prices?: number;
  insurance_service_prices?: number;
  insurance_service_ratio?: number;
  insurance_object_ratio?: number;
  quantity?: number;
  is_allow_payment?: boolean;
  is_children?: boolean;
  is_insurance?: boolean;
  is_insurance_allow?: boolean;
  is_prepayment?: boolean;
  is_paid?: boolean;
  is_show?: boolean;
  is_has_execution?: boolean;
  is_allow_quantity?: boolean;
  is_checkin_queue?: boolean;
  is_supplies?: boolean;
  is_exams?: boolean;
  is_group?: boolean;
  allow_pay_after?: boolean;
  is_anesthesia?: boolean;
  servicepoint_datetime?: Date;
  status: string;
  child_items: ServicePointItemsModel[];
}

export interface MapObjectModel {
  id: string;
  name: string;
}

export interface CustomerMemberDataViewModel {
  member_code: string;
  member_name: string;
  pending_points?: number;
  use_points?: number;
  loyalty_points?: number;
}

export interface MapIntObjectModel {
  id: number;
  name: string;
}
