/* @flow */
let host = window.location.host;
if (process.env.NODE_ENV === 'development') {
  // host = 'dev.shaka.hsohealth.com';
  host = 'dev.shaco.hsohealth.com/shacoapi';
  // host = 'dev2.shaka.hsohealth.com';
  // host = 'localhost';
  // host = '172.16.10.199';
}
if (process.env.NODE_ENV === 'test') {
  host = 'dev.shaco.hsohealth.com/shacoapi';
}

// export const rootURL = `http://${host}/api/v1/`;
export const rootURL: string = `https://${host}/api/v1/`;
export const commonURL: string = `https://${host}/`;
/**
 * 录入血压地址
 * @type {string}
 */
export const addBPDataPath: string = 'patient_mgmt/patients/save_blood_pressure_data';

/**
 * 获取血压列表地址（历史）
 * @type {string}
 */
export const getBPListPath: string = 'patient_mgmt/patients/get_blood_pressure_list';

/**
 * 获取血压趋势地址（历史）
 * @type {string}
 */
export const getBPTrendPath: string = 'patient_mgmt/patients/get_blood_pressure_history_data';

/**
 * 上传OSS地址
 * @type {string}
 */
export const GetOSSSignature: string = 'get_oss_signature/hso_record';


/**
 * 录入血脂地址
 * @type {string}
 */
export const addBloodLipidsDataPath: string = 'patient_mgmt/patients/save_bloodlipids_data';

export const getOpenIdPath = (code: string): string => `wechat/auth/${code}`;
export const csPath: string = 'patient_mgmt/patients/user_info';

/**
 * 获取用户当月打卡次数
 * @type {string}
 */
export const getMedicationTimePath: string = 'patient_mgmt/patients/take_medicine_record_times';

/**
 * 服药打卡
 * @type {string}
 */
export const addMedicationDataPath: string = 'patient_mgmt/patients/save_take_medicine_record';

/**
 * 更新用户服药打卡药单
 * @type {string}
 */
export const updateMedicationDataPath: string = 'patient_mgmt/patients/save_user_medication_list';

/**
 * 实时搜索药品名称或通用名
 * @type {string}
 */
export const getMedicationNamePath: string = 'real_time/medication';

/**
 * 获取服药打卡记录
 * @type {string}
 */
export const getMedicationRecordPath: string = 'patient_mgmt/patients/get_medication_score_list';

/**
 * 获取服药打卡时间分布
 * @type {string}
 */
export const getMedicationTimeLinePath: string = 'patient_mgmt/patients/get_medication_time_line';

/**
 *是否服药打卡
 * @type {string}
 */
export const getIsMediactionPath: string = 'patient_mgmt/patients/get_medication_status';

/**
 * 降脂大赛报名
 * @type {string}
 */
export const signUpDataPath: string = 'patient_mgmt/patients/save_signing_up_record';

/**
 * 是否报名降脂大赛
 * @type {string}
 */
export const isSignUpDataPath: string = 'patient_mgmt/patients/get_lipids_signing_up_record';

/**
 * 获取微信配置
 * @type {string}
 */
export const getWeConfigPath: string = 'js_config';

/**
 * 获取我的保单列表
 * @type {string}
 */
export const getInsuranceListPath: string = 'patient_mgmt/patient/my_insurance_list';

/**
 * 获取我的保单详情
 * @type {string}
 */
export const getInsuranceInfoPath: string = '';

/**
 * 获取我购买过哪种类型的保险
 * @type {string}
 */
export const getClaimsGuidePath: string = 'patient_mgmt/patient/get_patient_insurance_type';

/**
 * 获取我的监护记录
 * @type {string}
 */
export const getWardRecordPath = 'patient_mgmt/patient/record_sum';

/**
 * 获取我的监护记录
 * @type {string}
 */
export const shareWardRecordPath = 'patient_mgmt/patients/get_share';

/**
 * 获取我的医生工作室
 * @type {string}
 */
export const getDoctorStudioPath = 'patient_mgmt/patient/my_doctor_studio';

// 危险排查功能(获取危险排查功能)
export const getInvestigationDataPath = 'patient_mgmt/patients/get_danger_check_info';
// 危险排查功能(提交危险排查信息)
export const saveInvestigationDatePath = 'patient_mgmt/patients/danger_check';

// 获取用户信息
export const getUserInfoPath = 'patient_mgmt/patients/get_insurance_status';

// 复诊绿色通道（获取签约工作室信息）
export const getDoctorStudioDataPath = 'patient_mgmt/patients/doctor_studios';
// 复诊绿色通道（提交复诊信息）
export const saveGreenChannelPath = 'patient_mgmt/patients/my_appointment';
// 复诊绿色通道（获取复诊列表）
export const getGreenChannelListPath = 'patient_mgmt/patients/my_appointment';

// Q&A 列表
export const getHelpCenterListPath = 'patient_mgmt/patients/insurance_qa_list';
// Q&A  详情
export const getHelpCenterPath = 'patient_mgmt/patients/insurance_qa';
export const getReferralListPath = 'patient_mgmt/patients/my_appointment';
// 获取康复必读列表
export const getMustReadListPath = 'wechat/material_list';
// 咨询
export const askQuestionPath = 'patient_mgmt/patient/ask_question';

