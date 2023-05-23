/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GormDeletedAt {
  time?: string
  /** Valid is true if Time is not NULL */
  valid?: boolean
}

export interface ModelAccountingItem {
  amount?: number
  name?: string
}

export interface ModelBankAccount {
  accountNumber?: string
  address?: string
  bankName?: string
  createdAt?: string
  currency?: ModelCurrency
  currencyID?: string
  deletedAt?: GormDeletedAt
  id?: string
  intermediaryBankAddress?: string
  intermediaryBankName?: string
  name?: string
  ownerName?: string
  routingNumber?: string
  swiftCode?: string
  uksortCode?: string
  updatedAt?: string
}

export interface ModelBaseSalary {
  batch?: number
  category?: string
  company_account_amount?: number
  contract_amount?: number
  createdAt?: string
  currency?: ModelCurrency
  currency_id?: string
  deletedAt?: GormDeletedAt
  effective_date?: string
  employee?: ModelEmployee
  employee_id?: string
  id?: string
  insurance_amount?: number
  personal_account_amount?: number
  type?: string
  updatedAt?: string
}

export interface ModelChapter {
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  lead_id?: string
  name?: string
  updatedAt?: string
}

export interface ModelClient {
  address?: string
  contacts?: ModelClientContact[]
  country?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  description?: string
  id?: string
  industry?: string
  name?: string
  registrationNumber?: string
  updatedAt?: string
  website?: string
}

export interface ModelClientContact {
  clientID?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  emails?: number[]
  id?: string
  isMainContact?: boolean
  name?: string
  role?: string
  updatedAt?: string
}

export interface ModelCommissionExplain {
  amount?: number
  bucket_id?: number
  formatted_amount?: string
  id?: string
  month?: number
  name?: string
  todo_id?: number
  year?: number
}

export interface ModelCompanyContactInfo {
  address?: string
  phone?: string
}

export interface ModelCompanyInfo {
  createdAt?: string
  deletedAt?: GormDeletedAt
  description?: string
  id?: string
  info?: PgtypeJSONB
  name?: string
  registrationNumber?: string
  updatedAt?: string
}

export interface ModelCountry {
  cities?: string[]
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  updatedAt?: string
}

export interface ModelCurrency {
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  locale?: string
  name?: string
  symbol?: string
  type?: string
  updatedAt?: string
}

export interface ModelEmployee {
  address?: string
  avatar?: string
  base_salary?: ModelBaseSalary
  basecampAttachableSGID?: string
  /** social services */
  basecampID?: number
  city?: string
  country?: string
  createdAt?: string
  dateOfBirth?: string
  deletedAt?: GormDeletedAt
  discordID?: string
  discordName?: string
  displayName?: string
  employeeChapters?: ModelEmployeeChapter[]
  employeeOrganizations?: ModelEmployeeOrganization[]
  employeePositions?: ModelEmployeePosition[]
  employeeRoles?: ModelEmployeeRole[]
  employeeStacks?: ModelEmployeeStack[]
  employee_salary?: ModelEmployeeSalary
  /** basic info */
  fullName?: string
  gender?: string
  githubID?: string
  gitlabID?: string
  heads?: ModelProjectHead[]
  horoscope?: string
  id?: string
  identityCardPhotoBack?: string
  identityCardPhotoFront?: string
  joinedDate?: string
  leftDate?: string
  lineManager?: ModelEmployee
  lineManagerID?: string
  linkedInName?: string
  localBankBranch?: string
  localBankCurrency?: string
  localBankNumber?: string
  localBankRecipientName?: string
  localBranchName?: string
  mbti?: string
  mentees?: ModelEmployee[]
  notionEmail?: string
  notionID?: string
  notionName?: string
  organizations?: ModelOrganization[]
  passportPhotoBack?: string
  passportPhotoFront?: string
  personalEmail?: string
  phoneNumber?: string
  placeOfResidence?: string
  positions?: ModelPosition[]
  projectMembers?: ModelProjectMember[]
  referredBy?: string
  referrer?: ModelEmployee
  roles?: ModelRole[]
  seniority?: ModelSeniority
  seniorityID?: string
  socialAccounts?: ModelSocialAccount[]
  teamEmail?: string
  updatedAt?: string
  username?: string
  wiseAccountNumber?: string
  wiseCurrency?: string
  /** payroll info */
  wiseRecipientEmail?: string
  wiseRecipientID?: string
  wiseRecipientName?: string
  workUnitMembers?: ModelWorkUnitMember[]
  /** working info */
  workingStatus?: string
}

export interface ModelEmployeeChapter {
  chapter?: ModelChapter
  chapterID?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  employeeID?: string
  id?: string
  updatedAt?: string
}

export interface ModelEmployeeOrganization {
  createdAt?: string
  deletedAt?: GormDeletedAt
  employeeID?: string
  id?: string
  organization?: ModelOrganization
  organizationID?: string
  updatedAt?: string
}

export interface ModelEmployeePosition {
  createdAt?: string
  deletedAt?: GormDeletedAt
  employeeID?: string
  id?: string
  position?: ModelPosition
  positionID?: string
  updatedAt?: string
}

export interface ModelEmployeeRole {
  createdAt?: string
  deletedAt?: GormDeletedAt
  employeeID?: string
  id?: string
  role?: ModelRole
  roleID?: string
  updatedAt?: string
}

export interface ModelEmployeeSalary {
  actual_pay_day?: number
  bonus_amount?: number
  bonus_detail?: number[]
  commission_amount?: number
  commission_detail?: number[]
  employee_id?: string
  is_done?: boolean
  month?: number
  plan_pay_day?: number
  reimbursement_amount?: number
  reimbursement_detail?: number[]
  total_amount?: number
  year?: number
}

export interface ModelEmployeeStack {
  createdAt?: string
  deletedAt?: GormDeletedAt
  employeeID?: string
  id?: string
  stack?: ModelStack
  stackID?: string
  updatedAt?: string
}

export interface ModelLikertScaleCount {
  agree?: number
  disagree?: number
  mixed?: number
  stronglyAgree?: number
  stronglyDisagree?: number
}

