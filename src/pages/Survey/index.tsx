/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-named-as-default */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {  Spin } from "antd";
import Typography from 'components/atoms/Typography';
import PublicLayout from 'components/templates/PublicLayout';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useLocation, useNavigate,useSearchParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { getSurvey, SaveSurvey } from 'services/api/apiGetC';
import { MenuCRM } from 'utils/staticState';

import logoClose from "assets/icons/icons-close.png"
import logoH from 'assets/images/LogoH.svg'
import logoSave from "assets/images/icon-save.png"
import introDc from 'assets/images/intro_dc.jpg';
import logo from 'assets/images/short_logo.svg'
export interface htmlhtmlFormAddTodoStep {
  id: number;
  name: string;
  isDone: boolean;
}
interface Survey {
  card_survey_id: string;
  survey_id: string;
  customer_id: string;
  master_id: string;
  survey_type: string;
  survey_version: string;
  survey_title: string;
  card: Record<string, any>;
  review_employee: string | null;
  create_date: string;
  update_date: string;
  review_date: string | null;
  is_review: boolean;
  status: string;
}

interface SurveyNotices {
  visibility: Record<string, boolean>;
  card: Record<string, any>;
}

interface SurveyData {
  survey: Survey;
  surveynotices: SurveyNotices;
}