export const getPaymentInfoPath = (prescriptionId: string) =>
`payment/prescription/${prescriptionId}/payment_info`;

export const payPath = 'payment/charge';

// 支付反馈信息
export const paymentFeedbackPath = 'payment/feedback';

// 更新电子服务申请
export const updateApplyDataPath = 'patient_mgmt/electronic_prescription/update_user_info';

// 获取电子服务信息
export const getApplyDataPath = 'patient_mgmt/electronic_prescription/validate_service_term';

// 获取共有链接
export const getOssImgPath = 'oss_private_url';

// 膳食管理 获取用户食物列表
export const getMyFoodPath = 'patient_mgmt/patients/my_foods';

// 更新我的食物列表（整体膳食评估）
export const overallEvaluationDataPath = 'patient_mgmt/patients/overall_foods_evaluation';

// 单一膳食评估
export const getSingleHealthReportPath = 'patient_mgmt/patients/report_food_info';

// 直接访问膳食顾问
export const consultDietManager = 'patient_mgmt/patients/consult_diet_manager';

// 直接访问膳食顾问
export const singleEvaluationDataPath = 'patient_mgmt/patients/single_foods_evaluation';

// 实时搜索食物
export const getFoodNamePath = 'real_time/food_assessment';

// 获取膳食健康报告
export const getDietHealthReportPath = 'patient_mgmt/patients/report_food_info';

// 直接访问身体活动咨询组
export const consultPhyActivityPath = 'patient_mgmt/patients/consult_sport_manager';

// 获取用户身体活动列表
export const getMyPhyActivePath = 'patient_mgmt/patients/my_sports';

// 实时搜索活动列表
export const getPhyList = 'real_time/report_datas_assessment';

// 更新我的身体活动列表
export const savePhyActivityPath = 'patient_mgmt/patients/sports_evaluation';

// 获取用户信息
export const getPatientInfoPath = 'patient_mgmt/patient/get_body_info';

// 计算基础代谢率
export const getBasalMetabolismPath = 'patient_mgmt/patient/get_metabolicate_rate';

// 获取每日健康患者主诉
export const getRecordInfoPath = 'patient_mgmt/patient/patient_record_info';

// 保存每日健康患者主诉
export const saveRecordInfoPath = 'patient_mgmt/patient/save_patient_record_info';


// 获取用户的食物烹饪列表
export const getMyCookingPath = 'patient_mgmt/patients/food_cook_last_report_food';
// 保存烹饪
export const saveCookingPath = 'patient_mgmt/patients/food_cook_evaluation';
// 烹饪方式列表
export const getCookTypesPath = 'patient_mgmt/patients/food_cook_type';

// 保存睡眠
export const saveSleepPath = 'patient_mgmt/patients/sleep_evaluation';
// 直接咨询
export const consultSleepPath = 'patient_mgmt/patients/consult_sleep_manager';

// 保存我的情绪
export const saveEmotionPath = 'patient_mgmt/patients/feeling_evaluation';
// 获取情绪问题列表
export const getEmotionQuestionPath = 'patient_mgmt/patients/get_feelings';
// 直接咨询
export const consultEmotionPath = 'patient_mgmt/patients/consult_feeling_manager';

export const homeProgressPath = 'patient_mgmt/patient/today_health_list';

export const dayHealthListPath = 'patient_mgmt/patient/day_health_list';
export const weekHealthListPath = 'patient_mgmt/patient/day_health_list_percent';

export const myReportPath = 'patient_mgmt/patient/reports_by_type';

export const myDetaileContentPath = 'patient_mgmt/patient/health_list_detail';

export const updateTopicIdPath = 'patient_mgmt/patient/hour_health_list';

export const updateTopicTimePath = 'patient_mgmt/patient/health_topic_trigger_time';

export const finishTopicPathPath = 'patient_mgmt/patient/today_health_list';
// 在线咨询医助购买
export const askServiceSellerPath = 'patient_mgmt/patient/ask_service_seller';
// vip我的健康保障-康复服务内容
export const getRecoveryDataPath = 'patient_mgmt/patient/service_product_snap';
// 获取服务产品列表信息
export const getProductListPath = 'patient_mgmt/patient/service_product_list';
// 获取服务产品购买须知
export const getServiceInfoPath = 'patient_mgmt/patient/service_product_content';
// 患者创建电子处方单
export const createElectronicPrescriptionPath = 'patient_mgmt/patient/init_purchase_user_data';
// 获取服务条款
export const getProductNoticePath = 'patient_mgmt/patient/service_product_notice';
// 分享二维码
export const getQRCodePath = 'patient_mgmt/patients/get_temporary_qr';
// 获取每周健康报告
export const getReportInfoData = 'patient_mgmt/patients/get_summary_report';
// 获取服药打卡数据
export const getMeListDataPath = 'patient_mgmt/patients/get_medication_list';
// 获取所有保险列表
export const getAllInsuranceListData = 'patient_mgmt/insurance/products';
// 在线购买获取产品信息
export const getServiceProductInfoPath = 'patient_mgmt/patient/service_product_info';
// 在线购买支付
export const chargeInfoPath = 'payment/charge_info';
// 创建新的电子保单
export const createPurchaseUserDataPath = 'patient_mgmt/patient/new_init_purchase_user_data';