export interface ModelNotionTechRadar {
  assign?: string
  categories?: string[]
  id?: string
  name?: string
  quadrant?: string
  ring?: string
  tags?: string[]
}

export interface ModelOrganization {
  avatar?: string
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  updatedAt?: string
}

export interface ModelPayroll {
  base_salary_amount?: number
  commission_amount?: number
  commission_explain?: number[]
  /** CommissionExplains is commission explains in email template */
  commission_explains?: ModelCommissionExplain[]
  contract_amount?: number
  conversion_amount?: number
  due_date?: string
  employee?: ModelEmployee
  employee_id?: string
  id?: string
  is_paid?: boolean
  month?: number
  project_bonus?: number
  project_bonus_explain?: number[]
  /** ProjectBonusExplains is project bonus explains in email template */
  project_bonus_explains?: ModelProjectBonusExplain[]
  total?: number
  /** TotalAllowance is amount of allowance in email template */
  total_allowance?: number
  total_explain?: number[]
  /** TotalAllowance is amount of allowance in email template */
  twAmount?: number
  twFee?: number
  /** TWRate is rate of allowance in email template */
  twRate?: number
  user_rank_snapshot?: number[]
  year?: number
}

export interface ModelPosition {
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  updatedAt?: string
}

export interface ModelProject {
  allowsSendingSurvey?: boolean
  avatar?: string
  bankAccount?: ModelBankAccount
  bankAccountID?: string
  client?: ModelClient
  clientEmail?: string
  clientID?: string
  code?: string
  companyInfo?: ModelCompanyInfo
  companyInfoID?: string
  country?: ModelCountry
  countryID?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  endDate?: string
  function?: string
  heads?: ModelProjectHead[]
  id?: string
  name?: string
  organization?: ModelOrganization
  organizationID?: string
  projectEmail?: string
  projectMembers?: ModelProjectMember[]
  projectNotion?: ModelProjectNotion
  projectStacks?: ModelProjectStack[]
  slots?: ModelProjectSlot[]
  startDate?: string
  status?: string
  type?: string
  updatedAt?: string
}

export interface ModelProjectBonusExplain {
  amount?: number
  bucket_id?: number
  description?: string
  formatted_amount?: string
  month?: number
  name?: string
  todo_id?: number
  year?: number
}

export interface ModelProjectHead {
  commissionRate?: number
  createdAt?: string
  deletedAt?: GormDeletedAt
  employee?: ModelEmployee
  employeeID?: string
  endDate?: string
  id?: string
  position?: string
  project?: ModelProject
  projectID?: string
  startDate?: string
  updatedAt?: string
}

export interface ModelProjectMember {
  createdAt?: string
  deletedAt?: GormDeletedAt
  deploymentType?: string
  discount?: number
  employee?: ModelEmployee
  employeeID?: string
  endDate?: string
  head?: ModelProjectHead
  id?: string
  isLead?: boolean
  note?: string
  positions?: ModelPosition[]
  project?: ModelProject
  projectID?: string
  projectMemberPositions?: ModelProjectMemberPosition[]
  projectSlotID?: string
  rate?: number
  seniority?: ModelSeniority
  seniorityID?: string
  startDate?: string
  status?: string
  updatedAt?: string
  upsellCommissionRate?: number
  upsellPerson?: ModelEmployee
  upsellPersonID?: string
}

export interface ModelProjectMemberPosition {
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  position?: ModelPosition
  positionID?: string
  projectMemberID?: string
  updatedAt?: string
}

export interface ModelProjectNotion {
  auditNotionID?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  project?: ModelProject
  projectID?: string
  updatedAt?: string
}

export interface ModelProjectSize {
  avatar?: string
  code?: string
  id?: string
  name?: string
  size?: number
}

export interface ModelProjectSlot {
  createdAt?: string
  deletedAt?: GormDeletedAt
  deploymentType?: string
  discount?: number
  id?: string
  note?: string
  project?: ModelProject
  projectID?: string
  projectMember?: ModelProjectMember
  projectSlotPositions?: ModelProjectSlotPosition[]
  rate?: number
  seniority?: ModelSeniority
  seniorityID?: string
  status?: string
  updatedAt?: string
  upsellPerson?: ModelEmployee
  upsellPersonID?: string
}

export interface ModelProjectSlotPosition {
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  position?: ModelPosition
  positionID?: string
  projectSlotID?: string
  updatedAt?: string
}

export interface ModelProjectStack {
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  projectID?: string
  stack?: ModelStack
  stackID?: string
  updatedAt?: string
}

export interface ModelResourceUtilization {
  available?: number
  date?: string
  internal?: number
  staffed?: number
}

export interface ModelRole {
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  level?: number
  name?: string
  updatedAt?: string
}

export interface ModelSeniority {
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  level?: number
  name?: string
  updatedAt?: string
}

export interface ModelSocialAccount {
  accountID?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  email?: string
  employeeID?: string
  id?: string
  name?: string
  type?: string
  updatedAt?: string
}

export interface ModelStack {
  avatar?: string
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  updatedAt?: string
}

export interface ModelValuation {
  /** money that company will receive in the future */
  accountReceivable?: {
    items?: ModelAccountingItem[]
    total?: number
  }
  /** valuation info */
  assets?: number
  currency?: string
  /** Total paid invoice, investment & bank interest */
  income?: {
    detail?: {
      consultantService?: number
      interest?: number
      investment?: number
    }
    total?: number
  }
  /** money that company will pay in the future */
  liabilities?: {
    items?: ModelAccountingItem[]
    total?: number
  }
  /** Sum of Expenses and payroll */
  outcome?: {
    detail?: {
      expense?: number
      investment?: number
      payroll?: number
    }
    total?: number
  }
  rate?: number
  /** basic info */
  year?: string
}

export interface ModelWorkUnit {
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  project?: ModelProject
  projectID?: string
  sourceMetadata?: number[]
  sourceURL?: string
  status?: string
  type?: string
  updatedAt?: string
  workUnitMembers?: ModelWorkUnitMember[]
  workUnitStacks?: ModelWorkUnitStack[]
}