const Survey: React.FC = () => {
  const navigators = useNavigate();
  const [data, setData] = useState<any | null>(null);
  const [dataItem, setSurveyData] = useState<SurveyData | null>(null);
  const [searchParams] = useSearchParams();
  const r = searchParams.get("r");
  const [loadingPage, setLoading] = useState<boolean>(true);
 useEffect(() => {
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    const e = event; // tạo biến mới để "lách" eslint
    e.preventDefault();
    // eslint-disable-next-line no-param-reassign
    e.returnValue = ''; // cần thiết để hiển thị cảnh báo
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, []);

  const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
  const overlayStyle1: React.CSSProperties = {
  display: isOpen1 ? "flex" : "none",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "linear-gradient(to bottom, rgba(5, 111, 142, 0.5), rgba(1, 31, 40, 0.5))",
  justifyContent: "center",
  alignItems: "center",
    zIndex: 1000, 
    paddingLeft: "10px",
  paddingRight:"10px"
};

  const popupStyle1: React.CSSProperties = {
    background: "white",
    padding: "20px 0px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    minWidth: "300px",
    textAlign: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
    gap:"10px"
  };
const overlayStyle: React.CSSProperties = {
  display: isOpen ? "flex" : "none",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "linear-gradient(to bottom, rgba(5, 111, 142, 0.5), rgba(1, 31, 40, 0.5))",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

  const popupStyle: React.CSSProperties = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    minWidth: "300px",
    textAlign: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
    gap:"10px"
  };
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
   const validate = () => {
      let newErrors: { [key: string]: string } = {};
      if (!dataSurveyText.q1_text) newErrors.q1_text = "Hãy nhập câu trả lời";
      if (!dataSurveyText.q2_text) newErrors.q2_text = "Hãy nhập câu trả lời";
      if (!dataSurveyText.q3_text) newErrors.q3_text =  "Hãy nhập câu trả lời";
      if (!dataSurveyText.q4_text) newErrors.q4_text =  "Hãy nhập câu trả lời";
    
     if (!dataSurveyText.q5_text) newErrors.q5_text = "Hãy nhập câu trả lời";
     
     if (!dataSurveyText.q7_bl1_text) newErrors.q7_bl1_text = "Hãy nhập câu trả lời";
     if (!dataSurveyText.q7_n1_text) newErrors.q7_n1_text = "Hãy nhập câu trả lời"; 
    //  if (!dataSurveyText.q7_bl2_text) newErrors.q7_bl2_text = "Hãy nhập câu trả lời";
    //  if (!dataSurveyText.q7_n2_text) newErrors.q7_n2_text = "Hãy nhập câu trả lời";
    //  if (!dataSurveyText.q7_bl3_text) newErrors.q7_bl3_text = "Hãy nhập câu trả lời";
    //  if (!dataSurveyText.q7_n3_text) newErrors.q7_n3_text = "Hãy nhập câu trả lời";

  if (!dataSurveyText.q10_text) newErrors.q10_text = "Hãy nhập câu trả lời";

          if (!dataSurveyText.q11_pt1_text) newErrors.q11_pt1_text = "Hãy nhập câu trả lời";
     if (!dataSurveyText.q11_n1_text) newErrors.q11_n1_text = "Hãy nhập câu trả lời"; 
     
     if (!dataSurveyText.q13_text) newErrors.q13_text = "Hãy nhập câu trả lời";
     if (!dataSurveyText.q15_text) newErrors.q15_text = "Hãy nhập câu trả lời";
     
       if (!dataSurveyText.q14_t1_text) newErrors.q14_t1_text = "Hãy nhập câu trả lời"; 
          if (!dataSurveyText.q14_l1_text) newErrors.q14_l1_text = "Hãy nhập câu trả lời";
     if (!dataSurveyText.q14_ls1_text) newErrors.q14_ls1_text = "Hãy nhập câu trả lời"; 

         if (!dataSurveyText.q16_br_text) newErrors.q16_br_text = "Hãy nhập câu trả lời";
     
       if (!dataSurveyText.q16_mr_text) newErrors.q16_mr_text = "Hãy nhập câu trả lời"; 
          if (!dataSurveyText.q16_aer_text) newErrors.q16_aer_text = "Hãy nhập câu trả lời";
     if (!dataSurveyText.q16_cer_text) newErrors.q16_cer_text = "Hãy nhập câu trả lời"; 
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  useEffect(() => {

    onGetSV()
  }, [])
    const [text,setText] = useState("")
    const { mutate: getDataSurvey } = useMutation(
      'post-footer-form',
      (data: any) => getSurvey(data),
        {
      onSuccess: async (data) => {
      
        if (data?.status) {
          
            setSurveyData(data.data.survey)
            setData(data.data)
            setLoading(false)
        
      }
        else {
          setText(data.message)
            setLoading(false)
          setIsOpen(true)
      }
      
        }
       
      ,
      onError: (error) => {
        console.error("🚀 ~ file: index.tsx:159 ~ error:", error);
      },
    }
  
  );
   const { mutate: SaveSV } = useMutation(
      'post-footer-form',
      (data: any) => SaveSurvey(data),
      {
        onSuccess: (data: any) => new Promise((resolve, reject) => {
         
            if(data.status) {
             

                setLoading(false)
              setIsOpen1(true)
              resolve(true);
            } else {
               setLoading(false)
              navigators("/")
            }
          } 
        ),
        onError: () => {
          setLoading(false)
          
           toast.error('Hiện đang có lỗi,vui lòng thử lại sau!');
       
        },
      },
  );
  // useEffect(() => {
  //   if (dataItem?.survey.status === "done") {
  //     navigators("/done-survey")
  //   }
  // },[dataItem?.survey.status])

 const navi = () => {
 

  navigators(`/verify-profile?r=${r}`);
};
  const [dataSurveyText, setDataSurvey] = useState({
    q1_text: dataItem?.survey.card.q1_text,
    q2_text: dataItem?.survey.card.q2_text,
    q3_text: dataItem?.survey.card.q3_text,
    q4_text: dataItem?.survey.card.q4_text,
    q5_text: dataItem?.survey.card.q5_text,
    q6_note_text: dataItem?.survey.card.q6_note_text,

    q7_bc1_text: dataItem?.survey.card.q7_bc1_text,
    q7_bc2_text: dataItem?.survey.card.q7_bc2_text,
    q7_bc3_text: dataItem?.survey.card.q7_bc3_text,
    q7_bl1_text: dataItem?.survey.card.q7_bl1_text,
    q7_bl2_text: dataItem?.survey.card.q7_bl2_text,
    q7_bl3_text: dataItem?.survey.card.q7_bl3_text,
    
    q7_n1_text: dataItem?.survey.card.q7_n1_text,
    q7_n2_text: dataItem?.survey.card.q7_n2_text,
    q7_n3_text: dataItem?.survey.card.q7_n3_text,
    q11_bc1_text: dataItem?.survey.card.q11_bc1_text,
    q11_bc2_text: dataItem?.survey.card.q11_bc2_text,
    q11_bc3_text: dataItem?.survey.card.q11_bc3_text,

    q11_n1_text: dataItem?.survey.card.q11_n1_text,
    q11_n2_text: dataItem?.survey.card.q11_n2_text,
    q11_n3_text: dataItem?.survey.card.q11_n3_text,
    q11_pt1_text: dataItem?.survey.card.q11_pt1_text,
    q11_pt2_text: dataItem?.survey.card.q11_pt2_text,
    q11_pt3_text: dataItem?.survey.card.q11_pt3_text,

    q14_l1_text: dataItem?.survey.card.q14_l1_text,
    q14_l2_text: dataItem?.survey.card.q14_l2_text,
    q14_l3_text: dataItem?.survey.card.q14_l3_text,
    q14_ls1_text: dataItem?.survey.card.q14_ls1_text,
    q14_ls2_text: dataItem?.survey.card.q14_ls2_text,
    q14_ls3_text: dataItem?.survey.card.q14_ls3_text,

    q14_t1_text: dataItem?.survey.card.q14_t1_text,
    q14_t2_text: dataItem?.survey.card.q14_t2_text,
    q14_t3_text: dataItem?.survey.card.q14_t3_text,
    q15_text: dataItem?.survey.card.q15_text,
    q16_aer_text: dataItem?.survey.card.q16_aer_text,
    q16_br_text: dataItem?.survey.card.q16_br_text,

    q16_mr_text: dataItem?.survey.card.q16_mr_text,

    q10_text: dataItem?.survey.card.q10_text,
    q12_htl_hdch_text: dataItem?.survey.card.q12_htl_hdch_text,
    q13_text: dataItem?.survey.card.q13_text,
    q16_cer_text: dataItem?.survey.card.q16_cer_text
  })
  const [dataSurveyCheck, setDataSurveyCheck] = useState({
    q6_bgm_no: dataItem?.survey.card.q6_bgm_no,
  q6_bgm_unknown: dataItem?.survey.card.q6_bgm_unknown,
  q6_bgm_yes: dataItem?.survey.card.q6_bgm_yes,
  q6_blhhk_no: dataItem?.survey.card.q6_blhhk_no,
  q6_blhhk_unknown: dataItem?.survey.card.q6_blhhk_unknown,
  q6_blhhk_yes: dataItem?.survey.card.q6_blhhk_yes,
  q6_bphhs_no: dataItem?.survey.card.q6_bphhs_no,
  q6_bphhs_unknown: dataItem?.survey.card.q6_bphhs_unknown,
  q6_bphhs_yes: dataItem?.survey.card.q6_bphhs_yes,
  q6_btg_no: dataItem?.survey.card.q6_btg_no,
  q6_btg_unknown: dataItem?.survey.card.q6_btg_unknown,
  q6_btg_yes: dataItem?.survey.card.q6_btg_yes,
  q6_btm_no: dataItem?.survey.card.q6_btm_no,
  q6_btm_unknown: dataItem?.survey.card.q6_btm_unknown,
  q6_btm_yes: dataItem?.survey.card.q6_btm_yes,
  q6_dkhdq_no: dataItem?.survey.card.q6_dkhdq_no,
  q6_dkhdq_unknown: dataItem?.survey.card.q6_dkhdq_unknown,
  q6_dkhdq_yes: dataItem?.survey.card.q6_dkhdq_yes,
  q6_dtd_no: dataItem?.survey.card.q6_dtd_no,
  q6_dtd_unknown: dataItem?.survey.card.q6_dtd_unknown,
  q6_dtd_yes: dataItem?.survey.card.q6_dtd_yes,
  q6_hiv_no: dataItem?.survey.card.q6_hiv_no,
  q6_hiv_unknown: dataItem?.survey.card.q6_hiv_unknown,
  q6_hiv_yes: dataItem?.survey.card.q6_hiv_yes,
  q6_lp_no: dataItem?.survey.card.q6_lp_no,
  q6_lp_unknown: dataItem?.survey.card.q6_lp_unknown,
  q6_lp_yes: dataItem?.survey.card.q6_lp_yes,
  q6_nhp_no: dataItem?.survey.card.q6_nhp_no,
  q6_nhp_unknown: dataItem?.survey.card.q6_nhp_unknown,
    q6_nhp_yes: dataItem?.survey.card.q6_nhp_yes,
    q6_pldtt_no: dataItem?.survey.card.q6_pldtt_no,
  q6_pldtt_unknown: dataItem?.survey.card.q6_pldtt_unknown,
  q6_pldtt_yes: dataItem?.survey.card.q6_pldtt_yes,
  q6_rldcm_no: dataItem?.survey.card.q6_rldcm_no,
  q6_rldcm_unknown: dataItem?.survey.card.q6_rldcm_unknown,
  q6_rldcm_yes: dataItem?.survey.card.q6_rldcm_yes,
  q6_rlttk_no: dataItem?.survey.card.q6_rlttk_no,
  q6_rlttk_unknown: dataItem?.survey.card.q6_rlttk_unknown,
  q6_rlttk_yes: dataItem?.survey.card.q6_rlttk_yes,
  q6_tha_no: dataItem?.survey.card.q6_tha_no,
  q6_tha_unknown: dataItem?.survey.card.q6_tha_unknown,
  q6_tha_yes: dataItem?.survey.card.q6_tha_yes,
  q6_tk_no: dataItem?.survey.card.q6_tk_no,
  q6_tk_unknown: dataItem?.survey.card.q6_tk_unknown,
  q6_tk_yes: dataItem?.survey.card.q6_tk_yes,
  q6_tm_no: dataItem?.survey.card.q6_tm_no,
  q6_tm_unknown: dataItem?.survey.card.q6_tm_unknown,
  q6_tm_yes: dataItem?.survey.card.q6_tm_yes,
  q6_tmg_no: dataItem?.survey.card.q6_tmg_no,
  q6_tmg_unknown: dataItem?.survey.card.q6_tmg_unknown,
  q6_tmg_yes: dataItem?.survey.card.q6_tmg_yes,
  q6_tri_no: dataItem?.survey.card.q6_tri_no,
  q6_tri_unknown: dataItem?.survey.card.q6_tri_unknown,
  q6_tri_yes: dataItem?.survey.card.q6_tri_yes,
  q6_ut_no: dataItem?.survey.card.q6_ut_no,
  q6_ut_unknown: dataItem?.survey.card.q6_ut_unknown,
  q6_ut_yes: dataItem?.survey.card.q6_ut_yes,
  q6_vg_no: dataItem?.survey.card.q6_vg_no,
  q6_vg_unknown: dataItem?.survey.card.q6_vg_unknown,
  q6_vg_yes: dataItem?.survey.card.q6_vg_yes,
  q6_vlddtt_no: dataItem?.survey.card.q6_vlddtt_no,
  q6_vlddtt_unknown: dataItem?.survey.card.q6_vlddtt_unknown,
  q6_vlddtt_yes: dataItem?.survey.card.q6_vlddtt_yes,
  q6_vldt_no: dataItem?.survey.card.q6_vldt_no,
  q6_vldt_unknown: dataItem?.survey.card.q6_vldt_unknown,
    q6_vldt_yes: dataItem?.survey.card.q6_vldt_yes,
    q8_no: dataItem?.survey.card.q8_no,
    q8_yes: dataItem?.survey.card.q8_yes,
    q9_no: dataItem?.survey.card.q9_no,
    q9_yes: dataItem?.survey.card.q9_yes,
    q12_htl_cth: dataItem?.survey.card.q12_htl_cth,
    q12_htl_hdch: dataItem?.survey.card.q12_htl_hdch,
    q12_htl_thvdb: dataItem?.survey.card.q12_htl_thvdb,
    q12_sdtgd_no: dataItem?.survey.card.q12_sdtgd_no,
    q12_sdtgd_yes: dataItem?.survey.card.q12_sdtgd_yes,
     q12_urb_no: dataItem?.survey.card.q12_urb_no,
    q12_urb_yes: dataItem?.survey.card.q12_urb_yes,
    q17_bt_no: dataItem?.survey.card.q17_bt_no,
  q17_bt_unknown: dataItem?.survey.card.q17_bt_unknown,
  q17_bt_yes: dataItem?.survey.card.q17_bt_yes,
  q17_btim_no: dataItem?.survey.card.q17_btim_no,
  q17_btim_unknown: dataItem?.survey.card.q17_btim_unknown,
  q17_btim_yes: dataItem?.survey.card.q17_btim_yes,
  q17_btm_no: dataItem?.survey.card.q17_btm_no,
  q17_btm_unknown: dataItem?.survey.card.q17_btm_unknown,
  q17_btm_yes: dataItem?.survey.card.q17_btm_yes,
  q17_dq_no: dataItem?.survey.card.q17_dq_no,
  q17_dq_unknown: dataItem?.survey.card.q17_dq_unknown,
  q17_dq_yes: dataItem?.survey.card.q17_dq_yes,
  q17_dtd_no: dataItem?.survey.card.q17_dtd_no,
  q17_dtd_unknown: dataItem?.survey.card.q17_dtd_unknown,
  q17_dtd_yes: dataItem?.survey.card.q17_dtd_yes,
  q17_lddtt_no: dataItem?.survey.card.q17_lddtt_no,
  q17_lddtt_unknown: dataItem?.survey.card.q17_lddtt_unknown,
  q17_lddtt_yes: dataItem?.survey.card.q17_lddtt_yes,
  q17_onmt_no: dataItem?.survey.card.q17_onmt_no,
  q17_onmt_unknown: dataItem?.survey.card.q17_onmt_unknown,
  q17_onmt_yes: dataItem?.survey.card.q17_onmt_yes,
  q17_pldd_no: dataItem?.survey.card.q17_pldd_no,
  q17_pldd_unknown: dataItem?.survey.card.q17_pldd_unknown,
  q17_pldd_yes: dataItem?.survey.card.q17_pldd_yes,
  q17_pldt_no: dataItem?.survey.card.q17_pldt_no,
  q17_pldt_unknown: dataItem?.survey.card.q17_pldt_unknown,
  q17_pldt_yes: dataItem?.survey.card.q17_pldt_yes,
  q17_rltt_no: dataItem?.survey.card.q17_rltt_no,
  q17_rltt_unknown: dataItem?.survey.card.q17_rltt_unknown,
  q17_rltt_yes: dataItem?.survey.card.q17_rltt_yes,
  q17_tha_no: dataItem?.survey.card.q17_tha_no,
  q17_tha_unknown: dataItem?.survey.card.q17_tha_unknown,
  q17_tha_yes: dataItem?.survey.card.q17_tha_yes,
  q17_utbt_no: dataItem?.survey.card.q17_utbt_no,
  q17_utbt_unknown: dataItem?.survey.card.q17_utbt_unknown,
  q17_utbt_yes: dataItem?.survey.card.q17_utbt_yes,
  q17_utdt_no: dataItem?.survey.card.q17_utdt_no,
  q17_utdt_unknown: dataItem?.survey.card.q17_utdt_unknown,
  q17_utdt_yes: dataItem?.survey.card.q17_utdt_yes,
  q17_utk_no: dataItem?.survey.card.q17_utk_no,
  q17_utk_unknown: dataItem?.survey.card.q17_utk_unknown,
  q17_utk_yes: dataItem?.survey.card.q17_utk_yes,
  q17_utt_no: dataItem?.survey.card.q17_utt_no,
  q17_utt_unknown: dataItem?.survey.card.q17_utt_unknown,
  q17_utt_yes: dataItem?.survey.card.q17_utt_yes,
  q17_uttq_no: dataItem?.survey.card.q17_uttq_no,
  q17_uttq_unknown: dataItem?.survey.card.q17_uttq_unknown,
  q17_uttq_yes: dataItem?.survey.card.q17_uttq_yes,
  q17_utv_no: dataItem?.survey.card.q17_utv_no,
  q17_utv_unknown: dataItem?.survey.card.q17_utv_unknown,
  q17_utv_yes: dataItem?.survey.card.q17_utv_yes,
  q17_vldt_no: dataItem?.survey.card.q17_vldt_no,
  q17_vldt_unknown: dataItem?.survey.card.q17_vldt_unknown,
    q17_vldt_yes: dataItem?.survey.card.q17_vldt_yes,
   q18_bingat_no: dataItem?.survey.card.q18_bingat_no,
  q18_bingat_yes: dataItem?.survey.card.q18_bingat_yes,
  q18_bn_no: dataItem?.survey.card.q18_bn_no,
  q18_bn_yes: dataItem?.survey.card.q18_bn_yes,
  q18_ca_no: dataItem?.survey.card.q18_ca_no,
  q18_ca_yes: dataItem?.survey.card.q18_ca_yes,
  q18_cb_no: dataItem?.survey.card.q18_cb_no,
  q18_cb_yes: dataItem?.survey.card.q18_cb_yes,
  q18_cm_no: dataItem?.survey.card.q18_cm_no,
  q18_cm_yes: dataItem?.survey.card.q18_cm_yes,
  q18_cmm_no: dataItem?.survey.card.q18_cmm_no,
  q18_cmm_yes: dataItem?.survey.card.q18_cmm_yes,
  q18_cvdvmmth_no: dataItem?.survey.card.q18_cvdvmmth_no,
  q18_cvdvmmth_yes: dataItem?.survey.card.q18_cvdvmmth_yes,
  q18_db_no: dataItem?.survey.card.q18_db_no,
  q18_db_yes: dataItem?.survey.card.q18_db_yes,
  q18_dck_no: dataItem?.survey.card.q18_dck_no,
  q18_dck_yes: dataItem?.survey.card.q18_dck_yes,
  q18_dcrm_no: dataItem?.survey.card.q18_dcrm_no,
  q18_dcrm_yes: dataItem?.survey.card.q18_dcrm_yes,
  q18_dk_no: dataItem?.survey.card.q18_dk_no,
  q18_dk_yes: dataItem?.survey.card.q18_dk_yes,
  q18_dl_no: dataItem?.survey.card.q18_dl_no,
  q18_dl_yes: dataItem?.survey.card.q18_dl_yes,
  q18_dm_no: dataItem?.survey.card.q18_dm_no,
    q18_dm_yes: dataItem?.survey.card.q18_dm_yes,
  q18_dmhtvd_no: dataItem?.survey.card.q18_dmhtvd_no,
  q18_dmhtvd_yes: dataItem?.survey.card.q18_dmhtvd_yes,
  q18_dn_no: dataItem?.survey.card.q18_dn_no,
  q18_dn_yes: dataItem?.survey.card.q18_dn_yes,
  q18_dnc_no: dataItem?.survey.card.q18_dnc_no,
  q18_dnc_yes: dataItem?.survey.card.q18_dnc_yes,
  q18_dnccknn_no: dataItem?.survey.card.q18_dnccknn_no,
  q18_dnccknn_yes: dataItem?.survey.card.q18_dnccknn_yes,
  q18_dtb_no: dataItem?.survey.card.q18_dtb_no,
  q18_dtb_yes: dataItem?.survey.card.q18_dtb_yes,
  q18_dtn_no: dataItem?.survey.card.q18_dtn_no,
  q18_dtn_yes: dataItem?.survey.card.q18_dtn_yes,
  q18_hd_no: dataItem?.survey.card.q18_hd_no,
  q18_hd_yes: dataItem?.survey.card.q18_hd_yes,
  q18_hk_no: dataItem?.survey.card.q18_hk_no,
  q18_hk_yes: dataItem?.survey.card.q18_hk_yes,
  q18_kk_no: dataItem?.survey.card.q18_kk_no,
  q18_kk_yes: dataItem?.survey.card.q18_kk_yes,
  q18_knn_no: dataItem?.survey.card.q18_knn_no,
  q18_knn_yes: dataItem?.survey.card.q18_knn_yes,
  q18_ktcdnhl_no: dataItem?.survey.card.q18_ktcdnhl_no,
  q18_ktcdnhl_yes: dataItem?.survey.card.q18_ktcdnhl_yes,
  q18_ktckn_no: dataItem?.survey.card.q18_ktckn_no,
  q18_ktckn_yes: dataItem?.survey.card.q18_ktckn_yes,
  q18_ktcknn_no: dataItem?.survey.card.q18_ktcknn_no,
  q18_ktcknn_yes: dataItem?.survey.card.q18_ktcknn_yes,
  q18_ktkgs_no: dataItem?.survey.card.q18_ktkgs_no,
  q18_ktkgs_yes: dataItem?.survey.card.q18_ktkgs_yes,
  q18_la_no: dataItem?.survey.card.q18_la_no,
  q18_la_yes: dataItem?.survey.card.q18_la_yes,
  q18_lm_no: dataItem?.survey.card.q18_lm_no,
    q18_lm_yes: dataItem?.survey.card.q18_lm_yes,
   q18_lr_no: dataItem?.survey.card.q18_lr_no,
  q18_lr_yes: dataItem?.survey.card.q18_lr_yes,
  q18_ltt_no: dataItem?.survey.card.q18_ltt_no,
  q18_ltt_yes: dataItem?.survey.card.q18_ltt_yes,
  q18_mm_no: dataItem?.survey.card.q18_mm_no,
  q18_mm_yes: dataItem?.survey.card.q18_mm_yes,
  q18_mtb_no: dataItem?.survey.card.q18_mtb_no,
  q18_mtb_yes: dataItem?.survey.card.q18_mtb_yes,
  q18_n_no: dataItem?.survey.card.q18_n_no,
  q18_n_yes: dataItem?.survey.card.q18_n_yes,
  q18_nd_no: dataItem?.survey.card.q18_nd_no,
  q18_nd_yes: dataItem?.survey.card.q18_nd_yes,
  q18_ndmdn_no: dataItem?.survey.card.q18_ndmdn_no,
  q18_ndmdn_yes: dataItem?.survey.card.q18_ndmdn_yes,
  q18_ndsn_no: dataItem?.survey.card.q18_ndsn_no,
  q18_ndsn_yes: dataItem?.survey.card.q18_ndsn_yes,
  q18_nkn_no: dataItem?.survey.card.q18_nkn_no,
  q18_nkn_yes: dataItem?.survey.card.q18_nkn_yes,
  q18_octa_no: dataItem?.survey.card.q18_octa_no,
  q18_octa_yes: dataItem?.survey.card.q18_octa_yes,
  q18_onoc_no: dataItem?.survey.card.q18_onoc_no,
  q18_onoc_yes: dataItem?.survey.card.q18_onoc_yes,
  q18_pc_no: dataItem?.survey.card.q18_pc_no,
  q18_pc_yes: dataItem?.survey.card.q18_pc_yes,
  q18_rlnn_no: dataItem?.survey.card.q18_rlnn_no,
  q18_rlnn_yes: dataItem?.survey.card.q18_rlnn_yes,
  q18_rlt_no: dataItem?.survey.card.q18_rlt_no,
  q18_rlt_yes: dataItem?.survey.card.q18_rlt_yes,
  q18_rt_no: dataItem?.survey.card.q18_rt_no,
  q18_rt_yes: dataItem?.survey.card.q18_rt_yes,
  q18_s_no: dataItem?.survey.card.q18_s_no,
  q18_s_yes: dataItem?.survey.card.q18_s_yes,
  q18_sc_no: dataItem?.survey.card.q18_sc_no,
  q18_sc_yes: dataItem?.survey.card.q18_sc_yes,
  q18_tb_no: dataItem?.survey.card.q18_tb_no,
  q18_tb_yes: dataItem?.survey.card.q18_tb_yes,
  q18_tc_no: dataItem?.survey.card.q18_tc_no,
  q18_tc_yes: dataItem?.survey.card.q18_tc_yes,
  q18_tdkd_no: dataItem?.survey.card.q18_tdkd_no,
  q18_tdkd_yes: dataItem?.survey.card.q18_tdkd_yes,
  q18_trc_no: dataItem?.survey.card.q18_trc_no,
  q18_trc_yes: dataItem?.survey.card.q18_trc_yes,
  q18_tth_no: dataItem?.survey.card.q18_tth_no,
  q18_tth_yes: dataItem?.survey.card.q18_tth_yes,
  q18_vd_no: dataItem?.survey.card.q18_vd_no,
    q18_vd_yes: dataItem?.survey.card.q18_vd_yes,
    q18_rlkn_yes: dataItem?.survey.card.q18_rlkn_yes,
   q18_rlkn_no: dataItem?.survey.card.q18_rlkn_no,
    q18_bcdmt_yes: dataItem?.survey.card.q18_bcdmt_yes,
  q18_bcdmt_no: dataItem?.survey.card.q18_bcdmt_no,
  })
  useEffect(() => {
    setDataSurvey(
      {
         q1_text: dataItem?.survey.card.q1_text,
    q2_text: dataItem?.survey.card.q2_text,
    q3_text: dataItem?.survey.card.q3_text,
    q4_text: dataItem?.survey.card.q4_text,
    q5_text: dataItem?.survey.card.q5_text,
    q6_note_text: dataItem?.survey.card.q6_note_text,

    q7_bc1_text: dataItem?.survey.card.q7_bc1_text,
    q7_bc2_text: dataItem?.survey.card.q7_bc2_text,
    q7_bc3_text: dataItem?.survey.card.q7_bc3_text,
    q7_bl1_text: dataItem?.survey.card.q7_bl1_text,
    q7_bl2_text: dataItem?.survey.card.q7_bl2_text,
    q7_bl3_text: dataItem?.survey.card.q7_bl3_text,
    
    q7_n1_text: dataItem?.survey.card.q7_n1_text,
    q7_n2_text: dataItem?.survey.card.q7_n2_text,
    q7_n3_text: dataItem?.survey.card.q7_n3_text,
    q11_bc1_text: dataItem?.survey.card.q11_bc1_text,
    q11_bc2_text: dataItem?.survey.card.q11_bc2_text,
    q11_bc3_text: dataItem?.survey.card.q11_bc3_text,

    q11_n1_text: dataItem?.survey.card.q11_n1_text,
    q11_n2_text: dataItem?.survey.card.q11_n2_text,
    q11_n3_text: dataItem?.survey.card.q11_n3_text,
    q11_pt1_text: dataItem?.survey.card.q11_pt1_text,
    q11_pt2_text: dataItem?.survey.card.q11_pt2_text,
    q11_pt3_text: dataItem?.survey.card.q11_pt3_text,

    q14_l1_text: dataItem?.survey.card.q14_l1_text,
    q14_l2_text: dataItem?.survey.card.q14_l2_text,
    q14_l3_text: dataItem?.survey.card.q14_l3_text,
    q14_ls1_text: dataItem?.survey.card.q14_ls1_text,
    q14_ls2_text: dataItem?.survey.card.q14_ls2_text,
    q14_ls3_text: dataItem?.survey.card.q14_ls3_text,

    q14_t1_text: dataItem?.survey.card.q14_t1_text,
    q14_t2_text: dataItem?.survey.card.q14_t2_text,
    q14_t3_text: dataItem?.survey.card.q14_t3_text,
    q15_text: dataItem?.survey.card.q15_text,
    q16_aer_text: dataItem?.survey.card.q16_aer_text,
    q16_br_text: dataItem?.survey.card.q16_br_text,

        q16_mr_text: dataItem?.survey.card.q16_mr_text,
        q10_text: dataItem?.survey.card.q10_text,
     q12_htl_hdch_text: dataItem?.survey.card.q12_htl_hdch_text,
        q13_text: dataItem?.survey.card.q13_text,
        q16_cer_text: dataItem?.survey.card.q16_cer_text,
     
      }
    )
  }, [dataItem?.survey])
    useEffect(() => {
    setDataSurveyCheck(
     {
    q6_bgm_no: dataItem?.survey.card.q6_bgm_no,
  q6_bgm_unknown: dataItem?.survey.card.q6_bgm_unknown,
  q6_bgm_yes: dataItem?.survey.card.q6_bgm_yes,
  q6_blhhk_no: dataItem?.survey.card.q6_blhhk_no,
  q6_blhhk_unknown: dataItem?.survey.card.q6_blhhk_unknown,
  q6_blhhk_yes: dataItem?.survey.card.q6_blhhk_yes,
  q6_bphhs_no: dataItem?.survey.card.q6_bphhs_no,
  q6_bphhs_unknown: dataItem?.survey.card.q6_bphhs_unknown,
  q6_bphhs_yes: dataItem?.survey.card.q6_bphhs_yes,
  q6_btg_no: dataItem?.survey.card.q6_btg_no,
  q6_btg_unknown: dataItem?.survey.card.q6_btg_unknown,
  q6_btg_yes: dataItem?.survey.card.q6_btg_yes,
  q6_btm_no: dataItem?.survey.card.q6_btm_no,
  q6_btm_unknown: dataItem?.survey.card.q6_btm_unknown,
  q6_btm_yes: dataItem?.survey.card.q6_btm_yes,
  q6_dkhdq_no: dataItem?.survey.card.q6_dkhdq_no,
  q6_dkhdq_unknown: dataItem?.survey.card.q6_dkhdq_unknown,
  q6_dkhdq_yes: dataItem?.survey.card.q6_dkhdq_yes,
  q6_dtd_no: dataItem?.survey.card.q6_dtd_no,
  q6_dtd_unknown: dataItem?.survey.card.q6_dtd_unknown,
  q6_dtd_yes: dataItem?.survey.card.q6_dtd_yes,
  q6_hiv_no: dataItem?.survey.card.q6_hiv_no,
  q6_hiv_unknown: dataItem?.survey.card.q6_hiv_unknown,
  q6_hiv_yes: dataItem?.survey.card.q6_hiv_yes,
  q6_lp_no: dataItem?.survey.card.q6_lp_no,
  q6_lp_unknown: dataItem?.survey.card.q6_lp_unknown,
  q6_lp_yes: dataItem?.survey.card.q6_lp_yes,
  q6_nhp_no: dataItem?.survey.card.q6_nhp_no,
  q6_nhp_unknown: dataItem?.survey.card.q6_nhp_unknown,
    q6_nhp_yes: dataItem?.survey.card.q6_nhp_yes,
    q6_pldtt_no: dataItem?.survey.card.q6_pldtt_no,
  q6_pldtt_unknown: dataItem?.survey.card.q6_pldtt_unknown,
  q6_pldtt_yes: dataItem?.survey.card.q6_pldtt_yes,
  q6_rldcm_no: dataItem?.survey.card.q6_rldcm_no,
  q6_rldcm_unknown: dataItem?.survey.card.q6_rldcm_unknown,
  q6_rldcm_yes: dataItem?.survey.card.q6_rldcm_yes,
  q6_rlttk_no: dataItem?.survey.card.q6_rlttk_no,
  q6_rlttk_unknown: dataItem?.survey.card.q6_rlttk_unknown,
  q6_rlttk_yes: dataItem?.survey.card.q6_rlttk_yes,
  q6_tha_no: dataItem?.survey.card.q6_tha_no,
  q6_tha_unknown: dataItem?.survey.card.q6_tha_unknown,
  q6_tha_yes: dataItem?.survey.card.q6_tha_yes,
  q6_tk_no: dataItem?.survey.card.q6_tk_no,
  q6_tk_unknown: dataItem?.survey.card.q6_tk_unknown,
  q6_tk_yes: dataItem?.survey.card.q6_tk_yes,
  q6_tm_no: dataItem?.survey.card.q6_tm_no,
  q6_tm_unknown: dataItem?.survey.card.q6_tm_unknown,
  q6_tm_yes: dataItem?.survey.card.q6_tm_yes,
  q6_tmg_no: dataItem?.survey.card.q6_tmg_no,
        q6_tmg_unknown: dataItem?.survey.card.q6_tmg_unknown,
  
  q6_tmg_yes: dataItem?.survey.card.q6_tmg_yes,
  q6_tri_no: dataItem?.survey.card.q6_tri_no,
  q6_tri_unknown: dataItem?.survey.card.q6_tri_unknown,
  q6_tri_yes: dataItem?.survey.card.q6_tri_yes,
  q6_ut_no: dataItem?.survey.card.q6_ut_no,
  q6_ut_unknown: dataItem?.survey.card.q6_ut_unknown,
  q6_ut_yes: dataItem?.survey.card.q6_ut_yes,
  q6_vg_no: dataItem?.survey.card.q6_vg_no,
  q6_vg_unknown: dataItem?.survey.card.q6_vg_unknown,
  q6_vg_yes: dataItem?.survey.card.q6_vg_yes,
  q6_vlddtt_no: dataItem?.survey.card.q6_vlddtt_no,
  q6_vlddtt_unknown: dataItem?.survey.card.q6_vlddtt_unknown,
  q6_vlddtt_yes: dataItem?.survey.card.q6_vlddtt_yes,
  q6_vldt_no: dataItem?.survey.card.q6_vldt_no,
  q6_vldt_unknown: dataItem?.survey.card.q6_vldt_unknown,
    q6_vldt_yes: dataItem?.survey.card.q6_vldt_yes,
    q8_no: dataItem?.survey.card.q8_no,
    q8_yes: dataItem?.survey.card.q8_yes,
    q9_no: dataItem?.survey.card.q9_no,
    q9_yes: dataItem?.survey.card.q9_yes,
    q12_htl_cth: dataItem?.survey.card.q12_htl_cth,
    q12_htl_hdch: dataItem?.survey.card.q12_htl_hdch,
    q12_htl_thvdb: dataItem?.survey.card.q12_htl_thvdb,
    q12_sdtgd_no: dataItem?.survey.card.q12_sdtgd_no,
    q12_sdtgd_yes: dataItem?.survey.card.q12_sdtgd_yes,
     q12_urb_no: dataItem?.survey.card.q12_urb_no,
    q12_urb_yes: dataItem?.survey.card.q12_urb_yes,
    q17_bt_no: dataItem?.survey.card.q17_bt_no,
  q17_bt_unknown: dataItem?.survey.card.q17_bt_unknown,
  q17_bt_yes: dataItem?.survey.card.q17_bt_yes,
  q17_btim_no: dataItem?.survey.card.q17_btim_no,
  q17_btim_unknown: dataItem?.survey.card.q17_btim_unknown,
  q17_btim_yes: dataItem?.survey.card.q17_btim_yes,
  q17_btm_no: dataItem?.survey.card.q17_btm_no,
  q17_btm_unknown: dataItem?.survey.card.q17_btm_unknown,
  q17_btm_yes: dataItem?.survey.card.q17_btm_yes,
  q17_dq_no: dataItem?.survey.card.q17_dq_no,
  q17_dq_unknown: dataItem?.survey.card.q17_dq_unknown,
  q17_dq_yes: dataItem?.survey.card.q17_dq_yes,
  q17_dtd_no: dataItem?.survey.card.q17_dtd_no,
  q17_dtd_unknown: dataItem?.survey.card.q17_dtd_unknown,
  q17_dtd_yes: dataItem?.survey.card.q17_dtd_yes,
  q17_lddtt_no: dataItem?.survey.card.q17_lddtt_no,
  q17_lddtt_unknown: dataItem?.survey.card.q17_lddtt_unknown,
  q17_lddtt_yes: dataItem?.survey.card.q17_lddtt_yes,
  q17_onmt_no: dataItem?.survey.card.q17_onmt_no,
  q17_onmt_unknown: dataItem?.survey.card.q17_onmt_unknown,
  q17_onmt_yes: dataItem?.survey.card.q17_onmt_yes,
  q17_pldd_no: dataItem?.survey.card.q17_pldd_no,
  q17_pldd_unknown: dataItem?.survey.card.q17_pldd_unknown,
  q17_pldd_yes: dataItem?.survey.card.q17_pldd_yes,
  q17_pldt_no: dataItem?.survey.card.q17_pldt_no,
  q17_pldt_unknown: dataItem?.survey.card.q17_pldt_unknown,
  q17_pldt_yes: dataItem?.survey.card.q17_pldt_yes,
  q17_rltt_no: dataItem?.survey.card.q17_rltt_no,
  q17_rltt_unknown: dataItem?.survey.card.q17_rltt_unknown,
  q17_rltt_yes: dataItem?.survey.card.q17_rltt_yes,
  q17_tha_no: dataItem?.survey.card.q17_tha_no,
  q17_tha_unknown: dataItem?.survey.card.q17_tha_unknown,
  q17_tha_yes: dataItem?.survey.card.q17_tha_yes,
  q17_utbt_no: dataItem?.survey.card.q17_utbt_no,
  q17_utbt_unknown: dataItem?.survey.card.q17_utbt_unknown,
  q17_utbt_yes: dataItem?.survey.card.q17_utbt_yes,
  q17_utdt_no: dataItem?.survey.card.q17_utdt_no,
  q17_utdt_unknown: dataItem?.survey.card.q17_utdt_unknown,
  q17_utdt_yes: dataItem?.survey.card.q17_utdt_yes,
  q17_utk_no: dataItem?.survey.card.q17_utk_no,
  q17_utk_unknown: dataItem?.survey.card.q17_utk_unknown,
  q17_utk_yes: dataItem?.survey.card.q17_utk_yes,
  q17_utt_no: dataItem?.survey.card.q17_utt_no,
  q17_utt_unknown: dataItem?.survey.card.q17_utt_unknown,
  q17_utt_yes: dataItem?.survey.card.q17_utt_yes,
  q17_uttq_no: dataItem?.survey.card.q17_uttq_no,
  q17_uttq_unknown: dataItem?.survey.card.q17_uttq_unknown,
  q17_uttq_yes: dataItem?.survey.card.q17_uttq_yes,
  q17_utv_no: dataItem?.survey.card.q17_utv_no,
  q17_utv_unknown: dataItem?.survey.card.q17_utv_unknown,
  q17_utv_yes: dataItem?.survey.card.q17_utv_yes,
  q17_vldt_no: dataItem?.survey.card.q17_vldt_no,
  q17_vldt_unknown: dataItem?.survey.card.q17_vldt_unknown,
    q17_vldt_yes: dataItem?.survey.card.q17_vldt_yes,
   q18_bingat_no: dataItem?.survey.card.q18_bingat_no,
  q18_bingat_yes: dataItem?.survey.card.q18_bingat_yes,
  q18_bn_no: dataItem?.survey.card.q18_bn_no,
  q18_bn_yes: dataItem?.survey.card.q18_bn_yes,
  q18_ca_no: dataItem?.survey.card.q18_ca_no,
  q18_ca_yes: dataItem?.survey.card.q18_ca_yes,
  q18_cb_no: dataItem?.survey.card.q18_cb_no,
  q18_cb_yes: dataItem?.survey.card.q18_cb_yes,
  q18_cm_no: dataItem?.survey.card.q18_cm_no,
  q18_cm_yes: dataItem?.survey.card.q18_cm_yes,
  q18_cmm_no: dataItem?.survey.card.q18_cmm_no,
  q18_cmm_yes: dataItem?.survey.card.q18_cmm_yes,
        q18_cvdvmmth_no: dataItem?.survey.card.q18_cvdvmmth_no,
  

  q18_cvdvmmth_yes: dataItem?.survey.card.q18_cvdvmmth_yes,
  q18_db_no: dataItem?.survey.card.q18_db_no,
  q18_db_yes: dataItem?.survey.card.q18_db_yes,
  q18_dck_no: dataItem?.survey.card.q18_dck_no,
  q18_dck_yes: dataItem?.survey.card.q18_dck_yes,
  q18_dcrm_no: dataItem?.survey.card.q18_dcrm_no,
  q18_dcrm_yes: dataItem?.survey.card.q18_dcrm_yes,
  q18_dk_no: dataItem?.survey.card.q18_dk_no,
  q18_dk_yes: dataItem?.survey.card.q18_dk_yes,
  q18_dl_no: dataItem?.survey.card.q18_dl_no,
  q18_dl_yes: dataItem?.survey.card.q18_dl_yes,
  q18_dm_no: dataItem?.survey.card.q18_dm_no,
    q18_dm_yes: dataItem?.survey.card.q18_dm_yes,
  q18_dmhtvd_no: dataItem?.survey.card.q18_dmhtvd_no,
  q18_dmhtvd_yes: dataItem?.survey.card.q18_dmhtvd_yes,
  q18_dn_no: dataItem?.survey.card.q18_dn_no,
  q18_dn_yes: dataItem?.survey.card.q18_dn_yes,
  q18_dnc_no: dataItem?.survey.card.q18_dnc_no,
  q18_dnc_yes: dataItem?.survey.card.q18_dnc_yes,
  q18_dnccknn_no: dataItem?.survey.card.q18_dnccknn_no,
  q18_dnccknn_yes: dataItem?.survey.card.q18_dnccknn_yes,
  q18_dtb_no: dataItem?.survey.card.q18_dtb_no,
  q18_dtb_yes: dataItem?.survey.card.q18_dtb_yes,
  q18_dtn_no: dataItem?.survey.card.q18_dtn_no,
  q18_dtn_yes: dataItem?.survey.card.q18_dtn_yes,
  q18_hd_no: dataItem?.survey.card.q18_hd_no,
  q18_hd_yes: dataItem?.survey.card.q18_hd_yes,
  q18_hk_no: dataItem?.survey.card.q18_hk_no,
  q18_hk_yes: dataItem?.survey.card.q18_hk_yes,
  q18_kk_no: dataItem?.survey.card.q18_kk_no,
  q18_kk_yes: dataItem?.survey.card.q18_kk_yes,
  q18_knn_no: dataItem?.survey.card.q18_knn_no,
  q18_knn_yes: dataItem?.survey.card.q18_knn_yes,
  q18_ktcdnhl_no: dataItem?.survey.card.q18_ktcdnhl_no,
  q18_ktcdnhl_yes: dataItem?.survey.card.q18_ktcdnhl_yes,
  q18_ktckn_no: dataItem?.survey.card.q18_ktckn_no,
  q18_ktckn_yes: dataItem?.survey.card.q18_ktckn_yes,
  q18_ktcknn_no: dataItem?.survey.card.q18_ktcknn_no,
  q18_ktcknn_yes: dataItem?.survey.card.q18_ktcknn_yes,
  q18_ktkgs_no: dataItem?.survey.card.q18_ktkgs_no,
  q18_ktkgs_yes: dataItem?.survey.card.q18_ktkgs_yes,
  q18_la_no: dataItem?.survey.card.q18_la_no,
  q18_la_yes: dataItem?.survey.card.q18_la_yes,
  q18_lm_no: dataItem?.survey.card.q18_lm_no,
    q18_lm_yes: dataItem?.survey.card.q18_lm_yes,
   q18_lr_no: dataItem?.survey.card.q18_lr_no,
  q18_lr_yes: dataItem?.survey.card.q18_lr_yes,
  q18_ltt_no: dataItem?.survey.card.q18_ltt_no,
  q18_ltt_yes: dataItem?.survey.card.q18_ltt_yes,
  q18_mm_no: dataItem?.survey.card.q18_mm_no,
  q18_mm_yes: dataItem?.survey.card.q18_mm_yes,
  q18_mtb_no: dataItem?.survey.card.q18_mtb_no,
  q18_mtb_yes: dataItem?.survey.card.q18_mtb_yes,
  q18_n_no: dataItem?.survey.card.q18_n_no,
  q18_n_yes: dataItem?.survey.card.q18_n_yes,
  q18_nd_no: dataItem?.survey.card.q18_nd_no,
  q18_nd_yes: dataItem?.survey.card.q18_nd_yes,
  q18_ndmdn_no: dataItem?.survey.card.q18_ndmdn_no,
  q18_ndmdn_yes: dataItem?.survey.card.q18_ndmdn_yes,
  q18_ndsn_no: dataItem?.survey.card.q18_ndsn_no,
  q18_ndsn_yes: dataItem?.survey.card.q18_ndsn_yes,
  q18_nkn_no: dataItem?.survey.card.q18_nkn_no,
  q18_nkn_yes: dataItem?.survey.card.q18_nkn_yes,
  q18_octa_no: dataItem?.survey.card.q18_octa_no,
  q18_octa_yes: dataItem?.survey.card.q18_octa_yes,
  q18_onoc_no: dataItem?.survey.card.q18_onoc_no,
  q18_onoc_yes: dataItem?.survey.card.q18_onoc_yes,
  q18_pc_no: dataItem?.survey.card.q18_pc_no,
  q18_pc_yes: dataItem?.survey.card.q18_pc_yes,
  q18_rlnn_no: dataItem?.survey.card.q18_rlnn_no,
  q18_rlnn_yes: dataItem?.survey.card.q18_rlnn_yes,
  q18_rlt_no: dataItem?.survey.card.q18_rlt_no,
  q18_rlt_yes: dataItem?.survey.card.q18_rlt_yes,
  q18_rt_no: dataItem?.survey.card.q18_rt_no,
  q18_rt_yes: dataItem?.survey.card.q18_rt_yes,
  q18_s_no: dataItem?.survey.card.q18_s_no,
  q18_s_yes: dataItem?.survey.card.q18_s_yes,
  q18_sc_no: dataItem?.survey.card.q18_sc_no,
  q18_sc_yes: dataItem?.survey.card.q18_sc_yes,
  q18_tb_no: dataItem?.survey.card.q18_tb_no,
  q18_tb_yes: dataItem?.survey.card.q18_tb_yes,
  q18_tc_no: dataItem?.survey.card.q18_tc_no,
  q18_tc_yes: dataItem?.survey.card.q18_tc_yes,
  q18_tdkd_no: dataItem?.survey.card.q18_tdkd_no,
  q18_tdkd_yes: dataItem?.survey.card.q18_tdkd_yes,
  q18_trc_no: dataItem?.survey.card.q18_trc_no,
  q18_trc_yes: dataItem?.survey.card.q18_trc_yes,
  q18_tth_no: dataItem?.survey.card.q18_tth_no,
  q18_tth_yes: dataItem?.survey.card.q18_tth_yes,
  q18_vd_no: dataItem?.survey.card.q18_vd_no,
        q18_vd_yes: dataItem?.survey.card.q18_vd_yes,
        q18_rlkn_yes: dataItem?.survey.card.q18_rlkn_yes,
    q18_rlkn_no: dataItem?.survey.card.q18_rlkn_no,
    q18_bcdmt_yes: dataItem?.survey.card.q18_bcdmt_yes,
  q18_bcdmt_no: dataItem?.survey.card.q18_bcdmt_no,
  }
    )
  },[dataItem?.survey])
   const onGetSV = async () => {
     const body ={
     master_id: r
    };
    await getDataSurvey(body);
  };
  const handleSaveSV = () => {
    if (validate()) {
      setLoading(true)
      const body = {
        card_survey_id: dataItem?.survey.card_survey_id,
        customer_id: dataItem?.survey.customer_id,
        master_id: dataItem?.survey.master_id,
        card: {
          q1: "Hãy mô tả ngắn gọn lý do chính (vấn đề sức khỏe) khiến Quý khách tới khám bệnh (ví dụ: đau bụng, nuốt khó, bệnh gan, các vấn đề khác, …)",
          q2: "Quý khách có vấn đề sức khỏe này từ khi nào?",
          q3: "Trước đây Quý khách đã đi khám về vấn đề sức khỏe này ở bệnh viện/phòng khám khác chưa?",
          q4: "Quý khách hàng đã từng nội soi trước đây chưa? Nếu có thì lần nội soi gần đây nhất đã bao lâu? Từ kết quả nội soi đó Bác sĩ đã chẩn đoán bệnh lý của Quý khách hàng là gì? Quý khách hàng vui lòng cung cấp kết quả nội soi lần gần nhất.",
          q5: "Hãy liệt kê các điều trị hay tên thuốc mà quý khách hàng đã sử dụng để điều trị vấn đề sức khỏe này.",
          q6: "Quý khách hàng có tiền sử bị bất kỳ bệnh lý nào dưới đây không?",
          q7: "Hãy liệt kê các tình trạng bệnh lý khác (chưa được kể ở trên) mà Quý khách đang có hoặc đã từng mắc phải:",
          q8: "Quý khách có cần sử dụng kháng sinh dự phòng trước khi chữa răng không?",
          q9: "Quý khách có van tim nhân tạo, từng thay khớp hoặc có mảnh ghép mạch máu nhân tạo không?",
          q10: "Quý khách đã từng truyền máu, truyền tiểu cầu hoặc các chế phẩm máu nào không? Nếu có thì lý do là gì? Khi nào?",
          q11: "Liệt kê các phẫu thuật mà Quý khách từng thực hiện và ghi chú nếu có biến chứng:",
          q12: "Thói quen:",
          q13: "Dị ứng thuốc: Vui lòng liệt kê bất kỳ loại thuốc nào mà Quý khách có tiền sử bị dị ứng",
          q14: "Thuốc đang uống: Vui lòng liệt kê các loại thuốc mà Quý khách sử dụng thường xuyên",
          q15: "Kể tên tất cả các thuốc khác mà Quý khách có sử dụng trong vòng 6 tháng vừa qua",
          q16: "Tiền sử gia đình: Quý khách hãy liệt kê các vấn đề sức khỏe/ bệnh lý mắc phải của từng thành viên trong gia đình sau đây:",
          q17: "Quý khách có bất kỳ người thân hay họ hàng có quan hệ huyết thống trong gia đình có các bệnh lý liệt kê dưới đây không?",
          q18: "Lược qua các cơ quan: Hiện tại hoặc gần đây Quý khách có bất kỳ triệu chứng nào sau đây không (hoặc liệu Quý khách có từng bị các triệu chứng này rõ và gây khó chịu trong quá khứ không)?",
          q1_text: dataSurveyText?.q1_text,
          q2_text: dataSurveyText?.q2_text,
          q3_text: dataSurveyText?.q3_text,
          q4_text: dataSurveyText?.q4_text,
          q5_text: dataSurveyText?.q5_text,
          q6_note_text: dataSurveyText?.q6_note_text,

          q7_bc1_text: dataSurveyText?.q7_bc1_text,
          q7_bc2_text: dataSurveyText?.q7_bc2_text,
          q7_bc3_text: dataSurveyText?.q7_bc3_text,
          q7_bl1_text: dataSurveyText?.q7_bl1_text,
          q7_bl2_text: dataSurveyText?.q7_bl2_text,
          q7_bl3_text: dataSurveyText?.q7_bl3_text,

          q7_n1_text: dataSurveyText?.q7_n1_text,
          q7_n2_text: dataSurveyText?.q7_n2_text,
          q7_n3_text: dataSurveyText?.q7_n3_text,
          q11_bc1_text: dataSurveyText?.q11_bc1_text,
          q11_bc2_text: dataSurveyText?.q11_bc2_text,
          q11_bc3_text: dataSurveyText?.q11_bc3_text,

          q11_n1_text: dataSurveyText?.q11_n1_text,
          q11_n2_text: dataSurveyText?.q11_n2_text,
          q11_n3_text: dataSurveyText?.q11_n3_text,
          q11_pt1_text: dataSurveyText?.q11_pt1_text,
          q11_pt2_text: dataSurveyText?.q11_pt2_text,
          q11_pt3_text: dataSurveyText?.q11_pt3_text,

          q14_l1_text: dataSurveyText?.q14_l1_text,
          q14_l2_text: dataSurveyText?.q14_l2_text,
          q14_l3_text: dataSurveyText?.q14_l3_text,
          q14_ls1_text: dataSurveyText?.q14_ls1_text,
          q14_ls2_text: dataSurveyText?.q14_ls2_text,
          q14_ls3_text: dataSurveyText?.q14_ls3_text,

          q14_t1_text: dataSurveyText?.q14_t1_text,
          q14_t2_text: dataSurveyText?.q14_t2_text,
          q14_t3_text: dataSurveyText?.q14_t3_text,
          q15_text: dataSurveyText?.q15_text,
          q16_aer_text: dataSurveyText?.q16_aer_text,
          q16_br_text: dataSurveyText?.q16_br_text,

          q16_mr_text: dataSurveyText?.q16_mr_text,
          q10_text: dataSurveyText?.q10_text,
          q12_htl_hdch_text: dataSurveyText?.q12_htl_hdch_text,
          q13_text: dataSurveyText?.q13_text,
          q16_cer_text: dataSurveyText?.q16_cer_text,
          q6_bgm_no: dataSurveyCheck?.q6_bgm_no,
          q6_bgm_unknown: dataSurveyCheck?.q6_bgm_unknown,
          q6_bgm_yes: dataSurveyCheck?.q6_bgm_yes,
          q6_blhhk_no: dataSurveyCheck?.q6_blhhk_no,
          q6_blhhk_unknown: dataSurveyCheck?.q6_blhhk_unknown,
          q6_blhhk_yes: dataSurveyCheck?.q6_blhhk_yes,
          q6_bphhs_no: dataSurveyCheck?.q6_bphhs_no,
          q6_bphhs_unknown: dataSurveyCheck?.q6_bphhs_unknown,
          q6_bphhs_yes: dataSurveyCheck?.q6_bphhs_yes,
          q6_btg_no: dataSurveyCheck?.q6_btg_no,
          q6_btg_unknown: dataSurveyCheck?.q6_btg_unknown,
          q6_btg_yes: dataSurveyCheck?.q6_btg_yes,
          q6_btm_no: dataSurveyCheck?.q6_btm_no,
          q6_btm_unknown: dataSurveyCheck?.q6_btm_unknown,
          q6_btm_yes: dataSurveyCheck?.q6_btm_yes,
          q6_dkhdq_no: dataSurveyCheck?.q6_dkhdq_no,
          q6_dkhdq_unknown: dataSurveyCheck?.q6_dkhdq_unknown,
          q6_dkhdq_yes: dataSurveyCheck?.q6_dkhdq_yes,
          q6_dtd_no: dataSurveyCheck?.q6_dtd_no,
          q6_dtd_unknown: dataSurveyCheck?.q6_dtd_unknown,
          q6_dtd_yes: dataSurveyCheck?.q6_dtd_yes,
          q6_hiv_no: dataSurveyCheck?.q6_hiv_no,
          q6_hiv_unknown: dataSurveyCheck?.q6_hiv_unknown,
          q6_hiv_yes: dataSurveyCheck?.q6_hiv_yes,
          q6_lp_no: dataSurveyCheck?.q6_lp_no,
          q6_lp_unknown: dataSurveyCheck?.q6_lp_unknown,
          q6_lp_yes: dataSurveyCheck?.q6_lp_yes,
          q6_nhp_no: dataSurveyCheck?.q6_nhp_no,
          q6_nhp_unknown: dataSurveyCheck?.q6_nhp_unknown,
          q6_nhp_yes: dataSurveyCheck?.q6_nhp_yes,
          q6_pldtt_no: dataSurveyCheck?.q6_pldtt_no,
          q6_pldtt_unknown: dataSurveyCheck?.q6_pldtt_unknown,
          q6_pldtt_yes: dataSurveyCheck?.q6_pldtt_yes,
          q6_rldcm_no: dataSurveyCheck?.q6_rldcm_no,
          q6_rldcm_unknown: dataSurveyCheck?.q6_rldcm_unknown,
          q6_rldcm_yes: dataSurveyCheck?.q6_rldcm_yes,
          q6_rlttk_no: dataSurveyCheck?.q6_rlttk_no,
          q6_rlttk_unknown: dataSurveyCheck?.q6_rlttk_unknown,
          q6_rlttk_yes: dataSurveyCheck?.q6_rlttk_yes,
          q6_tha_no: dataSurveyCheck?.q6_tha_no,
          q6_tha_unknown: dataSurveyCheck?.q6_tha_unknown,
          q6_tha_yes: dataSurveyCheck?.q6_tha_yes,
          q6_tk_no: dataSurveyCheck?.q6_tk_no,
          q6_tk_unknown: dataSurveyCheck?.q6_tk_unknown,
          q6_tk_yes: dataSurveyCheck?.q6_tk_yes,
          q6_tm_no: dataSurveyCheck?.q6_tm_no,
          q6_tm_unknown: dataSurveyCheck?.q6_tm_unknown,
          q6_tm_yes: dataSurveyCheck?.q6_tm_yes,
          q6_tmg_no: dataSurveyCheck?.q6_tmg_no,
          q6_tmg_unknown: dataSurveyCheck?.q6_tmg_unknown,
          q6_tmg_yes: dataSurveyCheck?.q6_tmg_yes,
          q6_tri_no: dataSurveyCheck?.q6_tri_no,
          q6_tri_unknown: dataSurveyCheck?.q6_tri_unknown,
          q6_tri_yes: dataSurveyCheck?.q6_tri_yes,
          q6_ut_no: dataSurveyCheck?.q6_ut_no,
          q6_ut_unknown: dataSurveyCheck?.q6_ut_unknown,
          q6_ut_yes: dataSurveyCheck?.q6_ut_yes,
          q6_vg_no: dataSurveyCheck?.q6_vg_no,
          q6_vg_unknown: dataSurveyCheck?.q6_vg_unknown,
          q6_vg_yes: dataSurveyCheck?.q6_vg_yes,
          q6_vlddtt_no: dataSurveyCheck?.q6_vlddtt_no,
          q6_vlddtt_unknown: dataSurveyCheck?.q6_vlddtt_unknown,
          q6_vlddtt_yes: dataSurveyCheck?.q6_vlddtt_yes,
          q6_vldt_no: dataSurveyCheck?.q6_vldt_no,
          q6_vldt_unknown: dataSurveyCheck?.q6_vldt_unknown,
          q6_vldt_yes: dataSurveyCheck?.q6_vldt_yes,
          q8_no: dataSurveyCheck?.q8_no,
          q8_yes: dataSurveyCheck?.q8_yes,
          q9_no: dataSurveyCheck?.q9_no,
          q9_yes: dataSurveyCheck?.q9_yes,
          q12_htl_cth: dataSurveyCheck?.q12_htl_cth,
          q12_htl_hdch: dataSurveyCheck?.q12_htl_hdch,
          q12_htl_thvdb: dataSurveyCheck?.q12_htl_thvdb,
          q12_sdtgd_no: dataSurveyCheck?.q12_sdtgd_no,
          q12_sdtgd_yes: dataSurveyCheck?.q12_sdtgd_yes,
          q12_urb_no: dataSurveyCheck?.q12_urb_no,
          q12_urb_yes: dataSurveyCheck?.q12_urb_yes,
          q17_bt_no: dataSurveyCheck?.q17_bt_no,
          q17_bt_unknown: dataSurveyCheck?.q17_bt_unknown,
          q17_bt_yes: dataSurveyCheck?.q17_bt_yes,
          q17_btim_no: dataSurveyCheck?.q17_btim_no,
          q17_btim_unknown: dataSurveyCheck?.q17_btim_unknown,
          q17_btim_yes: dataSurveyCheck?.q17_btim_yes,
          q17_btm_no: dataSurveyCheck?.q17_btm_no,
          q17_btm_unknown: dataSurveyCheck?.q17_btm_unknown,
          q17_btm_yes: dataSurveyCheck?.q17_btm_yes,
          q17_dq_no: dataSurveyCheck?.q17_dq_no,
          q17_dq_unknown: dataSurveyCheck?.q17_dq_unknown,
          q17_dq_yes: dataSurveyCheck?.q17_dq_yes,
          q17_dtd_no: dataSurveyCheck?.q17_dtd_no,
          q17_dtd_unknown: dataSurveyCheck?.q17_dtd_unknown,
          q17_dtd_yes: dataSurveyCheck?.q17_dtd_yes,
          q17_lddtt_no: dataSurveyCheck?.q17_lddtt_no,
          q17_lddtt_unknown: dataSurveyCheck?.q17_lddtt_unknown,
          q17_lddtt_yes: dataSurveyCheck?.q17_lddtt_yes,
          q17_onmt_no: dataSurveyCheck?.q17_onmt_no,
          q17_onmt_unknown: dataSurveyCheck?.q17_onmt_unknown,
          q17_onmt_yes: dataSurveyCheck?.q17_onmt_yes,
          q17_pldd_no: dataSurveyCheck?.q17_pldd_no,
          q17_pldd_unknown: dataSurveyCheck?.q17_pldd_unknown,
          q17_pldd_yes: dataSurveyCheck?.q17_pldd_yes,
          q17_pldt_no: dataSurveyCheck?.q17_pldt_no,
          q17_pldt_unknown: dataSurveyCheck?.q17_pldt_unknown,
          q17_pldt_yes: dataSurveyCheck?.q17_pldt_yes,
          q17_rltt_no: dataSurveyCheck?.q17_rltt_no,
          q17_rltt_unknown: dataSurveyCheck?.q17_rltt_unknown,
          q17_rltt_yes: dataSurveyCheck?.q17_rltt_yes,
          q17_tha_no: dataSurveyCheck?.q17_tha_no,
          q17_tha_unknown: dataSurveyCheck?.q17_tha_unknown,
          q17_tha_yes: dataSurveyCheck?.q17_tha_yes,
          q17_utbt_no: dataSurveyCheck?.q17_utbt_no,
          q17_utbt_unknown: dataSurveyCheck?.q17_utbt_unknown,
          q17_utbt_yes: dataSurveyCheck?.q17_utbt_yes,
          q17_utdt_no: dataSurveyCheck?.q17_utdt_no,
          q17_utdt_unknown: dataSurveyCheck?.q17_utdt_unknown,
          q17_utdt_yes: dataSurveyCheck?.q17_utdt_yes,
          q17_utk_no: dataSurveyCheck?.q17_utk_no,
          q17_utk_unknown: dataSurveyCheck?.q17_utk_unknown,
          q17_utk_yes: dataSurveyCheck?.q17_utk_yes,
          q17_utt_no: dataSurveyCheck?.q17_utt_no,
          q17_utt_unknown: dataSurveyCheck?.q17_utt_unknown,
          q17_utt_yes: dataSurveyCheck?.q17_utt_yes,
          q17_uttq_no: dataSurveyCheck?.q17_uttq_no,
          q17_uttq_unknown: dataSurveyCheck?.q17_uttq_unknown,
          q17_uttq_yes: dataSurveyCheck?.q17_uttq_yes,
          q17_utv_no: dataSurveyCheck?.q17_utv_no,
          q17_utv_unknown: dataSurveyCheck?.q17_utv_unknown,
          q17_utv_yes: dataSurveyCheck?.q17_utv_yes,
          q17_vldt_no: dataSurveyCheck?.q17_vldt_no,
          q17_vldt_unknown: dataSurveyCheck?.q17_vldt_unknown,
          q17_vldt_yes: dataSurveyCheck?.q17_vldt_yes,
          q18_bingat_no: dataSurveyCheck?.q18_bingat_no,
          q18_bingat_yes: dataSurveyCheck?.q18_bingat_yes,
          q18_bn_no: dataSurveyCheck?.q18_bn_no,
          q18_bn_yes: dataSurveyCheck?.q18_bn_yes,
          q18_ca_no: dataSurveyCheck?.q18_ca_no,
          q18_ca_yes: dataSurveyCheck?.q18_ca_yes,
          q18_cb_no: dataSurveyCheck?.q18_cb_no,
          q18_cb_yes: dataSurveyCheck?.q18_cb_yes,
          q18_cm_no: dataSurveyCheck?.q18_cm_no,
          q18_cm_yes: dataSurveyCheck?.q18_cm_yes,
          q18_cmm_no: dataSurveyCheck?.q18_cmm_no,
          q18_cmm_yes: dataSurveyCheck?.q18_cmm_yes,
          q18_cvdvmmth_no: dataSurveyCheck?.q18_cvdvmmth_no,
          q18_cvdvmmth_yes: dataSurveyCheck?.q18_cvdvmmth_yes,
          q18_db_no: dataSurveyCheck?.q18_db_no,
          q18_db_yes: dataSurveyCheck?.q18_db_yes,
          q18_dck_no: dataSurveyCheck?.q18_dck_no,
          q18_dck_yes: dataSurveyCheck?.q18_dck_yes,
          q18_dcrm_no: dataSurveyCheck?.q18_dcrm_no,
          q18_dcrm_yes: dataSurveyCheck?.q18_dcrm_yes,
          q18_dk_no: dataSurveyCheck?.q18_dk_no,
          q18_dk_yes: dataSurveyCheck?.q18_dk_yes,
          q18_dl_no: dataSurveyCheck?.q18_dl_no,
          q18_dl_yes: dataSurveyCheck?.q18_dl_yes,
          q18_dm_no: dataSurveyCheck?.q18_dm_no,
          q18_dm_yes: dataSurveyCheck?.q18_dm_yes,
          q18_dmhtvd_no: dataSurveyCheck?.q18_dmhtvd_no,
          q18_dmhtvd_yes: dataSurveyCheck?.q18_dmhtvd_yes,
          q18_dn_no: dataSurveyCheck?.q18_dn_no,
          q18_dn_yes: dataSurveyCheck?.q18_dn_yes,
          q18_dnc_no: dataSurveyCheck?.q18_dnc_no,
          q18_dnc_yes: dataSurveyCheck?.q18_dnc_yes,
          q18_dnccknn_no: dataSurveyCheck?.q18_dnccknn_no,
          q18_dnccknn_yes: dataSurveyCheck?.q18_dnccknn_yes,
          q18_dtb_no: dataSurveyCheck?.q18_dtb_no,
          q18_dtb_yes: dataSurveyCheck?.q18_dtb_yes,
          q18_dtn_no: dataSurveyCheck?.q18_dtn_no,
          q18_dtn_yes: dataSurveyCheck?.q18_dtn_yes,
          q18_hd_no: dataSurveyCheck?.q18_hd_no,
          q18_hd_yes: dataSurveyCheck?.q18_hd_yes,
          q18_hk_no: dataSurveyCheck?.q18_hk_no,
          q18_hk_yes: dataSurveyCheck?.q18_hk_yes,
          q18_kk_no: dataSurveyCheck?.q18_kk_no,
          q18_kk_yes: dataSurveyCheck?.q18_kk_yes,
          q18_knn_no: dataSurveyCheck?.q18_knn_no,
          q18_knn_yes: dataSurveyCheck?.q18_knn_yes,
          q18_ktcdnhl_no: dataSurveyCheck?.q18_ktcdnhl_no,
          q18_ktcdnhl_yes: dataSurveyCheck?.q18_ktcdnhl_yes,
          q18_ktckn_no: dataSurveyCheck?.q18_ktckn_no,
          q18_ktckn_yes: dataSurveyCheck?.q18_ktckn_yes,
          q18_ktcknn_no: dataSurveyCheck?.q18_ktcknn_no,
          q18_ktcknn_yes: dataSurveyCheck?.q18_ktcknn_yes,
          q18_ktkgs_no: dataSurveyCheck?.q18_ktkgs_no,
          q18_ktkgs_yes: dataSurveyCheck?.q18_ktkgs_yes,
          q18_la_no: dataSurveyCheck?.q18_la_no,
          q18_la_yes: dataSurveyCheck?.q18_la_yes,
          q18_lm_no: dataSurveyCheck?.q18_lm_no,
          q18_lm_yes: dataSurveyCheck?.q18_lm_yes,
          q18_lr_no: dataSurveyCheck?.q18_lr_no,
          q18_lr_yes: dataSurveyCheck?.q18_lr_yes,
          q18_ltt_no: dataSurveyCheck?.q18_ltt_no,
          q18_ltt_yes: dataSurveyCheck?.q18_ltt_yes,
          q18_mm_no: dataSurveyCheck?.q18_mm_no,
          q18_mm_yes: dataSurveyCheck?.q18_mm_yes,
          q18_mtb_no: dataSurveyCheck?.q18_mtb_no,
          q18_mtb_yes: dataSurveyCheck?.q18_mtb_yes,
          q18_n_no: dataSurveyCheck?.q18_n_no,
          q18_n_yes: dataSurveyCheck?.q18_n_yes,
          q18_nd_no: dataSurveyCheck?.q18_nd_no,
          q18_nd_yes: dataSurveyCheck?.q18_nd_yes,
          q18_ndmdn_no: dataSurveyCheck?.q18_ndmdn_no,
          q18_ndmdn_yes: dataSurveyCheck?.q18_ndmdn_yes,
          q18_ndsn_no: dataSurveyCheck?.q18_ndsn_no,
          q18_ndsn_yes: dataSurveyCheck?.q18_ndsn_yes,
          q18_nkn_no: dataSurveyCheck?.q18_nkn_no,
          q18_nkn_yes: dataSurveyCheck?.q18_nkn_yes,
          q18_octa_no: dataSurveyCheck?.q18_octa_no,
          q18_octa_yes: dataSurveyCheck?.q18_octa_yes,
          q18_onoc_no: dataSurveyCheck?.q18_onoc_no,
          q18_onoc_yes: dataSurveyCheck?.q18_onoc_yes,
          q18_pc_no: dataSurveyCheck?.q18_pc_no,
          q18_pc_yes: dataSurveyCheck?.q18_pc_yes,
          q18_rlnn_no: dataSurveyCheck?.q18_rlnn_no,
          q18_rlnn_yes: dataSurveyCheck?.q18_rlnn_yes,
          q18_rlt_no: dataSurveyCheck?.q18_rlt_no,
          q18_rlt_yes: dataSurveyCheck?.q18_rlt_yes,
          q18_rt_no: dataSurveyCheck?.q18_rt_no,
          q18_rt_yes: dataSurveyCheck?.q18_rt_yes,
          q18_s_no: dataSurveyCheck?.q18_s_no,
          q18_s_yes: dataSurveyCheck?.q18_s_yes,
          q18_sc_no: dataSurveyCheck?.q18_sc_no,
          q18_sc_yes: dataSurveyCheck?.q18_sc_yes,
          q18_tb_no: dataSurveyCheck?.q18_tb_no,
          q18_tb_yes: dataSurveyCheck?.q18_tb_yes,
          q18_tc_no: dataSurveyCheck?.q18_tc_no,
          q18_tc_yes: dataSurveyCheck?.q18_tc_yes,
          q18_tdkd_no: dataSurveyCheck?.q18_tdkd_no,
          q18_tdkd_yes: dataSurveyCheck?.q18_tdkd_yes,
          q18_trc_no: dataSurveyCheck?.q18_trc_no,
          q18_trc_yes: dataSurveyCheck?.q18_trc_yes,
          q18_tth_no: dataSurveyCheck?.q18_tth_no,
          q18_tth_yes: dataSurveyCheck?.q18_tth_yes,
          q18_vd_no: dataSurveyCheck?.q18_vd_no,
          q18_vd_yes: dataSurveyCheck?.q18_vd_yes,
          q18_rlkn_yes: dataSurveyCheck?.q18_rlkn_yes,
          q18_rlkn_no: dataSurveyCheck?.q18_rlkn_no,
          q18_bcdmt_yes: dataSurveyCheck?.q18_bcdmt_yes,
          q18_bcdmt_no: dataSurveyCheck?.q18_bcdmt_no,
        },
        status: "inprogress"
      }
       SaveSV(body)
    }
  }
  const handleChange = (questionGroup: string, selectedKey: string) => {
      
    setDataSurveyCheck((prevState) => ({
      ...prevState,
      // Đặt tất cả trạng thái trong nhóm về false và chỉ bật trạng thái được chọn
      [`${questionGroup}_yes`]: selectedKey === `${questionGroup}_yes`,
      [`${questionGroup}_no`]: selectedKey === `${questionGroup}_no`,
      [`${questionGroup}_unknown`]: selectedKey === `${questionGroup}_unknown`,
    }));

 
  };
    const handleChange2 = (questionGroup: string, selectedKey: string) => {
    setDataSurveyCheck((prevState) => ({
      ...prevState,
      // Đặt tất cả trạng thái trong nhóm về false và chỉ bật trạng thái được chọn
      [`${questionGroup}_cth`]: selectedKey === `${questionGroup}_cth`,
      [`${questionGroup}_hdch`]: selectedKey === `${questionGroup}_hdch`,
      [`${questionGroup}_thvdb`]: selectedKey === `${questionGroup}_thvdb`,
    }));

 
  };
  return (
     
        <Spin
            style={{maxHeight:"600px",left:"-20px", height: "100vh", overflowY: "auto" }}
                        spinning={loadingPage}
                        size="large"
                        indicator={
                          <img
                            className="loader"
                            style={{
                              width: 70,
                              height: 70,
                              objectFit: 'cover',
                              backgroundColor: 'transparent',
                            }}
                            src={logo}
                          />
                        } >
    <div className="p-dashboard">
        <div style={{ width: "100vw", height: "auto", background: "#fff", borderRadius: "6px",  marginBottom: "10px" }}>
           <div style={{ width: "100%", background: "#f4f3f2", paddingLeft: "20px", paddingTop:"5px",paddingBottom:"5px"}}>
                      <img src={logoH} alt="" width={200}/>
                    </div>
        <div style={{paddingLeft: "20px", paddingTop:"15px"}}>   <Typography content="BẢNG CÂU HỎI SÀNG LỌC VỀ TIỀN SỬ BỆNH LÝ" modifiers={['16x28', 'jet', '600',"uppercase"]} styles={{color:"#03566e"}}/></div> 

     
         
        </div>
        <div style={{maxHeight:"90%", overflowY:"auto", padding:"15px",paddingBottom:"20%"}}>
          <div ng-if="dataItem?.survey.card">
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px",}} >1. {dataItem?.survey.card.q1}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
                <textarea id="tb_q1_text" tabIndex={1} className="htmlForm-control htmlForm-control-sm" style={{ width: "100%", border: "1px solid rgb(169, 167, 167)", borderRadius: "5px", paddingLeft: "5px", paddingRight: "5px" }} value={dataSurveyText.q1_text} onChange={(e) => { setDataSurvey({ ...dataSurveyText, q1_text: e.target.value }) }}></textarea>
                 {errors.q1_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q1_text}
              </p>
            )}
        </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}} >2. {dataItem?.survey.card.q2}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
            <textarea id="tb_q2_text" name="q2_text" tabIndex={2} className="htmlForm-control htmlForm-control-sm" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} value={dataSurveyText.q2_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q2_text: e.target.value})}}></textarea>
         {errors.q2_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q2_text}
              </p>
            )}
              </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}} >3. {dataItem?.survey.card.q3}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
            <textarea id="tb_q3_text" name="q3_text" tabIndex={3} className="htmlForm-control htmlForm-control-sm" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}}  value={dataSurveyText.q3_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q3_text: e.target.value})}}></textarea>
             {errors.q3_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q3_text}
              </p>
            )}
              </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>4. {dataItem?.survey.card.q4}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
            <textarea id="tb_q4_text" name="q4_text" tabIndex={4} className="htmlForm-control htmlForm-control-sm" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}}value={dataSurveyText.q4_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q4_text: e.target.value})}}></textarea>
             {errors.q4_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q4_text}
              </p>
            )}
              </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}} >5. {dataItem?.survey.card.q5}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
                <textarea id="tb_q5_text" name="q5_text" tabIndex={5} className="htmlForm-control htmlForm-control-sm"  style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}}  value={dataSurveyText.q5_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q5_text: e.target.value})}}></textarea>
               {errors.q5_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q5_text}
              </p>
            )}
              </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}} >6. {dataItem?.survey.card.q6}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bất thường xét nghiệm gan/ tăng men gan:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px", marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={6} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tmg_yes" name="chk_q6_tmg"
                        checked={dataSurveyCheck.q6_tmg_yes}
                        onChange={() => handleChange('q6_tmg', 'q6_tmg_yes')}
                      />
                        <label htmlFor="chk_q6_tmg_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={7} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tmg_no" name="chk_q6_tmg"   checked={dataSurveyCheck.q6_tmg_no}
                        onChange={() => handleChange('q6_tmg', 'q6_tmg_no')} />
                        <label htmlFor="chk_q6_tmg_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={8} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tmg_unknown" name="chk_q6_tmg"
                        checked={dataSurveyCheck.q6_tmg_unknown}
                        onChange={() => handleChange('q6_tmg', 'q6_tmg_unknown')} />
                        <label htmlFor="chk_q6_tmg_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                    </div>
                    </div>
            </div>
            <div className="row htmlForm-group">
                <div className="col-sm-6 font-weight-bold" style={{marginBottom:"5px"}}>Viêm gan:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                     <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={9} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_vg_yes" name="chk_q6_vg"  checked={dataSurveyCheck.q6_vg_yes}
                        onChange={() => handleChange('q6_vg', 'q6_vg_yes')} />
                        <label htmlFor="chk_q6_vg_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={10} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_vg_no" name="chk_q6_vg" checked={dataSurveyCheck.q6_vg_no}
                        onChange={() => handleChange('q6_vg', 'q6_vg_no')}/>
                        <label htmlFor="chk_q6_vg_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={11} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_vg_unknown" name="chk_q6_vg" checked={dataSurveyCheck.q6_vg_unknown}
                        onChange={() => handleChange('q6_vg', 'q6_vg_unknown')}/>
                        <label htmlFor="chk_q6_vg_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div>
                </div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bệnh gan mật:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                        <input
            type="radio"
            id="chk_q6_bgm_yes"
            name="chk_q6_bgm"
            checked={dataSurveyCheck.q6_bgm_yes}
            onChange={() => handleChange('q6_bgm', 'q6_bgm_yes')}
          />
          <label
            htmlFor="chk_q6_bgm_yes"
            className="custom-control-label cursor-pointer text-danger"
          >
            Có
          </label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                       <input
            type="radio"
            id="chk_q6_bgm_no"
            name="chk_q6_bgm"
            checked={dataSurveyCheck.q6_bgm_no}
            onChange={() => handleChange('q6_bgm', 'q6_bgm_no')}
          />
          <label
            htmlFor="chk_q6_bgm_no"
            className="custom-control-label cursor-pointer"
          >
            Không
          </label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                        <input
            type="radio"
            id="chk_q6_bgm_unknown"
            name="chk_q6_bgm"
            checked={dataSurveyCheck.q6_bgm_unknown}
            onChange={() => handleChange('q6_bgm', 'q6_bgm_unknown')}
          />
          <label
            htmlFor="chk_q6_bgm_unknown"
            className="custom-control-label cursor-pointer"
          >
            Không rõ
          </label>
                    </div>
                  </div>
                  </div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Viêm loét dạ dày tá tràng:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={15} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_vlddtt_yes" name="chk_q6_vlddtt" ng-checked={dataItem?.survey.card.q6_vlddtt_yes} 
                       checked={dataSurveyCheck.q6_vlddtt_yes}
            onChange={() => handleChange('q6_vlddtt', 'q6_vlddtt_yes')}
                      />
                        <label htmlFor="chk_q6_vlddtt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={16} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_vlddtt_no" name="chk_q6_vlddtt" ng-checked={dataItem?.survey.card.q6_vlddtt_no}
                        checked={dataSurveyCheck.q6_vlddtt_no}
            onChange={() => handleChange('q6_vlddtt', 'q6_vlddtt_no')}
                      />
                        <label htmlFor="chk_q6_vlddtt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={17} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_vlddtt_unknown" name="chk_q6_vlddtt" ng-checked={dataItem?.survey.card.q6_vlddtt_unknown}
                        checked={dataSurveyCheck.q6_vlddtt_unknown}
            onChange={() => handleChange('q6_vlddtt', 'q6_vlddtt_unknown')}
                      />
                        <label htmlFor="chk_q6_vlddtt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div>
            </div></div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Nhiễm Hp:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={18} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_nhp_yes" name="chk_q6_nhp" ng-checked={dataItem?.survey.card.q6_nhp_yes}
                        checked={dataSurveyCheck.q6_nhp_yes}
            onChange={() => handleChange('q6_nhp', 'q6_nhp_yes')}
                      />
                        <label htmlFor="chk_q6_nhp_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={19} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_nhp_no" name="chk_q6_nhp" ng-checked={dataItem?.survey.card.q6_nhp_no}
                       checked={dataSurveyCheck.q6_nhp_no}
            onChange={() => handleChange('q6_nhp', 'q6_nhp_no')}
                      />
                        <label htmlFor="chk_q6_nhp_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={20} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_nhp_unknown" name="chk_q6_nhp" ng-checked={dataItem?.survey.card.q6_nhp_unknown}
                      checked={dataSurveyCheck.q6_nhp_unknown}
            onChange={() => handleChange('q6_nhp', 'q6_nhp_unknown')}
                      />
                        <label htmlFor="chk_q6_nhp_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Viêm loét đại tràng:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={21} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_vldt_yes" name="chk_q6_vldt" ng-checked={dataItem?.survey.card.q6_vldt_yes}
                      checked={dataSurveyCheck.q6_vldt_yes}
            onChange={() => handleChange('q6_vldt', 'q6_vldt_yes')}
                      />
                        <label htmlFor="chk_q6_vldt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={22} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_vldt_no" name="chk_q6_vldt" ng-checked={dataItem?.survey.card.q6_vldt_no}
                       checked={dataSurveyCheck.q6_vldt_no}
            onChange={() => handleChange('q6_vldt', 'q6_vldt_no')}
                      />
                        <label htmlFor="chk_q6_vldt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={23} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_vldt_unknown" name="chk_q6_vldt" ng-checked={dataItem?.survey.card.q6_vldt_unknown}
                       checked={dataSurveyCheck.q6_vldt_unknown}
            onChange={() => handleChange('q6_vldt', 'q6_vldt_unknown')}
                      />
                        <label htmlFor="chk_q6_vldt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Polyp đại trực tràng:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={24} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_pldtt_yes" name="chk_q6_pldtt" ng-checked={dataItem?.survey.card.q6_pldtt_yes}
                       checked={dataSurveyCheck.q6_pldtt_yes}
            onChange={() => handleChange('q6_pldtt', 'q6_pldtt_yes')}
                      />
                        <label htmlFor="chk_q6_pldtt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={25} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_pldtt_no" name="chk_q6_pldtt" ng-checked={dataItem?.survey.card.q6_pldtt_no}
                       checked={dataSurveyCheck.q6_pldtt_no}
            onChange={() => handleChange('q6_pldtt', 'q6_pldtt_no')}
                      />
                        <label htmlFor="chk_q6_pldtt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={26} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_pldtt_unknown" name="chk_q6_pldtt" ng-checked={dataItem?.survey.card.q6_pldtt_unknown}
                      checked={dataSurveyCheck.q6_pldtt_unknown}
            onChange={() => handleChange('q6_pldtt', 'q6_pldtt_unknown')}
                      />
                        <label htmlFor="chk_q6_pldtt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Trĩ:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={27} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tri_yes" name="chk_q6_tri" ng-checked={dataItem?.survey.card.q6_tri_yes}
                      checked={dataSurveyCheck.q6_tri_yes}
            onChange={() => handleChange('q6_tri', 'q6_tri_yes')}
                      
                      />
                        <label htmlFor="chk_q6_tri_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={28} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tri_no" name="chk_q6_tri" ng-checked={dataItem?.survey.card.q6_tri_no}
                       checked={dataSurveyCheck.q6_tri_no}
            onChange={() => handleChange('q6_tri', 'q6_tri_no')}
                      />
                        <label htmlFor="chk_q6_tri_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={29} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tri_unknown" name="chk_q6_tri" ng-checked={dataItem?.survey.card.q6_tri_unknown}
                      checked={dataSurveyCheck.q6_tri_unknown}
            onChange={() => handleChange('q6_tri', 'q6_tri_unknown')}
                      />
                        <label htmlFor="chk_q6_tri_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Thiếu máu:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={30} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tm_yes" name="chk_q6_tm" ng-checked={dataItem?.survey.card.q6_tm_yes}
                       checked={dataSurveyCheck.q6_tm_yes}
            onChange={() => handleChange('q6_tm', 'q6_tm_yes')}
                      />
                        <label htmlFor="chk_q6_tm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={31} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tm_no" name="chk_q6_tm" ng-checked={dataItem?.survey.card.q6_tm_no}
                         checked={dataSurveyCheck.q6_tm_no}
            onChange={() => handleChange('q6_tm', 'q6_tm_no')}
                      />
                        <label htmlFor="chk_q6_tm_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={32} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tm_unknown" name="chk_q6_tm" ng-checked={dataItem?.survey.card.q6_tm_unknown}
                         checked={dataSurveyCheck.q6_tm_unknown}
            onChange={() => handleChange('q6_tm', 'q6_tm_unknown')}
                      />
                        <label htmlFor="chk_q6_tm_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Rối loạn đông cầm máu:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={33} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_rldcm_yes" name="chk_q6_rldcm" ng-checked={dataItem?.survey.card.q6_rldcm_yes}
                      checked={dataSurveyCheck.q6_rldcm_yes}
            onChange={() => handleChange('q6_rldcm', 'q6_rldcm_yes')}
                      />
                        <label htmlFor="chk_q6_rldcm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={34} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_rldcm_no" name="chk_q6_rldcm" ng-checked={dataItem?.survey.card.q6_rldcm_no}
                      checked={dataSurveyCheck.q6_rldcm_no}
            onChange={() => handleChange('q6_rldcm', 'q6_rldcm_no')}
                      />
                        <label htmlFor="chk_q6_rldcm_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={35} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_rldcm_unknown" name="chk_q6_rldcm" ng-checked={dataItem?.survey.card.q6_rldcm_unknown}
                       checked={dataSurveyCheck.q6_rldcm_unknown}
            onChange={() => handleChange('q6_rldcm', 'q6_rldcm_unknown')}
                      />
                        <label htmlFor="chk_q6_rldcm_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bệnh lý huyết học khác:</div>
                   <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={36} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_blhhk_yes" name="chk_q6_blhhk" ng-checked={dataItem?.survey.card.q6_blhhk_yes}
                       checked={dataSurveyCheck.q6_blhhk_yes}
            onChange={() => handleChange('q6_blhhk', 'q6_blhhk_yes')}
                      />
                        <label htmlFor="chk_q6_blhhk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={37} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_blhhk_no" name="chk_q6_blhhk" ng-checked={dataItem?.survey.card.q6_blhhk_no}
                        checked={dataSurveyCheck.q6_blhhk_no}
            onChange={() => handleChange('q6_blhhk', 'q6_blhhk_no')}
                      />
                        <label htmlFor="chk_q6_blhhk_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={38} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_blhhk_unknown" name="chk_q6_blhhk" ng-checked={dataItem?.survey.card.q6_blhhk_unknown}
                       checked={dataSurveyCheck.q6_blhhk_unknown}
            onChange={() => handleChange('q6_blhhk', 'q6_blhhk_unknown')}
                      />
                        <label htmlFor="chk_q6_blhhk_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Động kinh hoặc đột quỵ/ tai biến mạch máu não:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={39} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_dkhdq_yes" name="chk_q6_dkhdq" ng-checked={dataItem?.survey.card.q6_dkhdq_yes}
                       checked={dataSurveyCheck.q6_dkhdq_yes}
            onChange={() => handleChange('q6_dkhdq', 'q6_dkhdq_yes')}
                      />
                        <label htmlFor="chk_q6_dkhdq_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={40} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_dkhdq_no" name="chk_q6_dkhdq" ng-checked={dataItem?.survey.card.q6_dkhdq_no}
                       checked={dataSurveyCheck.q6_dkhdq_no}
            onChange={() => handleChange('q6_dkhdq', 'q6_dkhdq_no')}
                      />
                        <label htmlFor="chk_q6_dkhdq_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={41} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_dkhdq_unknown" name="chk_q6_dkhdq" ng-checked={dataItem?.survey.card.q6_dkhdq_unknown}
                       checked={dataSurveyCheck.q6_dkhdq_unknown}
            onChange={() => handleChange('q6_dkhdq', 'q6_dkhdq_unknown')}
                      />
                        <label htmlFor="chk_q6_dkhdq_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Tăng huyết áp:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={42} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tha_yes" name="chk_q6_tha" ng-checked={dataItem?.survey.card.q6_tha_yes}
                       checked={dataSurveyCheck.q6_tha_yes}
            onChange={() => handleChange('q6_tha', 'q6_tha_yes')}
                      />
                        <label htmlFor="chk_q6_tha_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={43} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tha_no" name="chk_q6_tha" ng-checked={dataItem?.survey.card.q6_tha_no}
                       checked={dataSurveyCheck.q6_tha_no}
            onChange={() => handleChange('q6_tha', 'q6_tha_no')}
                      />
                        <label htmlFor="chk_q6_tha_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={44} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tha_unknown" name="chk_q6_tha" ng-checked={dataItem?.survey.card.q6_tha_unknown}
                      checked={dataSurveyCheck.q6_tha_unknown}
            onChange={() => handleChange('q6_tha', 'q6_tha_unknown')}
                      />
                        <label htmlFor="chk_q6_tha_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bệnh tim mạch:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={45} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_btm_yes" name="chk_q6_btm" ng-checked={dataItem?.survey.card.q6_btm_yes}
                         checked={dataSurveyCheck.q6_btm_yes}
            onChange={() => handleChange('q6_btm', 'q6_btm_yes')}
                      />
                        <label htmlFor="chk_q6_btm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={46} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_btm_no" name="chk_q6_btm" ng-checked={dataItem?.survey.card.q6_btm_no}
                       checked={dataSurveyCheck.q6_btm_no}
            onChange={() => handleChange('q6_btm', 'q6_btm_no')}
                      />
                        <label htmlFor="chk_q6_btm_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={47} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_btm_unknown" name="chk_q6_btm" ng-checked={dataItem?.survey.card.q6_btm_unknown}
                       checked={dataSurveyCheck.q6_btm_unknown}
            onChange={() => handleChange('q6_btm', 'q6_btm_unknown')}
                      />
                        <label htmlFor="chk_q6_btm_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đái tháo đường:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={48} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_dtd_yes" name="chk_q6_dtd" ng-checked={dataItem?.survey.card.q6_dtd_yes}
                          checked={dataSurveyCheck.q6_dtd_yes}
            onChange={() => handleChange('q6_dtd', 'q6_dtd_yes')}
                      />
                        <label htmlFor="chk_q6_dtd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={49} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_dtd_no" name="chk_q6_dtd" ng-checked={dataItem?.survey.card.q6_dtd_no}
                       checked={dataSurveyCheck.q6_dtd_no}
            onChange={() => handleChange('q6_dtd', 'q6_dtd_no')}
                      />
                        <label htmlFor="chk_q6_dtd_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={50} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_dtd_unknown" name="chk_q6_dtd" ng-checked={dataItem?.survey.card.q6_dtd_unknown}
                       checked={dataSurveyCheck.q6_dtd_unknown}
            onChange={() => handleChange('q6_dtd', 'q6_dtd_unknown')}
                      />
                        <label htmlFor="chk_q6_dtd_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Rối loạn tâm thần kinh:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={51} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_rlttk_yes" name="chk_q6_rlttk" ng-checked={dataItem?.survey.card.q6_rlttk_yes}
                       checked={dataSurveyCheck.q6_rlttk_yes}
            onChange={() => handleChange('q6_rlttk', 'q6_rlttk_yes')}
                      />
                        <label htmlFor="chk_q6_rlttk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={52} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_rlttk_no" name="chk_q6_rlttk" ng-checked={dataItem?.survey.card.q6_rlttk_no}
                       checked={dataSurveyCheck.q6_rlttk_no}
            onChange={() => handleChange('q6_rlttk', 'q6_rlttk_no')}
                      />
                        <label htmlFor="chk_q6_rlttk_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={53} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_rlttk_unknown" name="chk_q6_rlttk" ng-checked={dataItem?.survey.card.q6_rlttk_unknown}
                       checked={dataSurveyCheck.q6_rlttk_unknown}
            onChange={() => handleChange('q6_rlttk', 'q6_rlttk_unknown')}
                      />
                        <label htmlFor="chk_q6_rlttk_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Lao phổi:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={54} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_lp_yes" name="chk_q6_lp" ng-checked={dataItem?.survey.card.q6_lp_yes}
                      checked={dataSurveyCheck.q6_lp_yes}
            onChange={() => handleChange('q6_lp', 'q6_lp_yes')}
                      />
                        <label htmlFor="chk_q6_lp_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={55} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_lp_no" name="chk_q6_lp" ng-checked={dataItem?.survey.card.q6_lp_no}
                      checked={dataSurveyCheck.q6_lp_no}
            onChange={() => handleChange('q6_lp', 'q6_lp_no')}
                      />
                        <label htmlFor="chk_q6_lp_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={56} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_lp_unknown" name="chk_q6_lp" ng-checked={dataItem?.survey.card.q6_lp_unknown}
                      checked={dataSurveyCheck.q6_lp_unknown}
            onChange={() => handleChange('q6_lp', 'q6_lp_unknown')}
                      />
                        <label htmlFor="chk_q6_lp_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bệnh phổi hoặc hen suyễn:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={57} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_bphhs_yes" name="chk_q6_bphhs" ng-checked={dataItem?.survey.card.q6_bphhs_yes}
                      checked={dataSurveyCheck.q6_bphhs_yes}
            onChange={() => handleChange('q6_bphhs', 'q6_bphhs_yes')}
                      />
                        <label htmlFor="chk_q6_bphhs_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={58} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_bphhs_no" name="chk_q6_bphhs" ng-checked={dataItem?.survey.card.q6_bphhs_no}
                        checked={dataSurveyCheck.q6_bphhs_no}
            onChange={() => handleChange('q6_bphhs', 'q6_bphhs_no')}
                      />
                        <label htmlFor="chk_q6_bphhs_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={59} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_bphhs_unknown" name="chk_q6_bphhs" ng-checked={dataItem?.survey.card.q6_bphhs_unknown}
                        checked={dataSurveyCheck.q6_bphhs_unknown}
            onChange={() => handleChange('q6_bphhs', 'q6_bphhs_unknown')}
                      />
                        <label htmlFor="chk_q6_bphhs_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bệnh tuyến giáp:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={60} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_btg_yes" name="chk_q6_btg" ng-checked={dataItem?.survey.card.q6_btg_yes}
                      checked={dataSurveyCheck.q6_btg_yes}
            onChange={() => handleChange('q6_btg', 'q6_btg_yes')}
                      />
                        <label htmlFor="chk_q6_btg_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={61} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_btg_no" name="chk_q6_btg" ng-checked={dataItem?.survey.card.q6_btg_no}
                       checked={dataSurveyCheck.q6_btg_no}
            onChange={() => handleChange('q6_btg', 'q6_btg_no')}
                      />
                        <label htmlFor="chk_q6_btg_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={62} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_btg_unknown" name="chk_q6_btg" ng-checked={dataItem?.survey.card.q6_btg_unknown}
                       checked={dataSurveyCheck.q6_btg_unknown}
            onChange={() => handleChange('q6_btg', 'q6_btg_unknown')}
                      />
                        <label htmlFor="chk_q6_btg_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Thấp khớp:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={63} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tk_yes" name="chk_q6_tk" ng-checked={dataItem?.survey.card.q6_tk_yes}
                      checked={dataSurveyCheck.q6_tk_yes}
            onChange={() => handleChange('q6_tk', 'q6_tk_yes')}
                      />
                        <label htmlFor="chk_q6_tk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={64} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tk_no" name="chk_q6_tk" ng-checked={dataItem?.survey.card.q6_tk_no}
                       checked={dataSurveyCheck.q6_tk_no}
            onChange={() => handleChange('q6_tk', 'q6_tk_no')}
                      />
                        <label htmlFor="chk_q6_tk_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={65} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_tk_unknown" name="chk_q6_tk" ng-checked={dataItem?.survey.card.q6_tk_unknown}
                       checked={dataSurveyCheck.q6_tk_unknown}
            onChange={() => handleChange('q6_tk', 'q6_tk_unknown')}
                      />
                        <label htmlFor="chk_q6_tk_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>HIV/AIDS</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={66} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_hiv_yes" name="chk_q6_hiv" ng-checked={dataItem?.survey.card.q6_hiv_yes}
                      checked={dataSurveyCheck.q6_hiv_yes}
            onChange={() => handleChange('q6_hiv', 'q6_hiv_yes')}
                      />
                        <label htmlFor="chk_q6_hiv_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={67} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_hiv_no" name="chk_q6_hiv" ng-checked={dataItem?.survey.card.q6_hiv_no}
                      checked={dataSurveyCheck.q6_hiv_no}
            onChange={() => handleChange('q6_hiv', 'q6_hiv_no')}
                      />
                        <label htmlFor="chk_q6_hiv_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={68} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_hiv_unknown" name="chk_q6_hiv" ng-checked={dataItem?.survey.card.q6_hiv_unknown}
                      checked={dataSurveyCheck.q6_hiv_unknown}
            onChange={() => handleChange('q6_hiv', 'q6_hiv_unknown')}
                      />
                        <label htmlFor="chk_q6_hiv_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Ung thư</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={69} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_ut_yes" name="chk_q6_ut" ng-checked={dataItem?.survey.card.q6_ut_yes}
                       checked={dataSurveyCheck.q6_ut_yes}
            onChange={() => handleChange('q6_ut', 'q6_ut_yes')}
                      />
                        <label htmlFor="chk_q6_ut_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={70} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_ut_no" name="chk_q6_ut" ng-checked={dataItem?.survey.card.q6_ut_no}
                       checked={dataSurveyCheck.q6_ut_no}
            onChange={() => handleChange('q6_ut', 'q6_ut_no')}
                      />
                        <label htmlFor="chk_q6_ut_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={71} className="custom-control-input cursor-pointer" type="radio" id="chk_q6_ut_unknown" name="chk_q6_ut" ng-checked={dataItem?.survey.card.q6_ut_unknown}
                       checked={dataSurveyCheck.q6_ut_unknown}
            onChange={() => handleChange('q6_ut', 'q6_ut_unknown')}
                      />
                        <label htmlFor="chk_q6_ut_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                <div className="col-sm-2">Ghi chú (nếu có):</div>
                <div className="col-sm-10">
                    <input id="tb_q6_note_text" tabIndex={72} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}}className="htmlForm-control htmlForm-control-sm" value={dataSurveyText.q6_note_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q6_note_text: e.target.value})}}/>
                </div>
            </div>
        </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>7. {dataItem?.survey.card.q7}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
            <div className="row htmlForm-group">
                <div className="col-sm-1 font-weight-bold pb-1">Bệnh lý:</div>
                <div className="col-sm-3">
                    <input id="tb_q7_bl1_text" tabIndex={73} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q7_bl1_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_bl1_text: e.target.value})}}/>
                     {errors.q7_bl1_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q7_bl1_text}
              </p>
            )}
                  </div>
                <div className="col-sm-1 text-right">Năm:</div>
                <div className="col-sm-1 font-weight-bold pb-1">
                    <input id="tb_q7_n1_text" tabIndex={74} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm text-center"  value={dataSurveyText.q7_n1_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_n1_text: e.target.value})}}/>
                        {errors.q7_n1_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q7_n1_text}
              </p>
            )}
                  </div>
                <div className="col-sm-2 text-right">Biến chứng (nếu có):</div>
                <div className="col-sm-4">
                    <input id="tb_q7_bc1_text" tabIndex={75} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q7_bc1_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_bc1_text: e.target.value})}}/>
                </div>
            </div>
            <div className="row htmlForm-group">
                <div className="col-sm-1 font-weight-bold pb-1">Bệnh lý:</div>
                <div className="col-sm-3">
                    <input id="tb_q7_bl2_text" tabIndex={76} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q7_bl2_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_bl2_text: e.target.value})}}/>
                 {errors.q7_bl2_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q7_bl2_text}
              </p>
            )}
                  </div>
                <div className="col-sm-1 text-right">Năm:</div>
                <div className="col-sm-1 font-weight-bold pb-1">
                    <input id="tb_q7_n2_text" tabIndex={77} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm text-center"  value={dataSurveyText.q7_n2_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_n2_text: e.target.value})}}/>
                            {errors.q7_n2_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q7_n2_text}
              </p>
            )}
                  </div>
                <div className="col-sm-2 text-right">Biến chứng (nếu có):</div>
                <div className="col-sm-4">
                    <input id="tb_q7_bc2_text" tabIndex={78} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q7_bc2_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_bc2_text: e.target.value})}}/>
                </div>
            </div>
            <div className="row htmlForm-group">
                <div className="col-sm-1 font-weight-bold pb-1">Bệnh lý:</div>
                <div className="col-sm-3">
                    <input id="tb_q7_bl3_text" tabIndex={79} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm" value={dataSurveyText.q7_bl3_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_bl3_text: e.target.value})}}/>
                     {errors.q7_bl3_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q7_bl3_text}
              </p>
            )}
                  </div>
                <div className="col-sm-1 text-right">Năm:</div>
                <div className="col-sm-1 font-weight-bold pb-1">
                    <input id="tb_q7_n3_text" tabIndex={80} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm text-center" value={dataSurveyText.q7_n3_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_n3_text: e.target.value})}}/>
                            {errors.q7_n3_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q7_n3_text}
              </p>
            )}
                  </div>
                <div className="col-sm-2 text-right">Biến chứng (nếu có):</div>
                <div className="col-sm-4">
                    <input id="tb_q7_bc3_text" tabIndex={81} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q7_bc3_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_bc3_text: e.target.value})}}/>
                </div>
            </div>
        </div>
    </div>
    <div className="row htmlForm-group" >
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>8. {dataItem?.survey.card.q8}</div>
    </div>
    <div className="row htmlForm-group" style={{display:"flex",gap:"40px", marginBottom:"6px"}}>
        <div className="col-sm-2">
            <div className="custom-control custom-radio">
                  <input tabIndex={82} className="custom-control-input cursor-pointer" type="radio" id="chk_q8_yes" name="chk_q8" ng-checked={dataItem?.survey.card.q8_yes}
                     checked={dataSurveyCheck.q8_yes}
            onChange={() => handleChange('q8', 'q8_yes')}
                  />
                <label htmlFor="chk_q8_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
            </div>
        </div>
        <div className="col-sm-2">
            <div className="custom-control custom-radio">
                  <input tabIndex={83} className="custom-control-input cursor-pointer" type="radio" id="chk_q8_no" name="chk_q8" ng-checked={dataItem?.survey.card.q8_no}
                      checked={dataSurveyCheck.q8_no}
            onChange={() => handleChange('q8', 'q8_no')}
                  />
                <label htmlFor="chk_q8_no" className="custom-control-label cursor-pointer">Không</label>
            </div>
        </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>9. {dataItem?.survey.card.q9}</div>
    </div>
    <div className="row htmlForm-group"style={{display:"flex",gap:"40px", marginBottom:"6px"}}>
        <div className="col-sm-2">
            <div className="custom-control custom-radio">
                  <input tabIndex={84} className="custom-control-input cursor-pointer" type="radio" id="chk_q9_yes" name="chk_q9" ng-checked={dataItem?.survey.card.q9_yes}
                   checked={dataSurveyCheck.q9_yes}
            onChange={() => handleChange('q9', 'q9_yes')}
                  />
                <label htmlFor="chk_q9_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
            </div>
        </div>
        <div className="col-sm-2">
            <div className="custom-control custom-radio">
                  <input tabIndex={85} className="custom-control-input cursor-pointer" type="radio" id="chk_q9_no" name="chk_q9" ng-checked={dataItem?.survey.card.q9_no}
                   checked={dataSurveyCheck.q9_no}
            onChange={() => handleChange('q9', 'q9_no')}
                  />
                <label htmlFor="chk_q9_no" className="custom-control-label cursor-pointer">Không</label>
            </div>
        </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>10. {dataItem?.survey.card.q10}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
                <textarea id="tb_q10_text" tabIndex={86} className="htmlForm-control htmlForm-control-sm"  style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} value={dataSurveyText.q10_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q10_text: e.target.value})}}></textarea>
                   {errors.q10_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q10_text}
              </p>
            )}
              </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>11. {dataItem?.survey.card.q11}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
            <div className="row htmlForm-group">
                <div className="col-sm-1 font-weight-bold pb-1">Phẫu thuật:</div>
                <div className="col-sm-3">
                    <input id="tb_q11_pt1_text" tabIndex={87} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm" value={dataSurveyText.q11_pt1_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_pt1_text: e.target.value})}}/>
              
                        {errors.q11_pt1_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q11_pt1_text}
              </p>
            )}
                  </div>
                <div className="col-sm-1 text-right">Năm:</div>
                <div className="col-sm-1 font-weight-bold pb-1">
                    <input id="tb_q11_n1_text" tabIndex={88} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm text-center" value={dataSurveyText.q11_n1_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_n1_text: e.target.value})}}/>
                      {errors.q11_n1_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q11_n1_text}
              </p>
            )}
                  </div>
                <div className="col-sm-2 text-right">Biến chứng (nếu có):</div>
                <div className="col-sm-4">
                    <input id="tb_q11_bc1_text" tabIndex={89} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm" value={dataSurveyText.q11_bc1_text} onChange={(e) => { setDataSurvey({ ...dataSurveyText, q11_bc1_text: e.target.value }) }} />
                 </div>   
            </div>
            <div className="row htmlForm-group">
                <div className="col-sm-1 font-weight-bold pb-1">Phẫu thuật:</div>
                <div className="col-sm-3">
                    <input id="tb_q11_pt2_text" tabIndex={90} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q11_pt2_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_pt2_text: e.target.value})}}/>
                  {errors.q11_pt2_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q11_pt2_text}
              </p>
            )}
                  </div>
                <div className="col-sm-1 text-right">Năm:</div>
                <div className="col-sm-1 font-weight-bold pb-1">
                    <input id="tb_q11_n2_text" tabIndex={91} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm text-center"  value={dataSurveyText.q11_n2_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_n2_text: e.target.value})}}/>
                     {errors.q11_n2_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q11_n2_text}
              </p>
            )}
                  </div>
                <div className="col-sm-2 text-right">Biến chứng (nếu có):</div>
                <div className="col-sm-4">
                    <input id="tb_q11_bc2_text" tabIndex={92} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q11_bc2_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_bc2_text: e.target.value})}}/>
                </div>
            </div>
            <div className="row htmlForm-group">
                <div className="col-sm-1 font-weight-bold pb-1">Phẫu thuật:</div>
                <div className="col-sm-3">
                    <input id="tb_q11_pt3_text" tabIndex={93} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q11_pt3_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_pt3_text: e.target.value})}}/>
                      {errors.q11_pt3_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q11_pt3_text}
              </p>
            )}
                  </div>
                <div className="col-sm-1 text-right">Năm:</div>
                <div className="col-sm-1 font-weight-bold pb-1">
                    <input id="tb_q11_n3_text" tabIndex={94} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm text-center"  value={dataSurveyText.q11_n3_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_n3_text: e.target.value})}}/>
                     {errors.q11_n3_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q11_n3_text}
              </p>
            )}
                  </div>
                <div className="col-sm-2 text-right">Biến chứng (nếu có):</div>
                <div className="col-sm-4">
                    <input id="tb_q11_bc3_text" tabIndex={95} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q11_bc3_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_bc3_text: e.target.value})}}/>
                </div>
            </div>
        </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>12. {dataItem?.survey.card.q12}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
          
            <div className="row htmlForm-group">
                  <div className="col-sm-2 font-weight-bold" style={{ marginBottom: "5px" }}>Hút thuốc lá:</div>
                  
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                        <input tabIndex={96} className="custom-control-input cursor-pointer" type="radio" id="chk_q12_htl_cth" name="chk_q12_htl"
                            ng-checked={dataItem?.survey.card.q12_htl_cth}
                               checked={dataSurveyCheck.q12_htl_cth}
            onChange={() => handleChange2('q12_htl', 'q12_htl_cth')}
                      />
                        <label htmlFor="chk_q12_htl_cth" className="custom-control-label cursor-pointer">Chưa từng hút</label>
                    </div>
                  </div>
                  
                 <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                        <input tabIndex={97} className="custom-control-input cursor-pointer" type="radio" id="chk_q12_htl_thvdb" name="chk_q12_htl"
                         ng-checked={dataItem?.survey.card.q12_htl_thvdb}
                               checked={dataSurveyCheck.q12_htl_thvdb}
            onChange={() => handleChange2('q12_htl', 'q12_htl_thvdb')}
                      />
                        <label htmlFor="chk_q12_htl_thvdb" className="custom-control-label cursor-pointer">Từng hút và đã bỏ</label>
                    </div>
                  </div>
                  


                      <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                        <input tabIndex={98} className="custom-control-input cursor-pointer" type="radio" id="chk_q12_htl_hdch" name="chk_q12_htl"
                       ng-checked={dataItem?.survey.card.q12_htl_cth}
                               checked={dataSurveyCheck.q12_htl_hdch}
            onChange={() => handleChange2('q12_htl', 'q12_htl_hdch')}
                      />
                        <label htmlFor="chk_q12_htl_hdch" className="custom-control-label cursor-pointer">Hiện đang còn hút</label>
                    </div>
                </div>
              
                <div className="col-sm-4" ng-show="dataItem?.survey.card.q12_htl_hdch">
                    <input id="tb_q12_htl_hdch_text" tabIndex={99} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm" placeholder="Bao nhiêu điếu thuốc/ngày?"
                            value={dataSurveyText.q12_htl_hdch_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q12_htl_hdch_text: e.target.value})}}/>
                </div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-2 font-weight-bold" style={{ marginBottom: "5px" }}>Uống rượu bia:</div>
                   <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={100} className="custom-control-input cursor-pointer" type="radio" id="chk_q12_urb_yes" name="chk_q12_urb" ng-checked={dataItem?.survey.card.q12_urb_yes}
                         checked={dataSurveyCheck.q12_urb_yes}
            onChange={() => handleChange('q12_urb', 'q12_urb_yes')}
                      />
                        <label htmlFor="chk_q12_urb_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={101} className="custom-control-input cursor-pointer" type="radio" id="chk_q12_urb_no" name="chk_q12_urb" ng-checked={dataItem?.survey.card.q12_urb_no}
                        checked={dataSurveyCheck.q12_urb_no}
            onChange={() => handleChange('q12_urb', 'q12_urb_no')}
                      />
                        <label htmlFor="chk_q12_urb_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-2 font-weight-bold" style={{ marginBottom: "5px" }}>Sử dụng thuốc giảm đau:</div>
                   <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={102} className="custom-control-input cursor-pointer" type="radio" id="chk_q12_sdtgd_yes" name="chk_q12_sdtgd" ng-checked={dataItem?.survey.card.q12_sdtgd_yes}
                         checked={dataSurveyCheck.q12_sdtgd_yes}
            onChange={() => handleChange('q12_sdtgd', 'q12_sdtgd_yes')}
                      />
                        <label htmlFor="chk_q12_sdtgd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={103} className="custom-control-input cursor-pointer" type="radio" id="chk_q12_sdtgd_no" name="chk_q12_sdtgd" ng-checked={dataItem?.survey.card.q12_sdtgd_no}
                         checked={dataSurveyCheck.q12_sdtgd_no}
            onChange={() => handleChange('q12_sdtgd', 'q12_sdtgd_no')}
                      />
                        <label htmlFor="chk_q12_sdtgd_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
        </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px",width:"100%", marginTop:"10px"}}>13. {dataItem?.survey.card.q13}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
                <textarea id="tb_q13_text" tabIndex={104} className="htmlForm-control htmlForm-control-sm" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} value={dataSurveyText.q13_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q13_text: e.target.value})}}></textarea>
                   {errors.q13_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q13_text}
              </p>
            )}
              </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>14. {dataItem?.survey.card.q14}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
            <div className="row htmlForm-group">
                <div className="col-sm-1 font-weight-bold pb-1">Thuốc:</div>
                <div className="col-sm-3">
                    <input id="tb_q14_t1_text" tabIndex={105} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q14_t1_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_t1_text: e.target.value})}}/>
                      {errors.q14_t1_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q14_t1_text}
              </p>
            )}
                  </div>
                <div className="col-sm-1 text-right">Liều:</div>
                <div className="col-sm-2">
                    <input id="tb_q14_l1_text" tabIndex={106} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm text-center" value={dataSurveyText.q14_l1_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_l1_text: e.target.value})}}/>
                   {errors.q14_l1_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q14_l1_text}
              </p>
            )}
                  </div>
                <div className="col-sm-2 text-right">Số lần uống mỗi ngày:</div>
                <div className="col-sm-3">
                    <input id="tb_q14_ls1_text" tabIndex={107} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q14_ls1_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_ls1_text: e.target.value})}}/>
                   {errors.q14_ls1_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q14_ls1_text}
              </p>
            )}
                  </div>
            </div>
            <div className="row htmlForm-group">
                <div className="col-sm-1 font-weight-bold pb-1">Thuốc:</div>
                <div className="col-sm-3">
                    <input id="tb_q14_t2_text" tabIndex={108} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q14_t2_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_t2_text: e.target.value})}}/>
                </div>
                <div className="col-sm-1 text-right">Liều:</div>
                <div className="col-sm-2">
                    <input id="tb_q14_l2_text" tabIndex={109} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm text-center"  value={dataSurveyText.q14_l2_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_l2_text: e.target.value})}}/>
                </div>
                <div className="col-sm-2 text-right">Số lần uống mỗi ngày:</div>
                <div className="col-sm-3">
                    <input id="tb_q14_ls2_text" tabIndex={110} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q14_ls2_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_ls2_text: e.target.value})}}/>
                </div>
            </div>
            <div className="row htmlForm-group">
                <div className="col-sm-1 font-weight-bold pb-1">Thuốc:</div>
                <div className="col-sm-3">
                    <input id="tb_q14_t3_text" tabIndex={111} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q14_t3_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_t3_text: e.target.value})}}/>
                </div>
                <div className="col-sm-1 text-right">Liều:</div>
                <div className="col-sm-2">
                    <input id="tb_q14_l3_text" tabIndex={112} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm text-center"  value={dataSurveyText.q14_l3_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_l3_text: e.target.value})}}/>
                </div>
                <div className="col-sm-2 text-right">Số lần uống mỗi ngày:</div>
                <div className="col-sm-3">
                    <input id="tb_q14_ls3_text" tabIndex={113} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm" value={dataSurveyText.q14_ls3_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_ls3_text: e.target.value})}}/>
                </div>
            </div>
        </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>15. {dataItem?.survey.card.q15}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
              <textarea id="tb_q15_text" tabIndex={114} className="htmlForm-control htmlForm-control-sm" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}}   value={dataSurveyText.q15_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q15_text: e.target.value})}}></textarea>
                   {errors.q15_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q15_text}
              </p>
            )}
              </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>16. {dataItem?.survey.card.q16}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12">
            <div className="row htmlForm-group">
                <div className="col-sm-2">Bố ruột:</div>
                <div className="col-sm-10">
                    <input id="tb_q16_br_text" tabIndex={115} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q16_br_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q16_br_text: e.target.value})}}/>
                     {errors.q16_br_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q16_br_text}
              </p>
            )}
                  </div>
            </div>
            <div className="row htmlForm-group">
                <div className="col-sm-2">Mẹ ruột:</div>
                <div className="col-sm-10">
                    <input id="tb_q16_mr_text" tabIndex={116} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q16_mr_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q16_mr_text: e.target.value})}}/>
                   {errors.q16_mr_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q16_mr_text}
              </p>
            )}
                  </div>
            </div>
            <div className="row htmlForm-group">
                <div className="col-sm-2">Anh/Em trai ruột:</div>
                <div className="col-sm-10">
                    <input id="tb_q16_aer_text" tabIndex={117} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm" value={dataSurveyText.q16_aer_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q16_aer_text: e.target.value})}}/>
                     {errors.q16_aer_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q16_aer_text}
              </p>
            )}
                  </div>
            </div>
            <div className="row htmlForm-group">
                <div className="col-sm-2">Chị/Em gái ruột:</div>
                <div className="col-sm-10">
                    <input id="tb_q16_cer_text" tabIndex={118} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={dataSurveyText.q16_cer_text} onChange={(e) => {setDataSurvey({...dataSurveyText,q16_cer_text: e.target.value})}}/>
                       {errors.q16_cer_text && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.q16_cer_text}
              </p>
            )}
                  </div>
            </div>
        </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>17. {dataItem?.survey.card.q17}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-7">
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ung thư vú:</div>
                   <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={119} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utv_yes" name="chk_q17_utv" ng-checked={dataItem?.survey.card.q17_utv_yes}
                       checked={dataSurveyCheck.q17_utv_yes}
            onChange={() => handleChange('q17_utv', 'q17_utv_yes')}
                      />
                        <label htmlFor="chk_q17_utv_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={120} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utv_no" name="chk_q17_utv" ng-checked={dataItem?.survey.card.q17_utv_no}
                      checked={dataSurveyCheck.q17_utv_no}
            onChange={() => handleChange('q17_utv', 'q17_utv_no')}
                      />
                        <label htmlFor="chk_q17_utv_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={121} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utv_unknown" name="chk_q17_utv" ng-checked={dataItem?.survey.card.q17_utv_unknown}
                      checked={dataSurveyCheck.q17_utv_unknown}
            onChange={() => handleChange('q17_utv', 'q17_utv_unknown')}
                      />
                        <label htmlFor="chk_q17_utv_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Ợ nóng mạn tính:</div>
                   <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={122} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_onmt_yes" name="chk_q17_onmt" ng-checked={dataItem?.survey.card.q17_onmt_yes}
                        checked={dataSurveyCheck.q17_onmt_yes}
            onChange={() => handleChange('q17_onmt', 'q17_onmt_yes')}
                      />
                        <label htmlFor="chk_q17_onmt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={123} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_onmt_no" name="chk_q17_onmt" ng-checked={dataItem?.survey.card.q17_onmt_no}
                         checked={dataSurveyCheck.q17_onmt_no}
            onChange={() => handleChange('q17_onmt', 'q17_onmt_no')}
                      />
                        <label htmlFor="chk_q17_onmt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={124} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_onmt_unknown" name="chk_q17_onmt" ng-checked={dataItem?.survey.card.q17_onmt_unknown}
                         checked={dataSurveyCheck.q17_onmt_unknown}
            onChange={() => handleChange('q17_onmt', 'q17_onmt_unknown')}
                      />
                        <label htmlFor="chk_q17_onmt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Ung thư đại tràng:</div>
                   <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={125} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utdt_yes" name="chk_q17_utdt" ng-checked={dataItem?.survey.card.q17_utdt_yes}
                      checked={dataSurveyCheck.q17_utdt_yes}
            onChange={() => handleChange('q17_utdt', 'q17_utdt_yes')}
                      />
                        <label htmlFor="chk_q17_utdt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={126} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utdt_no" name="chk_q17_utdt" ng-checked={dataItem?.survey.card.q17_utdt_no}
                       checked={dataSurveyCheck.q17_utdt_no}
            onChange={() => handleChange('q17_utdt', 'q17_utdt_no')}
                      />
                        <label htmlFor="chk_q17_utdt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={127} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utdt_unknown" name="chk_q17_utdt" ng-checked={dataItem?.survey.card.q17_utdt_unknown}
                       checked={dataSurveyCheck.q17_utdt_unknown}
            onChange={() => handleChange('q17_utdt', 'q17_utdt_unknown')}
                      />
                        <label htmlFor="chk_q17_utdt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Polyp đại tràng:</div>
                   <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={128} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_pldt_yes" name="chk_q17_pldt" ng-checked={dataItem?.survey.card.q17_pldt_yes}
                       checked={dataSurveyCheck.q17_pldt_yes}
            onChange={() => handleChange('q17_pldt', 'q17_pldt_yes')}
                      />
                        <label htmlFor="chk_q17_pldt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={129} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_pldt_no" name="chk_q17_pldt" ng-checked={dataItem?.survey.card.q17_pldt_no}
                      checked={dataSurveyCheck.q17_pldt_no}
            onChange={() => handleChange('q17_pldt', 'q17_pldt_no')}
                      />
                        <label htmlFor="chk_q17_pldt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={130} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_pldt_unknown" name="chk_q17_pldt" ng-checked={dataItem?.survey.card.q17_pldt_unknown}
                      checked={dataSurveyCheck.q17_pldt_unknown}
            onChange={() => handleChange('q17_pldt', 'q17_pldt_unknown')}
                      />
                        <label htmlFor="chk_q17_pldt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bệnh Crohn/ Viêm loét đại tràng:</div>
                   <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={131} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_vldt_yes" name="chk_q17_vldt" ng-checked={dataItem?.survey.card.q17_vldt_yes}
                         checked={dataSurveyCheck.q17_vldt_yes}
            onChange={() => handleChange('q17_vldt', 'q17_vldt_yes')}
                      />
                        <label htmlFor="chk_q17_vldt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={132} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_vldt_no" name="chk_q17_vldt" ng-checked={dataItem?.survey.card.q17_vldt_no}
                      checked={dataSurveyCheck.q17_vldt_no}
            onChange={() => handleChange('q17_vldt', 'q17_vldt_no')}
                      />
                        <label htmlFor="chk_q17_vldt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={133} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_vldt_unknown" name="chk_q17_vldt" ng-checked={dataItem?.survey.card.q17_vldt_unknown}
                      checked={dataSurveyCheck.q17_vldt_unknown}
            onChange={() => handleChange('q17_vldt', 'q17_vldt_unknown')}
                      />
                        <label htmlFor="chk_q17_vldt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đái tháo đường:</div>
                   <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={134} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_dtd_yes" name="chk_q17_dtd" ng-checked={dataItem?.survey.card.q17_dtd_yes}
                       checked={dataSurveyCheck.q17_dtd_yes}
            onChange={() => handleChange('q17_dtd', 'q17_dtd_yes')}
                      />
                        <label htmlFor="chk_q17_dtd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={135} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_dtd_no" name="chk_q17_dtd" ng-checked={dataItem?.survey.card.q17_dtd_no}
                         checked={dataSurveyCheck.q17_dtd_no}
            onChange={() => handleChange('q17_dtd', 'q17_dtd_no')}
                      />
                        <label htmlFor="chk_q17_dtd_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={136} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_dtd_unknown" name="chk_q17_dtd" ng-checked={dataItem?.survey.card.q17_dtd_unknown}
                         checked={dataSurveyCheck.q17_dtd_unknown}
            onChange={() => handleChange('q17_dtd', 'q17_dtd_unknown')}
                      />
                        <label htmlFor="chk_q17_dtd_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Rối loạn tâm thần:</div>
                   <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={137} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_rltt_yes" name="chk_q17_rltt" ng-checked={dataItem?.survey.card.q17_rltt_yes}
                       checked={dataSurveyCheck.q17_rltt_yes}
            onChange={() => handleChange('q17_rltt', 'q17_rltt_yes')}
                      />
                        <label htmlFor="chk_q17_rltt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={138} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_rltt_no" name="chk_q17_rltt" ng-checked={dataItem?.survey.card.q17_rltt_no}
                      checked={dataSurveyCheck.q17_rltt_no}
            onChange={() => handleChange('q17_rltt', 'q17_rltt_no')}
                      />
                        <label htmlFor="chk_q17_rltt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={139} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_rltt_unknown" name="chk_q17_rltt" ng-checked={dataItem?.survey.card.q17_rltt_unknown}
                      checked={dataSurveyCheck.q17_rltt_unknown}
            onChange={() => handleChange('q17_rltt', 'q17_rltt_unknown')}
                      />
                        <label htmlFor="chk_q17_rltt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Ung thư thực quản/ rối loạn thực quản:</div>
                   <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={140} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_uttq_yes" name="chk_q17_uttq" ng-checked={dataItem?.survey.card.q17_uttq_yes}
                         checked={dataSurveyCheck.q17_uttq_yes}
            onChange={() => handleChange('q17_uttq', 'q17_uttq_yes')}
                      />
                        <label htmlFor="chk_q17_uttq_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={141} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_uttq_no" name="chk_q17_uttq" ng-checked={dataItem?.survey.card.q17_uttq_no}
                      checked={dataSurveyCheck.q17_uttq_no}
            onChange={() => handleChange('q17_uttq', 'q17_uttq_no')}
                      />
                        <label htmlFor="chk_q17_uttq_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={142} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_uttq_unknown" name="chk_q17_uttq" ng-checked={dataItem?.survey.card.q17_uttq_unknown}
                       checked={dataSurveyCheck.q17_uttq_unknown}
            onChange={() => handleChange('q17_uttq', 'q17_uttq_unknown')}
                      />
                        <label htmlFor="chk_q17_uttq_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bệnh túi mật:</div>
                   <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={143} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_btm_yes" name="chk_q17_btm" ng-checked={dataItem?.survey.card.q17_btm_yes}
                         checked={dataSurveyCheck.q17_btm_yes}
            onChange={() => handleChange('q17_btm', 'q17_btm_yes')}
                      />
                        <label htmlFor="chk_q17_btm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={144} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_btm_no" name="chk_q17_btm" ng-checked={dataItem?.survey.card.q17_btm_no}
                       checked={dataSurveyCheck.q17_btm_no}
            onChange={() => handleChange('q17_btm', 'q17_btm_no')}
                      />
                        <label htmlFor="chk_q17_btm_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={145} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_btm_unknown" name="chk_q17_btm" ng-checked={dataItem?.survey.card.q17_btm_unknown}
                       checked={dataSurveyCheck.q17_btm_unknown}
            onChange={() => handleChange('q17_btm', 'q17_btm_unknown')}
                      />
                        <label htmlFor="chk_q17_btm_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Bệnh tim mạch:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={146} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_btim_yes" name="chk_q17_btim" ng-checked={dataItem?.survey.card.q17_btim_yes}
                      checked={dataSurveyCheck.q17_btim_yes}
            onChange={() => handleChange('q17_btim', 'q17_btim_yes')}
                      />
                        <label htmlFor="chk_q17_btim_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={147} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_btim_no" name="chk_q17_btim" ng-checked={dataItem?.survey.card.q17_btim_no}
                      checked={dataSurveyCheck.q17_btim_no}
            onChange={() => handleChange('q17_btim', 'q17_btim_no')}
                      />
                        <label htmlFor="chk_q17_btim_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={148} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_btim_unknown" name="chk_q17_btim" ng-checked={dataItem?.survey.card.q17_btim_unknown}
                      checked={dataSurveyCheck.q17_btim_unknown}
            onChange={() => handleChange('q17_btim', 'q17_btim_unknown')}
                      />
                        <label htmlFor="chk_q17_btim_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div>
            </div></div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Tăng huyết áp:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={149} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_tha_yes" name="chk_q17_tha" ng-checked={dataItem?.survey.card.q17_tha_yes}
                       checked={dataSurveyCheck.q17_tha_yes}
            onChange={() => handleChange('q17_tha', 'q17_tha_yes')}
                      />
                        <label htmlFor="chk_q17_tha_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={150} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_tha_no" name="chk_q17_tha" ng-checked={dataItem?.survey.card.q17_tha_no}
                         checked={dataSurveyCheck.q17_tha_no}
            onChange={() => handleChange('q17_tha', 'q17_tha_no')}
                      />
                        <label htmlFor="chk_q17_tha_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={151} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_tha_unknown" name="chk_q17_tha" ng-checked={dataItem?.survey.card.q17_tha_unknown}
                         checked={dataSurveyCheck.q17_tha_unknown}
            onChange={() => handleChange('q17_tha', 'q17_tha_unknown')}
                      />
                        <label htmlFor="chk_q17_tha_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Bệnh thận:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={152} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_bt_yes" name="chk_q17_bt" ng-checked={dataItem?.survey.card.q17_bt_yes}
                      checked={dataSurveyCheck.q17_bt_yes}
            onChange={() => handleChange('q17_bt', 'q17_bt_yes')}
                      />
                        <label htmlFor="chk_q17_bt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={153} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_bt_no" name="chk_q17_bt" ng-checked={dataItem?.survey.card.q17_bt_no}
                        checked={dataSurveyCheck.q17_bt_no}
            onChange={() => handleChange('q17_bt', 'q17_bt_no')}
                      />
                        <label htmlFor="chk_q17_bt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={154} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_bt_unknown" name="chk_q17_bt" ng-checked={dataItem?.survey.card.q17_bt_unknown}
                        checked={dataSurveyCheck.q17_bt_unknown}
            onChange={() => handleChange('q17_bt', 'q17_bt_unknown')}
                      />
                        <label htmlFor="chk_q17_bt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ung thư buồng trứng:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={155} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utbt_yes" name="chk_q17_utbt" ng-checked={dataItem?.survey.card.q17_utbt_yes}
                      checked={dataSurveyCheck.q17_utbt_yes}
            onChange={() => handleChange('q17_utbt', 'q17_utbt_yes')}
                      />
                        <label htmlFor="chk_q17_utbt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={156} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utbt_no" name="chk_q17_utbt" ng-checked={dataItem?.survey.card.q17_utbt_no}
                       checked={dataSurveyCheck.q17_utbt_no}
            onChange={() => handleChange('q17_utbt', 'q17_utbt_no')}
                      />
                        <label htmlFor="chk_q17_utbt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={157} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utbt_unknown" name="chk_q17_utbt" ng-checked={dataItem?.survey.card.q17_utbt_unknown}
                       checked={dataSurveyCheck.q17_utbt_unknown}
            onChange={() => handleChange('q17_utbt', 'q17_utbt_unknown')}
                      />
                        <label htmlFor="chk_q17_utbt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ung thư tụy/bệnh lý tụy:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={158} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utt_yes" name="chk_q17_utt" ng-checked={dataItem?.survey.card.q17_utt_yes}
                      checked={dataSurveyCheck.q17_utt_yes}
            onChange={() => handleChange('q17_utt', 'q17_utt_yes')}
                      />
                        <label htmlFor="chk_q17_utt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={159} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utt_no" name="chk_q17_utt" ng-checked={dataItem?.survey.card.q17_utt_no}
                      checked={dataSurveyCheck.q17_utt_no}
            onChange={() => handleChange('q17_utt', 'q17_utt_no')}
                      />
                        <label htmlFor="chk_q17_utt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={160} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utt_unknown" name="chk_q17_utt" ng-checked={dataItem?.survey.card.q17_utt_unknown}
                      checked={dataSurveyCheck.q17_utt_unknown}
            onChange={() => handleChange('q17_utt', 'q17_utt_unknown')}
                      />
                        <label htmlFor="chk_q17_utt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Loét dạ dày – tá tràng:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={161} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_lddtt_yes" name="chk_q17_lddtt" ng-checked={dataItem?.survey.card.q17_lddtt_yes}
                      checked={dataSurveyCheck.q17_lddtt_yes}
            onChange={() => handleChange('q17_lddtt', 'q17_lddtt_yes')}
                      />
                        <label htmlFor="chk_q17_lddtt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={162} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_lddtt_no" name="chk_q17_lddtt" ng-checked={dataItem?.survey.card.q17_lddtt_no}
                         checked={dataSurveyCheck.q17_lddtt_no}
            onChange={() => handleChange('q17_lddtt', 'q17_lddtt_no')}
                      />
                        <label htmlFor="chk_q17_lddtt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={163} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_lddtt_unknown" name="chk_q17_lddtt" ng-checked={dataItem?.survey.card.q17_lddtt_unknown}
                         checked={dataSurveyCheck.q17_lddtt_unknown}
            onChange={() => handleChange('q17_lddtt', 'q17_lddtt_unknown')}
                      />
                        <label htmlFor="chk_q17_lddtt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Polyp dạ dày/ ung thư dạ dày:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={164} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_pldd_yes" name="chk_q17_pldd" ng-checked={dataItem?.survey.card.q17_pldd_yes}
                       checked={dataSurveyCheck.q17_pldd_yes}
            onChange={() => handleChange('q17_pldd', 'q17_pldd_yes')}
                      />
                        <label htmlFor="chk_q17_pldd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={165} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_pldd_no" name="chk_q17_pldd" ng-checked={dataItem?.survey.card.q17_pldd_no}
                      checked={dataSurveyCheck.q17_pldd_no}
            onChange={() => handleChange('q17_pldd', 'q17_pldd_no')}
                      />
                        <label htmlFor="chk_q17_pldd_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={166} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_pldd_unknown" name="chk_q17_pldd" ng-checked={dataItem?.survey.card.q17_pldd_unknown}
                      checked={dataSurveyCheck.q17_pldd_unknown}
            onChange={() => handleChange('q17_pldd', 'q17_pldd_unknown')}
                      />
                        <label htmlFor="chk_q17_pldd_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đột quỵ/ tai biến mạch máu não/ động kinh:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={167} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_dq_yes" name="chk_q17_dq" ng-checked={dataItem?.survey.card.q17_dq_yes}
                        checked={dataSurveyCheck.q17_dq_yes}
            onChange={() => handleChange('q17_dq', 'q17_dq_yes')}
                      />
                        <label htmlFor="chk_q17_dq_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={168} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_dq_no" name="chk_q17_dq" ng-checked={dataItem?.survey.card.q17_dq_no}
                       checked={dataSurveyCheck.q17_dq_no}
            onChange={() => handleChange('q17_dq', 'q17_dq_no')}
                      />
                        <label htmlFor="chk_q17_dq_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={169} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_dq_unknown" name="chk_q17_dq" ng-checked={dataItem?.survey.card.q17_dq_unknown}
                       checked={dataSurveyCheck.q17_dq_unknown}
            onChange={() => handleChange('q17_dq', 'q17_dq_unknown')}
                      />
                        <label htmlFor="chk_q17_dq_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Các loại ung thư khác:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={170} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utk_yes" name="chk_q17_utk" ng-checked={dataItem?.survey.card.q17_utk_yes}
                       checked={dataSurveyCheck.q17_utk_yes}
            onChange={() => handleChange('q17_utk', 'q17_utk_yes')}
                      />
                        <label htmlFor="chk_q17_utk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={171} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utk_no" name="chk_q17_utk" ng-checked={dataItem?.survey.card.q17_utk_no}
                       checked={dataSurveyCheck.q17_utk_no}
            onChange={() => handleChange('q17_utk', 'q17_utk_no')}
                      />
                        <label htmlFor="chk_q17_utk_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={172} className="custom-control-input cursor-pointer" type="radio" id="chk_q17_utk_unknown" name="chk_q17_utk" ng-checked={dataItem?.survey.card.q17_utk_unknown}
                        checked={dataSurveyCheck.q17_utk_unknown}
            onChange={() => handleChange('q17_utk', 'q17_utk_unknown')}
                      />
                        <label htmlFor="chk_q17_utk_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                    </div>
                </div></div>
            </div>
        </div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>18. {dataItem?.survey.card.q18}</div>
    </div>
    <div className="row htmlForm-group">
        <div className="col-sm-7">
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Mệt mỏi:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={173} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_mm_yes" name="chk_q18_mm" ng-checked={dataItem?.survey.card.q18_mm_yes}
                        checked={dataSurveyCheck.q18_mm_yes}
            onChange={() => handleChange('q18_mm', 'q18_mm_yes')}
                      />
                        <label htmlFor="chk_q18_mm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={174} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_mm_no" name="chk_q18_mm" ng-checked={dataItem?.survey.card.q18_mm_no}
                      checked={dataSurveyCheck.q18_mm_no}
            onChange={() => handleChange('q18_mm', 'q18_mm_no')}
                      />
                        <label htmlFor="chk_q18_mm_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Chán ăn:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={175} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ca_yes" name="chk_q18_ca" ng-checked={dataItem?.survey.card.q18_ca_yes}
                       checked={dataSurveyCheck.q18_ca_yes}
            onChange={() => handleChange('q18_ca', 'q18_ca_yes')}
                      />
                        <label htmlFor="chk_q18_ca_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={176} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ca_no" name="chk_q18_ca" ng-checked={dataItem?.survey.card.q18_ca_no}
                         checked={dataSurveyCheck.q18_ca_no}
            onChange={() => handleChange('q18_ca', 'q18_ca_no')}
                      />
                        <label htmlFor="chk_q18_ca_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Sút cân:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={177} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_sc_yes" name="chk_q18_sc" ng-checked={dataItem?.survey.card.q18_sc_yes}
                       checked={dataSurveyCheck.q18_sc_yes}
            onChange={() => handleChange('q18_sc', 'q18_sc_yes')}
                      />
                        <label htmlFor="chk_q18_sc_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={178} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_sc_no" name="chk_q18_sc" ng-checked={dataItem?.survey.card.q18_sc_no}
                       checked={dataSurveyCheck.q18_sc_no}
            onChange={() => handleChange('q18_sc', 'q18_sc_no')}
                      />
                        <label htmlFor="chk_q18_sc_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Sốt:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={179} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_s_yes" name="chk_q18_s" ng-checked={dataItem?.survey.card.q18_s_yes}
                      checked={dataSurveyCheck.q18_s_yes}
            onChange={() => handleChange('q18_s', 'q18_s_yes')}
                      />
                        <label htmlFor="chk_q18_s_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={180} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_s_no" name="chk_q18_s" ng-checked={dataItem?.survey.card.q18_s_no}
                        checked={dataSurveyCheck.q18_s_no}
            onChange={() => handleChange('q18_s', 'q18_s_no')}
                      />
                        <label htmlFor="chk_q18_s_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Lạnh run:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={181} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_lr_yes" name="chk_q18_lr" ng-checked={dataItem?.survey.card.q18_lr_yes}
                        checked={dataSurveyCheck.q18_lr_yes}
            onChange={() => handleChange('q18_lr', 'q18_lr_yes')}
                      />
                        <label htmlFor="chk_q18_lr_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={182} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_lr_no" name="chk_q18_lr" ng-checked={dataItem?.survey.card.q18_lr_no}
                        checked={dataSurveyCheck.q18_lr_no}
            onChange={() => handleChange('q18_lr', 'q18_lr_no')}
                      />
                        <label htmlFor="chk_q18_lr_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đổ mồ hôi trộm về đêm:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={183} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dmhtvd_yes" name="chk_q18_dmhtvd" ng-checked={dataItem?.survey.card.q18_dmhtvd_yes}
                      checked={dataSurveyCheck.q18_dmhtvd_yes}
            onChange={() => handleChange('q18_dmhtvd', 'q18_dmhtvd_yes')}
                      />
                        <label htmlFor="chk_q18_dmhtvd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={184} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dmhtvd_no" name="chk_q18_dmhtvd" ng-checked={dataItem?.survey.card.q18_dmhtvd_no}
                      checked={dataSurveyCheck.q18_dmhtvd_no}
            onChange={() => handleChange('q18_dmhtvd', 'q18_dmhtvd_no')}
                      />
                        <label htmlFor="chk_q18_dmhtvd_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Các vấn đề về mắt, mũi, tai, họng:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={185} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_cvdvmmth_yes" name="chk_q18_cvdvmmth" ng-checked={dataItem?.survey.card.q18_cvdvmmth_yes}
                      checked={dataSurveyCheck.q18_cvdvmmth_yes}
            onChange={() => handleChange('q18_cvdvmmth', 'q18_cvdvmmth_yes')}
                      />
                        <label htmlFor="chk_q18_cvdvmmth_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={186} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_cvdvmmth_no" name="chk_q18_cvdvmmth" ng-checked={dataItem?.survey.card.q18_cvdvmmth_no}
                      checked={dataSurveyCheck.q18_cvdvmmth_no}
            onChange={() => handleChange('q18_cvdvmmth', 'q18_cvdvmmth_no')}
                      />
                        <label htmlFor="chk_q18_cvdvmmth_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Chảy máu mũi:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={187} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_cmm_yes" name="chk_q18_cmm" ng-checked={dataItem?.survey.card.q18_cmm_yes}
                       checked={dataSurveyCheck.q18_cmm_yes}
            onChange={() => handleChange('q18_cmm', 'q18_cmm_yes')}
                      />
                        <label htmlFor="chk_q18_cmm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={188} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_cmm_no" name="chk_q18_cmm" ng-checked={dataItem?.survey.card.q18_cmm_no}
                       checked={dataSurveyCheck.q18_cmm_no}
            onChange={() => handleChange('q18_cmm', 'q18_cmm_no')}
                      />
                        <label htmlFor="chk_q18_cmm_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Loét miệng:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={189} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_lm_yes" name="chk_q18_lm" ng-checked={dataItem?.survey.card.q18_lm_yes}
                       checked={dataSurveyCheck.q18_lm_yes}
            onChange={() => handleChange('q18_lm', 'q18_lm_yes')}
                      />
                        <label htmlFor="chk_q18_lm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={190} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_lm_no" name="chk_q18_lm" ng-checked={dataItem?.survey.card.q18_lm_no}
                      checked={dataSurveyCheck.q18_lm_no}
            onChange={() => handleChange('q18_lm', 'q18_lm_no')}
                      />
                        <label htmlFor="chk_q18_lm_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đau mắt:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={191} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dm_yes" name="chk_q18_dm" ng-checked={dataItem?.survey.card.q18_dm_yes}
                      checked={dataSurveyCheck.q18_dm_yes}
            onChange={() => handleChange('q18_dm', 'q18_dm_yes')}
                      />
                        <label htmlFor="chk_q18_dm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={192} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dm_no" name="chk_q18_dm" ng-checked={dataItem?.survey.card.q18_dm_no}
                      checked={dataSurveyCheck.q18_dm_no}
            onChange={() => handleChange('q18_dm', 'q18_dm_no')}
                      />
                        <label htmlFor="chk_q18_dm_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ho khan:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={193} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_hk_yes" name="chk_q18_hk" ng-checked={dataItem?.survey.card.q18_hk_yes}
                      checked={dataSurveyCheck.q18_hk_yes}
            onChange={() => handleChange('q18_hk', 'q18_hk_yes')}
                      />
                        <label htmlFor="chk_q18_hk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={194} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_hk_no" name="chk_q18_hk" ng-checked={dataItem?.survey.card.q18_hk_no}
                      checked={dataSurveyCheck.q18_hk_no}
            onChange={() => handleChange('q18_hk', 'q18_hk_no')}
                      />
                        <label htmlFor="chk_q18_hk_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ho đàm:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={195} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_hd_yes" name="chk_q18_hd" ng-checked={dataItem?.survey.card.q18_hd_yes}
                      checked={dataSurveyCheck.q18_hd_yes}
            onChange={() => handleChange('q18_hd', 'q18_hd_yes')}
                      />
                        <label htmlFor="chk_q18_hd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={196} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_hd_no" name="chk_q18_hd" ng-checked={dataItem?.survey.card.q18_hd_no}
                       checked={dataSurveyCheck.q18_hd_no}
            onChange={() => handleChange('q18_hd', 'q18_hd_no')}
                      />
                        <label htmlFor="chk_q18_hd_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Khò khè:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={197} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_kk_yes" name="chk_q18_kk" ng-checked={dataItem?.survey.card.q18_kk_yes}
                      checked={dataSurveyCheck.q18_kk_yes}
            onChange={() => handleChange('q18_kk', 'q18_kk_yes')}
                      />
                        <label htmlFor="chk_q18_kk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={198} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_kk_no" name="chk_q18_kk" ng-checked={dataItem?.survey.card.q18_kk_no}
                        checked={dataSurveyCheck.q18_kk_no}
            onChange={() => handleChange('q18_kk', 'q18_kk_no')}
                      />
                        <label htmlFor="chk_q18_kk_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Khó thở khi gắng sức:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={199} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ktkgs_yes" name="chk_q18_ktkgs" ng-checked={dataItem?.survey.card.q18_ktkgs_yes}
                      checked={dataSurveyCheck.q18_ktkgs_yes}
            onChange={() => handleChange('q18_ktkgs', 'q18_ktkgs_yes')}
                      />
                        <label htmlFor="chk_q18_ktkgs_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={200} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ktkgs_no" name="chk_q18_ktkgs" ng-checked={dataItem?.survey.card.q18_ktkgs_no}
                       checked={dataSurveyCheck.q18_ktkgs_no}
            onChange={() => handleChange('q18_ktkgs', 'q18_ktkgs_no')}
                      />
                        <label htmlFor="chk_q18_ktkgs_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Khó thở cả khi nghỉ ngơi:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={201} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ktcknn_yes" name="chk_q18_ktcknn" ng-checked={dataItem?.survey.card.q18_ktcknn_yes}
                      checked={dataSurveyCheck.q18_ktcknn_yes}
            onChange={() => handleChange('q18_ktcknn', 'q18_ktcknn_yes')}
                      />
                        <label htmlFor="chk_q18_ktcknn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={202} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ktcknn_no" name="chk_q18_ktcknn" ng-checked={dataItem?.survey.card.q18_ktcknn_no}
                      checked={dataSurveyCheck.q18_ktcknn_no}
            onChange={() => handleChange('q18_ktcknn', 'q18_ktcknn_no')}
                      />
                        <label htmlFor="chk_q18_ktcknn_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Khó thở cả khi nằm:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={203} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ktckn_yes" name="chk_q18_ktckn" ng-checked={dataItem?.survey.card.q18_ktckn_yes}
                       checked={dataSurveyCheck.q18_ktckn_yes}
            onChange={() => handleChange('q18_ktckn', 'q18_ktckn_yes')}
                      />
                        <label htmlFor="chk_q18_ktckn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={204} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ktckn_no" name="chk_q18_ktckn" ng-checked={dataItem?.survey.card.q18_ktckn_no}
                       checked={dataSurveyCheck.q18_ktckn_no}
            onChange={() => handleChange('q18_ktckn', 'q18_ktckn_no')}
                      />
                        <label htmlFor="chk_q18_ktckn_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đau ngực:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={205} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dn_yes" name="chk_q18_dn" ng-checked={dataItem?.survey.card.q18_dn_yes}
                         checked={dataSurveyCheck.q18_dn_yes}
            onChange={() => handleChange('q18_dn', 'q18_dn_yes')}
                      />
                        <label htmlFor="chk_q18_dn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={206} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dn_no" name="chk_q18_dn" ng-checked={dataItem?.survey.card.q18_dn_no}
                         checked={dataSurveyCheck.q18_dn_no}
            onChange={() => handleChange('q18_dn', 'q18_dn_no')}
                      />
                        <label htmlFor="chk_q18_dn_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Tim đập không đều:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={207} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_tdkd_yes" name="chk_q18_tdkd" ng-checked={dataItem?.survey.card.q18_tdkd_yes}
                      checked={dataSurveyCheck.q18_tdkd_yes}
            onChange={() => handleChange('q18_tdkd', 'q18_tdkd_yes')}
                      />
                        <label htmlFor="chk_q18_tdkd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={208} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_tdkd_no" name="chk_q18_tdkd" ng-checked={dataItem?.survey.card.q18_tdkd_no}
                      checked={dataSurveyCheck.q18_tdkd_no}
            onChange={() => handleChange('q18_tdkd', 'q18_tdkd_no')}
                      />
                        <label htmlFor="chk_q18_tdkd_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Phù chân:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={209} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_pc_yes" name="chk_q18_pc" ng-checked={dataItem?.survey.card.q18_pc_yes}
                      checked={dataSurveyCheck.q18_pc_yes}
            onChange={() => handleChange('q18_pc', 'q18_pc_yes')}
                      />
                        <label htmlFor="chk_q18_pc_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={210} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_pc_no" name="chk_q18_pc" ng-checked={dataItem?.survey.card.q18_pc_no}
                      checked={dataSurveyCheck.q18_pc_no}
            onChange={() => handleChange('q18_pc', 'q18_pc_no')}
                      />
                        <label htmlFor="chk_q18_pc_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đau nhức chân khi đi lại hoặc khi tập thể thao:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={211} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dnc_yes" name="chk_q18_dnc" ng-checked={dataItem?.survey.card.q18_dnc_yes}
                      checked={dataSurveyCheck.q18_dnc_yes}
            onChange={() => handleChange('q18_dnc', 'q18_dnc_yes')}
                      />
                        <label htmlFor="chk_q18_dnc_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={212} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dnc_no" name="chk_q18_dnc" ng-checked={dataItem?.survey.card.q18_dnc_no}
                      checked={dataSurveyCheck.q18_dnc_no}
            onChange={() => handleChange('q18_dnc', 'q18_dnc_no')}
                      />
                        <label htmlFor="chk_q18_dnc_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đau nhức chân cả khi nghỉ ngơi:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={213} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dnccknn_yes" name="chk_q18_dnccknn" ng-checked={dataItem?.survey.card.q18_dnccknn_yes}
                       checked={dataSurveyCheck.q18_dnccknn_yes}
            onChange={() => handleChange('q18_dnccknn', 'q18_dnccknn_yes')}
                      />
                        <label htmlFor="chk_q18_dnccknn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={214} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dnccknn_no" name="chk_q18_dnccknn" ng-checked={dataItem?.survey.card.q18_dnccknn_no}
                       checked={dataSurveyCheck.q18_dnccknn_no}
            onChange={() => handleChange('q18_dnccknn', 'q18_dnccknn_no')}
                      />
                        <label htmlFor="chk_q18_dnccknn_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đau lưng:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={215} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dl_yes" name="chk_q18_dl" ng-checked={dataItem?.survey.card.q18_dl_yes}
                         checked={dataSurveyCheck.q18_dl_yes}
            onChange={() => handleChange('q18_dl', 'q18_dl_yes')}
                      />
                        <label htmlFor="chk_q18_dl_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={216} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dl_no" name="chk_q18_dl" ng-checked={dataItem?.survey.card.q18_dl_no}
                       checked={dataSurveyCheck.q18_dl_no}
            onChange={() => handleChange('q18_dl', 'q18_dl_no')}
                      />
                        <label htmlFor="chk_q18_dl_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Không thể chịu được nóng hoặc lạnh:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={217} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ktcdnhl_yes" name="chk_q18_ktcdnhl" ng-checked={dataItem?.survey.card.q18_ktcdnhl_yes}
                       checked={dataSurveyCheck.q18_ktcdnhl_yes}
            onChange={() => handleChange('q18_ktcdnhl', 'q18_ktcdnhl_yes')}
                      />
                        <label htmlFor="chk_q18_ktcdnhl_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={218} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ktcdnhl_no" name="chk_q18_ktcdnhl" ng-checked={dataItem?.survey.card.q18_ktcdnhl_no}
                        checked={dataSurveyCheck.q18_ktcdnhl_no}
            onChange={() => handleChange('q18_ktcdnhl', 'q18_ktcdnhl_no')}
                      />
                        <label htmlFor="chk_q18_ktcdnhl_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Run tay:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={219} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_rt_yes" name="chk_q18_rt" ng-checked={dataItem?.survey.card.q18_rt_yes}
                      checked={dataSurveyCheck.q18_rt_yes}
            onChange={() => handleChange('q18_rt', 'q18_rt_yes')}
                      />
                        <label htmlFor="chk_q18_rt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={220} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_rt_no" name="chk_q18_rt" ng-checked={dataItem?.survey.card.q18_rt_no}
                      checked={dataSurveyCheck.q18_rt_no}
            onChange={() => handleChange('q18_rt', 'q18_rt_no')}
                      />
                        <label htmlFor="chk_q18_rt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Rậm lông tóc:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={221} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_rlt_yes" name="chk_q18_rlt" ng-checked={dataItem?.survey.card.q18_rlt_yes}
                        checked={dataSurveyCheck.q18_rlt_yes}
            onChange={() => handleChange('q18_rlt', 'q18_rlt_yes')}
                      />
                        <label htmlFor="chk_q18_rlt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={222} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_rlt_no" name="chk_q18_rlt" ng-checked={dataItem?.survey.card.q18_rlt_no}
                       checked={dataSurveyCheck.q18_rlt_no}
            onChange={() => handleChange('q18_rlt', 'q18_rlt_no')}
                      />
                        <label htmlFor="chk_q18_rlt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Lông tóc thưa:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={223} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ltt_yes" name="chk_q18_ltt" ng-checked={dataItem?.survey.card.q18_ltt_yes}
                       checked={dataSurveyCheck.q18_ltt_yes}
            onChange={() => handleChange('q18_ltt', 'q18_ltt_yes')}
                      />
                        <label htmlFor="chk_q18_ltt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={224} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ltt_no" name="chk_q18_ltt" ng-checked={dataItem?.survey.card.q18_ltt_no}
                       checked={dataSurveyCheck.q18_ltt_no}
            onChange={() => handleChange('q18_ltt', 'q18_ltt_no')}
                      />
                        <label htmlFor="chk_q18_ltt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Khát nước nhiều:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={225} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_knn_yes" name="chk_q18_knn" ng-checked={dataItem?.survey.card.q18_knn_yes}
                       checked={dataSurveyCheck.q18_knn_yes}
            onChange={() => handleChange('q18_knn', 'q18_knn_yes')}
                      />
                        <label htmlFor="chk_q18_knn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={226} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_knn_no" name="chk_q18_knn" ng-checked={dataItem?.survey.card.q18_knn_no}
                      checked={dataSurveyCheck.q18_knn_no}
            onChange={() => handleChange('q18_knn', 'q18_knn_no')}
                      />
                        <label htmlFor="chk_q18_knn_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đi tiểu nhiều:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={227} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dtn_yes" name="chk_q18_dtn" ng-checked={dataItem?.survey.card.q18_dtn_yes}
                        checked={dataSurveyCheck.q18_dtn_yes}
            onChange={() => handleChange('q18_dtn', 'q18_dtn_yes')}
                      />
                        <label htmlFor="chk_q18_dtn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={228} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dtn_no" name="chk_q18_dtn" ng-checked={dataItem?.survey.card.q18_dtn_no}
                        checked={dataSurveyCheck.q18_dtn_no}
            onChange={() => handleChange('q18_dtn', 'q18_dtn_no')}
                      />
                        <label htmlFor="chk_q18_dtn_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Nuốt khó/ nghẹn:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={229} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_nkn_yes" name="chk_q18_nkn" ng-checked={dataItem?.survey.card.q18_nkn_yes}
                      checked={dataSurveyCheck.q18_nkn_yes}
            onChange={() => handleChange('q18_nkn', 'q18_nkn_yes')}
                      />
                        <label htmlFor="chk_q18_nkn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={230} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_nkn_no" name="chk_q18_nkn" ng-checked={dataItem?.survey.card.q18_nkn_no}
                      checked={dataSurveyCheck.q18_nkn_no}
            onChange={() => handleChange('q18_nkn', 'q18_nkn_yes')}
                      />
                        <label htmlFor="chk_q18_nkn_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Nuốt đau:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={231} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_nd_yes" name="chk_q18_nd" ng-checked={dataItem?.survey.card.q18_nd_yes}
                       checked={dataSurveyCheck.q18_nd_yes}
            onChange={() => handleChange('q18_nd', 'q18_nd_yes')}
                      />
                        <label htmlFor="chk_q18_nd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={232} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_nd_no" name="chk_q18_nd" ng-checked={dataItem?.survey.card.q18_nd_no}
                        checked={dataSurveyCheck.q18_nd_no}
            onChange={() => handleChange('q18_nd', 'q18_nd_no')}
                      />
                        <label htmlFor="chk_q18_nd_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ợ nóng/ Ợ chua:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={233} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_onoc_yes" name="chk_q18_onoc" ng-checked={dataItem?.survey.card.q18_onoc_yes}
                       checked={dataSurveyCheck.q18_onoc_yes}
            onChange={() => handleChange('q18_onoc', 'q18_onoc_yes')}
                      />
                        <label htmlFor="chk_q18_onoc_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={234} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_onoc_no" name="chk_q18_onoc" ng-checked={dataItem?.survey.card.q18_onoc_no}
                        checked={dataSurveyCheck.q18_onoc_no}
            onChange={() => handleChange('q18_onoc', 'q18_onoc_no')}
                      />
                        <label htmlFor="chk_q18_onoc_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{marginBottom: "5px" }}>Ợ trớ thức ăn/dịch dạ dày:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={235} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_octa_yes" name="chk_q18_octa" ng-checked={dataItem?.survey.card.q18_octa_yes}
                       checked={dataSurveyCheck.q18_octa_yes}
            onChange={() => handleChange('q18_octa', 'q18_octa_yes')}
                      />
                        <label htmlFor="chk_q18_octa_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={236} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_octa_no" name="chk_q18_octa" ng-checked={dataItem?.survey.card.q18_octa_no}
                       checked={dataSurveyCheck.q18_octa_no}
              onChange={() => handleChange('q18_octa', 'q18_octa_no')}
                      />
                        <label htmlFor="chk_q18_octa_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Buồn nôn:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={237} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_bn_yes" name="chk_q18_bn" ng-checked={dataItem?.survey.card.q18_bn_yes}
                       checked={dataSurveyCheck.q18_bn_yes}
            onChange={() => handleChange('q18_bn', 'q18_bn_yes')}
                      />
                        <label htmlFor="chk_q18_bn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={238} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_bn_no" name="chk_q18_bn" ng-checked={dataItem?.survey.card.q18_bn_no}
                      checked={dataSurveyCheck.q18_bn_no}
            onChange={() => handleChange('q18_bn', 'q18_bn_no')}
                      />
                        <label htmlFor="chk_q18_bn_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Nôn:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={239} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_n_yes" name="chk_q18_n" ng-checked={dataItem?.survey.card.q18_n_yes}
                      checked={dataSurveyCheck.q18_n_yes}
            onChange={() => handleChange('q18_n', 'q18_n_yes')}
                      />
                        <label htmlFor="chk_q18_n_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={240} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_n_no" name="chk_q18_n" ng-checked={dataItem?.survey.card.q18_n_no}
                      checked={dataSurveyCheck.q18_n_no}
            onChange={() => handleChange('q18_n', 'q18_n_no')}
                      />
                        <label htmlFor="chk_q18_n_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đau bụng:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={241} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_db_yes" name="chk_q18_db" ng-checked={dataItem?.survey.card.q18_db_yes}
                      checked={dataSurveyCheck.q18_db_yes}
            onChange={() => handleChange('q18_db', 'q18_db_yes')}
                      />
                        <label htmlFor="chk_q18_db_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={242} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_db_no" name="chk_q18_db" ng-checked={dataItem?.survey.card.q18_db_no}
                       checked={dataSurveyCheck.q18_db_no}
            onChange={() => handleChange('q18_db', 'q18_db_no')}
                      />
                        <label htmlFor="chk_q18_db_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Chướng bụng:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={243} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_cb_yes" name="chk_q18_cb" ng-checked={dataItem?.survey.card.q18_cb_yes}
                        checked={dataSurveyCheck.q18_cb_yes}
            onChange={() => handleChange('q18_cb', 'q18_cb_yes')}
                      />
                        <label htmlFor="chk_q18_cb_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={244} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_cb_no" name="chk_q18_cb" ng-checked={dataItem?.survey.card.q18_cb_no}
                      checked={dataSurveyCheck.q18_cb_no}
            onChange={() => handleChange('q18_cb', 'q18_cb_no')}
                      />
                        <label htmlFor="chk_q18_cb_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Tiêu chảy:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={245} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_tc_yes" name="chk_q18_tc" ng-checked={dataItem?.survey.card.q18_tc_yes}
                       checked={dataSurveyCheck.q18_tc_yes}
            onChange={() => handleChange('q18_tc', 'q18_tc_yes')}
                      />
                        <label htmlFor="chk_q18_tc_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={246} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_tc_no" name="chk_q18_tc" ng-checked={dataItem?.survey.card.q18_tc_no}
                        checked={dataSurveyCheck.q18_tc_no}
            onChange={() => handleChange('q18_tc', 'q18_tc_no')}
                      />
                        <label htmlFor="chk_q18_tc_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Táo bón:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={247} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_tb_yes" name="chk_q18_tb" ng-checked={dataItem?.survey.card.q18_tb_yes}
                       checked={dataSurveyCheck.q18_tb_yes}
            onChange={() => handleChange('q18_tb', 'q18_tb_yes')}
                      />
                        <label htmlFor="chk_q18_tb_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={248} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_tb_no" name="chk_q18_tb" ng-checked={dataItem?.survey.card.q18_tb_no}
                        checked={dataSurveyCheck.q18_tb_no}
            onChange={() => handleChange('q18_tb', 'q18_tb_no')}
                      />
                        <label htmlFor="chk_q18_tb_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đi cầu ra máu:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={249} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dcrm_yes" name="chk_q18_dcrm" ng-checked={dataItem?.survey.card.q18_dcrm_yes}
                      checked={dataSurveyCheck.q18_dcrm_yes}
            onChange={() => handleChange('q18_dcrm', 'q18_dcrm_yes')}
                      />
                        <label htmlFor="chk_q18_dcrm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={250} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dcrm_no" name="chk_q18_dcrm" ng-checked={dataItem?.survey.card.q18_dcrm_no}
                       checked={dataSurveyCheck.q18_dcrm_no}
            onChange={() => handleChange('q18_dcrm', 'q18_dcrm_no')}
                      />
                        <label htmlFor="chk_q18_dcrm_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Vàng da:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={251} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_vd_yes" name="chk_q18_vd" ng-checked={dataItem?.survey.card.q18_vd_yes}
                      checked={dataSurveyCheck.q18_vd_yes}
            onChange={() => handleChange('q18_vd', 'q18_vd_yes')}
                      />
                        <label htmlFor="chk_q18_vd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={252} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_vd_no" name="chk_q18_vd" ng-checked={dataItem?.survey.card.q18_vd_no}
                       checked={dataSurveyCheck.q18_vd_no}
            onChange={() => handleChange('q18_vd', 'q18_vd_no')}
                      />
                        <label htmlFor="chk_q18_vd_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ngứa da mức độ nhiều:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={253} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ndmdn_yes" name="chk_q18_ndmdn" ng-checked={dataItem?.survey.card.q18_ndmdn_yes}
                      checked={dataSurveyCheck.q18_ndmdn_yes}
            onChange={() => handleChange('q18_ndmdn', 'q18_ndmdn_yes')}
                      />
                        <label htmlFor="chk_q18_ndmdn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={254} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ndmdn_no" name="chk_q18_ndmdn" ng-checked={dataItem?.survey.card.q18_ndmdn_no}
                        checked={dataSurveyCheck.q18_ndmdn_no}
            onChange={() => handleChange('q18_ndmdn', 'q18_ndmdn_no')}
                      />
                        <label htmlFor="chk_q18_ndmdn_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đi cầu khó (phải rặn nhiều):</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={255} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dck_yes" name="chk_q18_dck" ng-checked={dataItem?.survey.card.q18_dck_yes}
                       checked={dataSurveyCheck.q18_dck_yes}
            onChange={() => handleChange('q18_dck', 'q18_dck_yes')}
                      />
                        <label htmlFor="chk_q18_dck_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={256} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dck_no" name="chk_q18_dck" ng-checked={dataItem?.survey.card.q18_dck_no}
                      checked={dataSurveyCheck.q18_dck_no}
            onChange={() => handleChange('q18_dck', 'q18_dck_no')}
                      />
                        <label htmlFor="chk_q18_dck_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đi tiểu buốt:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={257} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dtb_yes" name="chk_q18_dtb" ng-checked={dataItem?.survey.card.q18_dtb_yes}
                       checked={dataSurveyCheck.q18_dtb_yes}
            onChange={() => handleChange('q18_dtb', 'q18_dtb_yes')}
                      />
                        <label htmlFor="chk_q18_dtb_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={258} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dtb_no" name="chk_q18_dtb" ng-checked={dataItem?.survey.card.q18_dtb_no}
                      checked={dataSurveyCheck.q18_dtb_no}
            onChange={() => handleChange('q18_dtb', 'q18_dtb_no')}
                      />
                        <label htmlFor="chk_q18_dtb_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đau khớp:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={259} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dk_yes" name="chk_q18_dk" ng-checked={dataItem?.survey.card.q18_dk_yes}
                      checked={dataSurveyCheck.q18_dk_yes}
            onChange={() => handleChange('q18_dk', 'q18_dk_yes')}
                      />
                        <label htmlFor="chk_q18_dk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={260} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_dk_no" name="chk_q18_dk" ng-checked={dataItem?.survey.card.q18_dk_no}
                       checked={dataSurveyCheck.q18_dk_no}
            onChange={() => handleChange('q18_dk', 'q18_dk_no')}
                      />
                        <label htmlFor="chk_q18_dk_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Lo âu:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={261} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_la_yes" name="chk_q18_la" ng-checked={dataItem?.survey.card.q18_la_yes}
                      checked={dataSurveyCheck.q18_la_yes}
            onChange={() => handleChange('q18_la', 'q18_la_yes')}
                      />
                        <label htmlFor="chk_q18_la_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={262} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_la_no" name="chk_q18_la" ng-checked={dataItem?.survey.card.q18_la_no}
                      checked={dataSurveyCheck.q18_la_no}
            onChange={() => handleChange('q18_la', 'q18_la_no')}
                      />
                        <label htmlFor="chk_q18_la_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Trầm cảm:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={263} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_trc_yes" name="chk_q18_trc" ng-checked={dataItem?.survey.card.q18_trc_yes}
                      checked={dataSurveyCheck.q18_trc_yes}
            onChange={() => handleChange('q18_trc', 'q18_trc_yes')}
                      />
                        <label htmlFor="chk_q18_trc_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={264} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_trc_no" name="chk_q18_trc" ng-checked={dataItem?.survey.card.q18_trc_no}
                      checked={dataSurveyCheck.q18_trc_no}
            onChange={() => handleChange('q18_trc', 'q18_trc_no')}
                      />
                        <label htmlFor="chk_q18_trc_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Bị ngất:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={265} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_bingat_yes" name="chk_q18_bingat" ng-checked={dataItem?.survey.card.q18_bingat_yes}
                       checked={dataSurveyCheck.q18_bingat_yes}
            onChange={() => handleChange('q18_bingat', 'q18_bingat_yes')}
                      />
                        <label htmlFor="chk_q18_bingat_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={266} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_bingat_no" name="chk_q18_bingat" ng-checked={dataItem?.survey.card.q18_bingat_no}
                      checked={dataSurveyCheck.q18_bingat_no}
            onChange={() => handleChange('q18_bingat', 'q18_bingat_no')}
                      />
                        <label htmlFor="chk_q18_bingat_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Chóng mặt:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={267} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_cm_yes" name="chk_q18_cm" ng-checked={dataItem?.survey.card.q18_cm_yes}
                      checked={dataSurveyCheck.q18_cm_yes}
            onChange={() => handleChange('q18_cm', 'q18_cm_yes')}
                      />
                        <label htmlFor="chk_q18_cm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={268} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_cm_no" name="chk_q18_cm" ng-checked={dataItem?.survey.card.q18_cm_no}
                       checked={dataSurveyCheck.q18_cm_no}
            onChange={() => handleChange('q18_cm', 'q18_cm_no')}
                      />
                        <label htmlFor="chk_q18_cm_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Nhìn đôi/ song thị (nhìn thấy hai hình ảnh của một đối tượng):</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={269} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ndsn_yes" name="chk_q18_ndsn" ng-checked={dataItem?.survey.card.q18_ndsn_yes}
                        checked={dataSurveyCheck.q18_ndsn_yes}
            onChange={() => handleChange('q18_ndsn', 'q18_ndsn_yes')}
                      />
                        <label htmlFor="chk_q18_ndsn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={270} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_ndsn_no" name="chk_q18_ndsn" ng-checked={dataItem?.survey.card.q18_ndsn_no}
                        checked={dataSurveyCheck.q18_ndsn_no}
            onChange={() => handleChange('q18_ndsn', 'q18_ndsn_no')}
                      />
                        <label htmlFor="chk_q18_ndsn_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Mất thăng bằng hoặc khả năng phối hợp động tác:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={271} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_mtb_yes" name="chk_q18_mtb" ng-checked={dataItem?.survey.card.q18_mtb_yes}
                       checked={dataSurveyCheck.q18_mtb_yes}
            onChange={() => handleChange('q18_mtb', 'q18_mtb_yes')}
                      />
                        <label htmlFor="chk_q18_mtb_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={272} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_mtb_no" name="chk_q18_mtb" ng-checked={dataItem?.survey.card.q18_mtb_no}
                      checked={dataSurveyCheck.q18_mtb_no}
            onChange={() => handleChange('q18_mtb', 'q18_mtb_no')}
                      />
                        <label htmlFor="chk_q18_mtb_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Rối loạn ngôn ngữ:</div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={273} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_rlnn_yes" name="chk_q18_rlnn" ng-checked={dataItem?.survey.card.q18_rlnn_yes}
                         checked={dataSurveyCheck.q18_rlnn_yes}
            onChange={() => handleChange('q18_rlnn', 'q18_rlnn_yes')}
                      />
                        <label htmlFor="chk_q18_rlnn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                      <input tabIndex={274} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_rlnn_no" name="chk_q18_rlnn" ng-checked={dataItem?.survey.card.q18_rlnn_no}
                      checked={dataSurveyCheck.q18_rlnn_no}
            onChange={() => handleChange('q18_rlnn', 'q18_rlnn_no')}
                      />
                        <label htmlFor="chk_q18_rlnn_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
                </div>
                {
                  data?.customer?.gender?.id === "M" ?
                    <div className="row htmlForm-group" ng-show="dataItem.customer.gender != null && dataItem.customer.gender.id == 'M'">
                      <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Teo tinh hoàn:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                          <input tabIndex={275} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_tth_yes" name="chk_q18_tth" ng-checked={dataItem?.survey.card.q18_tth_yes}
                          checked={dataSurveyCheck.q18_tth_yes}
            onChange={() => handleChange('q18_tth', 'q18_tth_yes')}
                          />
                        <label htmlFor="chk_q18_tth_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                          <input tabIndex={276} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_tth_no" name="chk_q18_tth" ng-checked={dataItem?.survey.card.q18_tth_no}
                          checked={dataSurveyCheck.q18_tth_no}
            onChange={() => handleChange('q18_tth', 'q18_tth_no')}
                          />
                        <label htmlFor="chk_q18_tth_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div> : <></>
                }
                {
                 data?.customer?.gender?.id === "M" ? <></> :
                     <div className="row htmlForm-group" ng-show="dataItem.customer.gender != null && dataItem.customer.gender.id == 'F'">
                      <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Rối loạn kinh nguyệt:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                          <input tabIndex={277} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_rlkn_yes" name="chk_q18_rlkn" ng-checked={dataItem?.survey.card.q18_rlkn_yes}
                           checked={dataSurveyCheck.q18_rlkn_yes}
            onChange={() => handleChange('q18_rlkn', 'q18_rlkn_yes')}
                          />
                        <label htmlFor="chk_q18_rlkn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                          <input tabIndex={278} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_rlkn_no" name="chk_q18_rlkn" ng-checked={dataItem?.survey.card.q18_rlkn_no}
                          checked={dataSurveyCheck.q18_rlkn_no}
            onChange={() => handleChange('q18_rlkn', 'q18_rlkn_no')}
                          />
                        <label htmlFor="chk_q18_rlkn_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
            }
                {
                 data?.customer?.gender?.id === "M" ? <></> : 
                      <div className="row htmlForm-group" ng-show="dataItem.customer.gender != null && dataItem.customer.gender.id == 'F'">
                      <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bạn có đang mang thai?</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px"}}>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                          <input tabIndex={279} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_bcdmt_yes" name="chk_q18_bcdmt" ng-checked={dataItem?.survey.card.q18_bcdmt_yes}
                           checked={dataSurveyCheck.q18_bcdmt_yes}
            onChange={() => handleChange('q18_bcdmt', 'q18_bcdmt_yes')}
                          />
                        <label htmlFor="chk_q18_bcdmt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="custom-control custom-radio">
                          <input tabIndex={280} className="custom-control-input cursor-pointer" type="radio" id="chk_q18_bcdmt_no" name="chk_q18_bcdmt" ng-checked={dataItem?.survey.card.q18_bcdmt_no}
                           checked={dataSurveyCheck.q18_bcdmt_no}
            onChange={() => handleChange('q18_bcdmt', 'q18_bcdmt_no')}
                          />
                        <label htmlFor="chk_q18_bcdmt_no" className="custom-control-label cursor-pointer">Không</label>
                    </div>
                </div></div>
            </div>
           }
          
        </div>
    </div>