export interface ModelWorkUnitMember {
  createdAt?: string
  deletedAt?: GormDeletedAt
  employee?: ModelEmployee
  employeeID?: string
  endDate?: string
  id?: string
  projectID?: string
  startDate?: string
  status?: string
  updatedAt?: string
  workUnit?: ModelWorkUnit
  workUnitID?: string
}

export interface ModelWorkUnitStack {
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  stack?: ModelStack
  stackID?: string
  updatedAt?: string
  workUnitID?: string
}

export interface PgtypeJSONB {
  bytes?: number[]
  status?: number
}

export interface RequestAssignMemberInput {
  deploymentType: string
  discount?: number
  employeeID?: string
  endDate?: string
  isLead?: boolean
  leadCommissionRate?: number
  note?: string
  positions: string[]
  rate: number
  seniorityID: string
  startDate?: string
  status: string
  upsellCommissionRate?: number
  upsellPersonID?: string
}

export interface RequestBasicEventQuestionInput {
  answer?: string
  eventQuestionID: string
  note?: string
}

export interface RequestCreateClientContactInput {
  emails?: string[]
  isMainContact?: boolean
  name?: string
  role?: string
}

export interface RequestCreateClientInput {
  address?: string
  contacts?: RequestCreateClientContactInput[]
  country?: string
  description?: string
  industry?: string
  name?: string
  registrationNumber?: string
  website?: string
}

export interface RequestCreateEmployeeInput {
  displayName: string
  fullName: string
  joinedDate: string
  personalEmail: string
  positions: string[]
  referredBy?: string
  roles: string[]
  salary: number
  seniorityID: string
  status: string
  teamEmail: string
}

export interface RequestCreatePositionInput {
  code: string
  name: string
}

export interface RequestCreateProjectInput {
  accountManagers?: RequestProjectHeadInput[]
  auditNotionID?: string
  bankAccountID?: string
  clientEmail?: string[]
  clientID?: string
  code?: string
  countryID: string
  deliveryManagers?: RequestProjectHeadInput[]
  function: string
  members?: RequestAssignMemberInput[]
  name: string
  organizationID?: string
  projectEmail?: string
  salePersons?: RequestProjectHeadInput[]
  startDate?: string
  status: string
  type?: string
}

export interface RequestCreateStackInput {
  avatar?: string
  code: string
  name: string
}

export interface RequestCreateSurveyFeedbackInput {
  fromDate?: string
  quarter?: string
  toDate?: string
  type: string
  year?: number
}

export interface RequestCreateWorkUnitBody {
  members?: string[]
  name: string
  stacks: string[]
  status: string
  type: string
  url?: string
}

export interface RequestDeleteTopicReviewersBody {
  reviewerIDs?: string[]
}

export interface RequestGetListEmployeeInput {
  chapters?: string[]
  keyword?: string
  lineManagers?: string[]
  organizations?: string[]
  /** page index */
  page?: number
  positions?: string[]
  preload?: boolean
  projects?: string[]
  seniorities?: string[]
  /** page size */
  size?: number
  stacks?: string[]
  workingStatuses?: string[]
}

export interface RequestInvoiceItem {
  cost?: number
  description?: string
  discount?: number
  isExternal?: boolean
  quantity?: number
  unitCost?: number
}

export interface RequestProjectHeadInput {
  commissionRate?: number
  employeeID?: string
}

export interface RequestSendInvoiceRequest {
  bankID: string
  cc?: string[]
  description?: string
  /** @min 0 */
  discount?: number
  dueDate: string
  email: string
  invoiceDate: string
  /**
   * @min 0
   * @max 11
   */
  invoiceMonth?: number
  /** @min 0 */
  invoiceYear?: number
  isDraft?: boolean
  lineItems?: RequestInvoiceItem[]
  note?: string
  number?: string
  projectID: string
  sentByID?: string
  /** @min 0 */
  subtotal?: number
  /** @min 0 */
  tax?: number
  /** @min 0 */
  total?: number
}

export interface RequestSendSurveyInput {
  topicIDs?: string[]
  type: string
}

export interface RequestSubmitBody {
  answers: RequestBasicEventQuestionInput[]
  status: string
}

export interface RequestSubmitOnboardingFormRequest {
  address: string
  avatar?: string
  city: string
  country: string
  dateOfBirth: string
  discordName: string
  gender: string
  githubID?: string
  horoscope: string
  identityCardPhotoBack?: string
  identityCardPhotoFront?: string
  linkedInName?: string
  localBankBranch: string
  localBankCurrency: string
  localBankNumber: string
  localBankRecipientName: string
  localBranchName: string
  mbti: string
  notionName?: string
  passportPhotoBack?: string
  passportPhotoFront?: string
  phoneNumber: string
  placeOfResidence: string
}

export interface RequestUpdateBaseSalaryInput {
  batch: number
  /** @min 0 */
  companyAccountAmount?: number
  /** @min 0 */
  contractAmount?: number
  currencyCode: string
  effectiveDate?: string
  /** @min 0 */
  personalAccountAmount?: number
}

export interface RequestUpdateClientContactInput {
  emails?: string[]
  isMainContact?: boolean
  name?: string
  role?: string
}

export interface RequestUpdateClientInput {
  address?: string
  contacts?: RequestUpdateClientContactInput[]
  country?: string
  description?: string
  industry?: string
  name?: string
  registrationNumber?: string
  website?: string
}

export interface RequestUpdateContactInfoInput {
  accountManagers?: RequestProjectHeadInput[]
  clientEmail?: string[]
  deliveryManagers?: RequestProjectHeadInput[]
  projectEmail?: string
  salePersons?: RequestProjectHeadInput[]
}

export interface RequestUpdateEmployeeGeneralInfoInput {
  discordID?: string
  discordName?: string
  displayName?: string
  email: string
  fullName: string
  githubID?: string
  joinedDate?: string
  leftDate?: string
  lineManagerID?: string
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  organizationIDs?: string[]
  phone: string
  referredBy?: string
  wiseAccountNumber?: string
  wiseCurrency?: string
  wiseRecipientEmail?: string
  wiseRecipientID?: string
  wiseRecipientName?: string
}

export interface RequestUpdateInfoInput {
  address?: string
  city?: string
  country?: string
  discordName?: string
  githubID?: string
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  personalEmail: string
  phoneNumber: string
  placeOfResidence: string
  wiseAccountNumber?: string
  wiseCurrency?: string
  wiseRecipientEmail?: string
  wiseRecipientID?: string
  wiseRecipientName?: string
}

export interface RequestUpdateMemberInput {
  deploymentType: string
  discount?: number
  employeeID?: string
  endDate?: string
  isLead?: boolean
  leadCommissionRate?: number
  note?: string
  positions: string[]
  projectMemberID?: string
  projectSlotID: string
  rate: number
  seniorityID: string
  startDate?: string
  status: string
  upsellCommissionRate?: number
  upsellPersonID?: string
}

export interface RequestUpdatePersonalInfoInput {
  address: string
  city?: string
  country?: string
  dob: string
  gender: string
  personalEmail: string
  placeOfResidence?: string
}

export interface RequestUpdatePositionBody {
  code?: string
  name?: string
}

export interface RequestUpdateProjectGeneralInfoInput {
  auditNotionID?: string
  bankAccountID?: string
  clientID?: string
  countryID: string
  function: string
  name: string
  organizationID?: string
  stacks?: string[]
  startDate?: string
}

export interface RequestUpdateSkillsInput {
  chapters: string[]
  leadingChapters?: string[]
  positions: string[]
  seniority: string
  stacks: string[]
}

export interface RequestUpdateStackBody {
  avatar?: string
  code?: string
  name?: string
}

export interface RequestUpdateTopicReviewersBody {
  reviewerIDs?: string[]
}

export interface RequestUpdateWorkUnitBody {
  members?: string[]
  name: string
  stacks: string[]
  type: string
  url?: string
}

export interface RequestUpdateWorkUnitInput {
  body?: RequestUpdateWorkUnitBody
  projectID?: string
  workUnitID?: string
}

export interface ViewAPIKeyData {
  key?: string
}

export interface ViewAPIKeyResponse {
  data?: ViewAPIKeyData
}

export interface ViewActionItemReportResponse {
  data?: ViewAuditActionItemReport[]
}

export interface ViewActionItemSquash {
  snapDate?: string
  trend?: number
  value?: number
}

export interface ViewActionItemSquashReport {
  all?: ViewActionItemSquash[]
  high?: ViewActionItemSquash[]
  low?: ViewActionItemSquash[]
  medium?: ViewActionItemSquash[]
}

export interface ViewActionItemSquashReportResponse {
  data?: ViewActionItemSquashReport
}

export interface ViewActionItemTrend {
  high?: number
  low?: number
  medium?: number
}

/**
 * validation error details
 */
export interface ViewApiError {
  /** available options incase of field's payload is enums */
  enums?: string[]
  /** the field cause the error */
  field?: string
  /** error message */
  msg?: string
}

export interface ViewAudit {
  avg?: number
  quarter?: string
  trend?: number
}

export interface ViewAuditActionItemReport {
  high?: number
  low?: number
  medium?: number
  quarter?: string
  trend?: ViewActionItemTrend
}

export interface ViewAuditData {
  average?: ViewAudit[]
  groups?: ViewGroupAudit[]
}

export interface ViewAuditResponse {
  data?: ViewAuditData
}

export interface ViewAuditSummaries {
  summary?: ViewAuditSummary[]
}

export interface ViewAuditSummariesResponse {
  data?: ViewAuditSummaries
}

export interface ViewAuditSummary {
  audit?: ViewAuditValue
  avatar?: string
  code?: string
  health?: ViewAuditValue
  id?: string
  name?: string
  newItem?: ViewItemValue
  resolvedItem?: ViewItemValue
  size?: ViewItemValue
}

export interface ViewAuditValue {
  trend?: number
  value?: number
}

export interface ViewAuthData {
  accessToken?: string
  employee?: ViewEmployeeData
}

export interface ViewAuthUserResponse {
  data?: ViewLoggedInUserData
}

export interface ViewAvailableEmployee {
  avatar?: string
  displayName?: string
  fullName?: string
  id?: string
  positions?: ViewPosition[]
  projects?: ViewBasicProjectInfo[]
  seniority?: ViewSeniority
  stacks?: ViewStack[]
  username?: string
}

export interface ViewAvailableSlot {
  createdAt?: string
  id?: string
  note?: string
  positions?: ViewPosition[]
  project?: ViewBasicProjectInfo
  seniority?: ViewSeniority
  type?: string
}

export interface ViewBankAccount {
  accountNumber?: string
  address?: string
  bankName?: string
  currency?: ViewCurrency
  currencyID?: string
  id?: string
  intermediaryBankAddress?: string
  intermediaryBankName?: string
  name?: string
  ownerName?: string
  routingNumber?: string
  swiftCode?: string
  ukSortCode?: string
}

export interface ViewBaseSalary {
  batch?: number
  category?: string
  company_account_amount?: number
  contract_amount?: number
  currency?: ViewCurrency
  currency_id?: string
  effective_date?: string
  employee_id?: string
  id?: string
  insurance_amount?: number
  personal_account_amount?: number
  type?: string
}

export interface ViewBasicBankAccountInfo {
  accountNumber?: string
  bankName?: string
  id?: string
  ownerName?: string
}

export interface ViewBasicClientInfo {
  description?: string
  id?: string
  name?: string
  registrationNumber?: string
}

export interface ViewBasicCompanyInfo {
  description?: string
  id?: string
  name?: string
  registrationNumber?: string
}

export interface ViewBasicCountryInfo {
  code?: string
  id?: string
  name?: string
}

export interface ViewBasicEmployeeInfo {
  avatar?: string
  displayName?: string
  fullName?: string
  id?: string
  username?: string
}

export interface ViewBasicMember {
  avatar?: string
  displayName?: string
  employeeID?: string
  fullName?: string
  username?: string
}

export interface ViewBasicProjectHeadInfo {
  avatar?: string
  commissionRate?: number
  displayName?: string
  employeeID?: string
  fullName?: string
  position?: string
  username?: string
}