</div>
     </div>
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center", marginTop: "15px", paddingLeft: "20px", paddingRight: "20px",
            position: "fixed",
            bottom: 10,
          right: "0px",
            width:"100%"
        }}>
          <div
           
              onClick={
  
     handleSaveSV
    
  }

             style={{
              height: "fit-content",
              width: "100%",
              color: "white",
              fontWeight: "600",
              background: "linear-gradient(to bottom,rgb(240, 115, 115) 0%,rgb(216, 6, 6) 100%)",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              borderRadius: "200px",
               textTransform: "uppercase",
               display: "flex",
               justifyContent: "center", gap: 10,
               alignItems:"end", fontSize:"14px"
            }}>
            <img src={logoSave} style={{ width: "20px" ,height:"20px"}}>
          
          </img>  Lưu và gửi đến Doctor Check</div>
          </div>
      </div>
        <div style={overlayStyle}>
        <div style={popupStyle}>
         
          <p>
          {text}
          </p>
           <a
          href="https://www.doctorcheck.vn/"
       
             
            style={{
              height: "fit-content",
              width: "fit-content",
              color: "white",
              fontWeight: "600",
              background:  "#007BFF",
              paddingTop: "0.3rem",
              paddingBottom: "0.3rem",
              borderRadius: "6px",
              paddingLeft: "20px",
              paddingRight: "20px",
              textTransform: "uppercase",
              fontSize: "14px",

              
            }}
          >
           Thoát
          </a> 
        </div>
      </div>
       <div style={overlayStyle1}>
        <div style={popupStyle1}>
         
         <div
      style={{
        textAlign: "center",
        padding: "20px",
        background: "white",
        borderRadius: "10px",
      
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <p style={{ fontSize: "16px", color: "#333", lineHeight: "1.6", fontWeight: "bold" }}>
       Quý khách đã trả lời các câu hỏi sàng lọc trước khám thành công!
      </p>
      <p style={{ fontSize: "16px", color: "#333", lineHeight: "1.6" }}>
      Doctor Check đã nhận được thông tin trả lời các câu hỏi sàng lọc trước khám của Quý khách.
      </p>
      <p style={{ fontSize: "16px", color: "#333", lineHeight: "1.6" }}>
       Rất cảm ơn Quý khách đã dành thời gian thực hiện.
      </p>
      <p style={{ fontSize: "18px", color: "#056F8E", fontWeight: "bold" }}>
      Chúc Quý khách luôn khỏe mạnh và hạnh phúc!
      </p>
    </div>
          <div style={{display:"flex", alignItems:"center"}}>

            <button
  style={{
    background: "#056F8E",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginRight: "10px",
  }}onClick={() =>   navigators(`/verify-profile?r=${r}`)}
>
 Hoàn tất
</button>

          
          </div>
        </div>
        </div>
    </Spin>
  );
};
export default Survey;