export interface ViewBasicProjectInfo {
  avatar?: string
  code?: string
  id?: string
  name?: string
  status?: string
  type?: string
}

export interface ViewChapter {
  code?: string
  id?: string
  leadID?: string
  name?: string
}

export interface ViewChapterResponse {
  data?: ModelChapter[]
}

export interface ViewCitiesResponse {
  data?: string[]
}

export interface ViewClient {
  address?: string
  contacts?: ViewClientContact[]
  country?: string
  description?: string
  id?: string
  industry?: string
  name?: string
  registrationNumber?: string
  website?: string
}

export interface ViewClientContact {
  emails?: string[]
  id?: string
  isMainContact?: boolean
  name?: string
  role?: string
}

export interface ViewClientContactInfo {
  emails?: string[]
  id?: string
  isMainContact?: boolean
  name?: string
}

export interface ViewClientInfo {
  clientAddress?: string
  clientCompany?: string
  contacts?: ViewClientContactInfo[]
}

export interface ViewCompanyInfo {
  description?: string
  id?: string
  info?: Record<string, ModelCompanyContactInfo>
  name?: string
  registrationNumber?: string
}

export interface ViewContentData {
  url?: string
}

export interface ViewContentDataResponse {
  data?: ViewContentData
}

export interface ViewCountriesResponse {
  data?: ModelCountry[]
}

export interface ViewCreateClientResponse {
  data?: ModelClient
}

export interface ViewCreateMemberData {
  avatar?: string
  deploymentType?: string
  discount?: number
  displayName?: string
  employeeID?: string
  fullName?: string
  isLead?: boolean
  leadCommissionRate?: number
  note?: string
  positions?: ViewPosition[]
  projectMemberID?: string
  projectSlotID?: string
  rate?: number
  seniority?: ModelSeniority
  status?: string
  upsellCommissionRate?: number
  upsellPerson?: ViewBasicEmployeeInfo
  username?: string
}

export interface ViewCreateMemberDataResponse {
  data?: ViewCreateMemberData
}

export interface ViewCreateProjectData {
  accountManagers?: ViewProjectHead[]
  bankAccount?: ViewBasicBankAccountInfo
  client?: ViewClient
  clientEmail?: string[]
  code?: string
  country?: ViewBasicCountryInfo
  createdAt?: string
  deletedAt?: GormDeletedAt
  deliveryManagers?: ViewProjectHead[]
  function?: string
  id?: string
  members?: ViewCreateMemberData[]
  name?: string
  organization?: ViewOrganization
  projectEmail?: string
  salePersons?: ViewProjectHead[]
  startDate?: string
  status?: string
  type?: string
  updatedAt?: string
}

export interface ViewCurrency {
  id?: string
  locale?: string
  name?: string
  symbol?: string
  type?: string
}

export interface ViewDomain {
  average?: number
  count?: ModelLikertScaleCount
  name?: string
}

export interface ViewEmployeeContentData {
  url?: string
}

export interface ViewEmployeeContentDataResponse {
  data?: ViewEmployeeContentData
}

export interface ViewEmployeeData {
  address?: string
  avatar?: string
  baseSalary?: ViewBaseSalary
  birthday?: string
  chapters?: ViewChapter[]
  city?: string
  country?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  discordID?: string
  discordName?: string
  displayName?: string
  /** basic info */
  fullName?: string
  gender?: string
  githubID?: string
  horoscope?: string
  id?: string
  joinedDate?: string
  leftDate?: string
  lineManager?: ViewBasicEmployeeInfo
  linkedInName?: string
  mbti?: string
  mentees?: ViewMenteeInfo[]
  notionID?: string
  notionName?: string
  organizations?: ViewOrganization[]
  personalEmail?: string
  phoneNumber?: string
  placeOfResidence?: string
  positions?: ViewPosition[]
  projects?: ViewEmployeeProjectData[]
  referredBy?: ViewBasicEmployeeInfo
  roles?: ViewRole[]
  seniority?: ModelSeniority
  stacks?: ViewStack[]
  /** working info */
  status?: string
  teamEmail?: string
  updatedAt?: string
  username?: string
  wiseAccountNumber?: string
  wiseCurrency?: string
  wiseRecipientEmail?: string
  wiseRecipientID?: string
  wiseRecipientName?: string
}

export interface ViewEmployeeInvitationData {
  employee?: ViewInvitedEmployeeInfo
  employeeID?: string
  id?: string
  invitedBy?: string
  isBasecampAccountCreated?: boolean
  isCompleted?: boolean
  isDiscordRoleAssigned?: boolean
  isInfoUpdated?: boolean
  isTeamEmailCreated?: boolean
}

export interface ViewEmployeeInvitationResponse {
  data?: ViewEmployeeInvitationData
}

export interface ViewEmployeeListDataResponse {
  data?: ViewEmployeeData[]
}

export interface ViewEmployeeProjectData {
  avatar?: string
  code?: string
  deploymentType?: string
  endDate?: string
  id?: string
  name?: string
  positions?: ViewPosition[]
  startDate?: string
  status?: string
}

export interface ViewEngagementDashboard {
  content?: string
  questionID?: string
  stats?: ViewEngagementDashboardQuestionStat[]
}

export interface ViewEngagementDashboardDetail {
  questionID?: string
  stats?: ViewEngagementDashboardQuestionDetailStat[]
}

export interface ViewEngagementDashboardQuestionDetailStat {
  field?: string
  point?: number
  startDate?: string
}

export interface ViewEngagementDashboardQuestionStat {
  point?: number
  startDate?: string
  title?: string
}

export interface ViewEngineeringHealth {
  avg?: number
  quarter?: string
  trend?: number
}

export interface ViewEngineeringHealthData {
  average?: ViewEngineeringHealth[]
  groups?: ViewGroupEngineeringHealth[]
}

export interface ViewEngineeringHealthResponse {
  data?: ViewEngineeringHealthData
}

export interface ViewEngineeringHealthTrend {
  collaboration?: number
  delivery?: number
  feedback?: number
  quality?: number
}

export interface ViewErrorResponse {
  error?: string
  errors?: ViewApiError[]
}

export interface ViewFeedBackReviewDetail {
  employee?: ViewBasicEmployeeInfo
  project?: ViewBasicProjectInfo
  questions?: ViewQuestionAnswer[]
  relationship?: string
  reviewer?: ViewBasicEmployeeInfo
  topicName?: string
}

export interface ViewFeedback {
  author?: ViewBasicEmployeeInfo
  employeeID?: string
  eventID?: string
  eventReviewerID?: string
  isRead?: boolean
  lastUpdated?: string
  projectID?: string
  status?: string
  subtype?: string
  title?: string
  topicID?: string
  type?: string
}

export interface ViewFeedbackCount {
  done?: number
  sent?: number
  total?: number
}

export interface ViewFeedbackDetail {
  answers?: ViewQuestionAnswer[]
  employeeID?: string
  eventID?: string
  project?: ViewBasicProjectInfo
  relationship?: string
  reviewer?: ViewBasicEmployeeInfo
  status?: string
  title?: string
  topicID?: string
}

export interface ViewFeedbackDetailResponse {
  data?: ViewFeedbackDetail
}

export interface ViewFeedbackReviewDetailResponse {
  data?: ViewFeedBackReviewDetail
}

export interface ViewGetCurrenciesResponse {
  data?: ViewCurrency[]
}

export interface ViewGetDashboardResourceUtilizationResponse {
  data?: ModelResourceUtilization[]
}

export interface ViewGetDetailClientResponse {
  data?: ModelClient
}

export interface ViewGetEngagementDashboardDetailResponse {
  data?: ViewEngagementDashboardDetail[]
}

export interface ViewGetEngagementDashboardResponse {
  data?: ViewEngagementDashboard[]
}

export interface ViewGetListClientResponse {
  data?: ModelClient[]
}

export interface ViewGetQuestionResponse {
  data?: ViewQuestion[]
}

export interface ViewGroupAudit {
  backend?: number
  blockchain?: number
  frontend?: number
  mobile?: number
  process?: number
  quarter?: string
  system?: number
  trend?: ViewGroupAuditTrend
}

export interface ViewGroupAuditTrend {
  backend?: number
  blockchain?: number
  frontend?: number
  mobile?: number
  process?: number
  system?: number
}

export interface ViewGroupEngineeringHealth {
  collaboration?: number
  delivery?: number
  feedback?: number
  quality?: number
  quarter?: string
  trend?: ViewEngineeringHealthTrend
}

export interface ViewInvitedEmployeeInfo {
  avatar?: string
  displayName?: string
  fullName?: string
  id?: string
  personalEmail?: string
  teamEmail?: string
  username?: string
}

export interface ViewInvoice {
  bankID?: string
  cc?: string[]
  conversionAmount?: number
  conversionRate?: number
  description?: string
  discount?: number
  dueAt?: string
  email?: string
  errorInvoiceID?: string
  failedAt?: string
  invoiceFileURL?: string
  invoicedAt?: string
  lineItems?: ViewInvoiceItem[]
  month?: number
  note?: string
  number?: string
  paidAt?: string
  projectID?: string
  scheduledDate?: string
  sentBy?: string
  status?: string
  subTotal?: number
  tax?: number
  threadID?: string
  total?: number
  year?: number
}

export interface ViewInvoiceData {
  bankAccount?: ViewBankAccount
  bankID?: string
  cc?: string[]
  client?: ViewClientInfo
  companyInfo?: ViewCompanyInfo
  conversionAmount?: number
  conversionRate?: number
  description?: string
  discount?: number
  dueAt?: string
  email?: string
  errorInvoiceID?: string
  failedAt?: string
  invoiceFileURL?: string
  invoicedAt?: string
  lineItems?: ViewInvoiceItem[]
  month?: number
  note?: string
  number?: string
  paidAt?: string
  projectID?: string
  projectName?: string
  scheduledDate?: string
  sentBy?: string
  status?: string
  subTotal?: number
  tax?: number
  threadID?: string
  total?: number
  year?: number
}

export interface ViewInvoiceItem {
  cost?: number
  description?: string
  discount?: number
  isExternal?: boolean
  quantity?: number
  unitCost?: number
}

export interface ViewInvoiceListResponse {
  data?: ViewInvoiceData[]
}

export interface ViewInvoiceTemplateResponse {
  data?: ViewProjectInvoiceTemplate
}

export interface ViewItemValue {
  trend?: number
  value?: number
}

export interface ViewLineManagersResponse {
  data?: ViewBasicEmployeeInfo[]
}

export interface ViewListBankAccountResponse {
  data?: ViewBankAccount[]
}

export interface ViewListFeedbackResponse {
  data?: ViewFeedback[]
}

export interface ViewListSurveyDetailResponse {
  data?: ViewSurveyDetail
}

export interface ViewListSurveyResponse {
  data?: ViewSurvey[]
}

export interface ViewListWorkUnitResponse {
  data?: ViewWorkUnit[]
}

export interface ViewLoggedInUserData {
  avatar?: string
  displayName?: string
  fullName?: string
  id?: string
  permissions?: string[]
  role?: string
  teamEmail?: string
}

export interface ViewMenteeInfo {
  avatar?: string
  displayName?: string
  fullName?: string
  id?: string
  positions?: ModelPosition[]
  seniority?: ModelSeniority
  username?: string
}

export interface ViewMessageResponse {
  message?: string
}

export interface ViewMetaData {
  code?: string
  id?: string
  name?: string
}

export interface ViewOrganization {
  avatar?: string
  code?: string
  id?: string
  name?: string
}

export interface ViewOrganizationsResponse {
  data?: ModelOrganization[]
}

export interface ViewPeerReviewer {
  eventReviewerID?: string
  isForcedDone?: boolean
  relationship?: string
  reviewer?: ViewBasicEmployeeInfo
  status?: string
}

export interface ViewPosition {
  code?: string
  id?: string
  name?: string
}

export interface ViewPositionResponse {
  data?: ModelPosition[]
}

export interface ViewProfileData {
  address?: string
  avatar?: string
  birthday?: string
  city?: string
  country?: string
  discordID?: string
  discordName?: string
  displayName?: string
  fullName?: string
  gender?: string
  githubID?: string
  id?: string
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  personalEmail?: string
  phoneNumber?: string
  placeOfResidence?: string
  roles?: ViewRole[]
  teamEmail?: string
  username?: string
  wiseAccountNumber?: string
  wiseCurrency?: string
  wiseRecipientEmail?: string
  wiseRecipientID?: string
  wiseRecipientName?: string
}

export interface ViewProfileDataResponse {
  data?: ViewProfileData
}

export interface ViewProjectContentData {
  url?: string
}

export interface ViewProjectContentDataResponse {
  data?: ViewProjectContentData
}

export interface ViewProjectData {
  accountManagers?: ViewProjectHead[]
  allowsSendingSurvey?: boolean
  auditNotionID?: string
  avatar?: string
  bankAccount?: ViewBasicBankAccountInfo
  client?: ViewBasicClientInfo
  clientEmail?: string[]
  code?: string
  companyInfo?: ViewBasicCompanyInfo
  country?: ViewBasicCountryInfo
  createdAt?: string
  currency?: ViewCurrency
  deletedAt?: GormDeletedAt
  deliveryManagers?: ViewProjectHead[]
  endDate?: string
  function?: string
  id?: string
  industry?: string
  members?: ViewProjectMember[]
  monthlyChargeRate?: number
  name?: string
  organization?: ViewOrganization
  projectEmail?: string
  salePersons?: ViewProjectHead[]
  stacks?: ViewStack[]
  startDate?: string
  status?: string
  technicalLeads?: ViewProjectHead[]
  type?: string
  updatedAt?: string
}

export interface ViewProjectDataResponse {
  data?: ViewProjectData
}

export interface ViewProjectHead {
  avatar?: string
  commissionRate?: number
  displayName?: string
  employeeID?: string
  fullName?: string
  username?: string
}

export interface ViewProjectInvoiceTemplate {
  bankAccount?: ViewBankAccount
  client?: ViewClientInfo
  companyInfo?: ViewCompanyInfo
  id?: string
  invoiceNumber?: string
  lastInvoice?: ViewInvoice
  name?: string
}

export interface ViewProjectListDataResponse {
  data?: ViewProjectData[]
}

export interface ViewProjectMember {
  avatar?: string
  currency?: ViewCurrency
  deploymentType?: string
  discount?: number
  displayName?: string
  employeeID?: string
  endDate?: string
  fullName?: string
  isLead?: boolean
  leadCommissionRate?: number
  note?: string
  positions?: ViewPosition[]
  projectMemberID?: string
  projectSlotID?: string
  rate?: number
  seniority?: ModelSeniority
  startDate?: string
  status?: string
  upsellCommissionRate?: number
  upsellPerson?: ViewBasicEmployeeInfo
  username?: string
}

export interface ViewProjectMemberListResponse {
  data?: ViewProjectMember[]
}

export interface ViewProjectSizeResponse {
  data?: ModelProjectSize[]
}

export interface ViewQuestion {
  category?: string
  content?: string
  id?: string
  order?: number
  subcategory?: string
  type?: string
}

export interface ViewQuestionAnswer {
  answer?: string
  content?: string
  domain?: string
  eventQuestionID?: string
  note?: string
  order?: number
  type?: string
}

export interface ViewResourceAvailability {
  employees?: ViewAvailableEmployee[]
  slots?: ViewAvailableSlot[]
}

export interface ViewResourceAvailabilityResponse {
  data?: ViewResourceAvailability
}

export interface ViewRole {
  code?: string
  id?: string
  name?: string
}

export interface ViewRolesResponse {
  data?: ModelRole[]
}

export interface ViewSeniority {
  code?: string
  id?: string
  name?: string
}

export interface ViewSeniorityResponse {
  data?: ModelSeniority[]
}

export interface ViewStack {
  avatar?: string
  code?: string
  id?: string
  name?: string
}

export interface ViewStackResponse {
  data?: ModelStack[]
}

export interface ViewSubmitFeedback {
  answers?: ViewQuestionAnswer[]
  employeeID?: string
  eventID?: string
  reviewer?: ViewBasicEmployeeInfo
  status?: string
  title?: string
  topicID?: string
}

export interface ViewSubmitFeedbackResponse {
  data?: ViewSubmitFeedback
}

export interface ViewSummaryWorkUnitDistributionData {
  development?: number
  learning?: number
  management?: number
  training?: number
}

export interface ViewSummaryWorkUnitDistributionResponse {
  data?: ViewSummaryWorkUnitDistributionData
}

export interface ViewSurvey {
  count?: ViewFeedbackCount
  domains?: ViewDomain[]
  endDate?: string
  id?: string
  startDate?: string
  status?: string
  subtype?: string
  title?: string
  type?: string
}

export interface ViewSurveyDetail {
  author?: ViewBasicEmployeeInfo
  endDate?: string
  eventID?: string
  startDate?: string
  status?: string
  subtype?: string
  title?: string
  topics?: ViewTopic[]
  type?: string
}

export interface ViewSurveyTopicDetail {
  employee?: ViewBasicEmployeeInfo
  participants?: ViewPeerReviewer[]
  title?: string
  topicID?: string
}

export interface ViewSurveyTopicDetailResponse {
  data?: ViewSurveyTopicDetail
}

export interface ViewTopic {
  comments?: number
  count?: ViewFeedbackCount
  domains?: ViewDomain[]
  employee?: ViewBasicEmployeeInfo
  eventID?: string
  id?: string
  isForcedDone?: boolean
  participants?: ViewBasicEmployeeInfo[]
  project?: ViewBasicProjectInfo
  reviewID?: string
  status?: string
  subtype?: string
  title?: string
  type?: string
}

export interface ViewTrend {
  deadline?: number
  learning?: number
  workload?: number
}

export interface ViewUnreadFeedbackCountData {
  count?: number
  reviewerID?: string
}

export interface ViewUnreadFeedbackCountResponse {
  data?: ViewUnreadFeedbackCountData
}

export interface ViewUpdateBaseSalaryResponse {
  data?: ViewBaseSalary
}

export interface ViewUpdateEmployeeStatusResponse {
  data?: ViewEmployeeData
}

export interface ViewUpdateGeneralEmployeeResponse {
  data?: ViewUpdateGeneralInfoEmployeeData
}

export interface ViewUpdateGeneralInfoEmployeeData {
  createdAt?: string
  deletedAt?: GormDeletedAt
  discordID?: string
  discordName?: string
  displayName?: string
  /** basic info */
  fullName?: string
  githubID?: string
  id?: string
  lineManager?: ViewBasicEmployeeInfo
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  organizations?: ViewOrganization[]
  phoneNumber?: string
  referredBy?: ViewBasicEmployeeInfo
  teamEmail?: string
  updatedAt?: string
}

export interface ViewUpdatePersonalEmployeeData {
  address?: string
  birthday?: string
  city?: string
  country?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  gender?: string
  id?: string
  personalEmail?: string
  placeOfResidence?: string
  updatedAt?: string
}

export interface ViewUpdatePersonalEmployeeResponse {
  data?: ViewUpdatePersonalEmployeeData
}

export interface ViewUpdateProfileInfoData {
  address?: string
  city?: string
  country?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  discordID?: string
  discordName?: string
  githubID?: string
  id?: string
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  phoneNumber?: string
  placeOfResidence?: string
  /** basic info */
  teamEmail?: string
  updatedAt?: string
  username?: string
  wiseAccountNumber?: string
  wiseCurrency?: string
  wiseRecipientEmail?: string
  wiseRecipientID?: string
  wiseRecipientName?: string
}

export interface ViewUpdateProfileInfoResponse {
  data?: ViewUpdateProfileInfoData
}

export interface ViewUpdateProjectContactInfo {
  clientEmail?: string[]
  projectEmail?: string
  projectHead?: ViewBasicProjectHeadInfo[]
}

export interface ViewUpdateProjectContactInfoResponse {
  data?: ViewUpdateProjectContactInfo
}

export interface ViewUpdateProjectGeneralInfo {
  auditNotionID?: string
  bankAccount?: ViewBasicBankAccountInfo
  client?: ViewClient
  country?: ViewBasicCountryInfo
  function?: string
  name?: string
  organization?: ViewOrganization
  stacks?: ModelStack[]
  startDate?: string
}

export interface ViewUpdateProjectGeneralInfoResponse {
  data?: ViewUpdateProjectGeneralInfo
}

export interface ViewUpdateProjectStatusResponse {
  data?: ViewUpdatedProject
}

export interface ViewUpdateSkillEmployeeData {
  chapters?: ModelChapter[]
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  positions?: ModelPosition[]
  seniority?: ModelSeniority
  stacks?: ModelStack[]
  updatedAt?: string
}

export interface ViewUpdateSkillsEmployeeResponse {
  data?: ViewUpdateSkillEmployeeData
}

export interface ViewUpdatedProject {
  createdAt?: string
  deletedAt?: GormDeletedAt
  endDate?: string
  id?: string
  name?: string
  startDate?: string
  status?: string
  type?: string
  updatedAt?: string
}

export interface ViewWorkSurvey {
  deadline?: number
  endDate?: string
  learning?: number
  trend?: ViewTrend
  workload?: number
}

export interface ViewWorkSurveyResponse {
  data?: ViewWorkSurveysData
}

export interface ViewWorkSurveySummary {
  data?: ViewWorkSurveySummaryEmployee[]
  dates?: string[]
  type?: string
}

export interface ViewWorkSurveySummaryAnswer {
  answer?: string
  project?: ViewBasicProjectInfo
}

export interface ViewWorkSurveySummaryEmployee {
  listAnswers?: ViewWorkSurveySummaryListAnswer[]
  reviewer?: ViewBasicEmployeeInfo
}

export interface ViewWorkSurveySummaryListAnswer {
  answers?: ViewWorkSurveySummaryAnswer[]
  date?: string
}

export interface ViewWorkSurveySummaryResponse {
  data?: ViewWorkSurveySummary[]
}

export interface ViewWorkSurveysData {
  project?: ViewBasicProjectInfo
  workSurveys?: ViewWorkSurvey[]
}

export interface ViewWorkUnit {
  code?: string
  id?: string
  members?: ViewBasicMember[]
  name?: string
  projectID?: string
  stacks?: ViewStack[]
  status?: string
  type?: string
  url?: string
}

export interface ViewWorkUnitDistribution {
  development?: ViewWorkUnitDistributionDevelopment
  employee?: ViewBasicEmployeeInfo
  learning?: ViewWorkUnitDistributionLearning
  management?: ViewWorkUnitDistributionManagement
  training?: ViewWorkUnitDistributionTraining
}

export interface ViewWorkUnitDistributionData {
  workUnitDistributions?: ViewWorkUnitDistribution[]
}

export interface ViewWorkUnitDistributionDevelopment {
  total?: number
  workUnits?: ViewWorkUnitDistributionWU[]
}

export interface ViewWorkUnitDistributionLearning {
  total?: number
  workUnits?: ViewWorkUnitDistributionWU[]
}

export interface ViewWorkUnitDistributionManagement {
  projectHeads?: ViewWorkUnitDistributionWUProjectHead[]
  total?: number
  workUnits?: ViewWorkUnitDistributionWU[]
}

export interface ViewWorkUnitDistributionTraining {
  mentees?: ViewBasicEmployeeInfo[]
  total?: number
  workUnits?: ViewWorkUnitDistributionWU[]
}

export interface ViewWorkUnitDistributionWU {
  project?: ViewBasicProjectInfo
  workUnitName?: string
}

export interface ViewWorkUnitDistributionWUProjectHead {
  position?: string
  project?: ViewBasicProjectInfo
}

export interface ViewWorkUnitDistributionsResponse {
  data?: ViewWorkUnitDistributionData
}

export interface ViewWorkUnitResponse {
  data?: ViewWorkUnit
}
