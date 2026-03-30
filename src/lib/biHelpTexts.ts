/**
 * 接单 BI 指标说明文案（与《接单 BI 看板完整方案设计》对齐，供演示页展示）
 */
export type BiHelpKey =
  | 'global.filters'
  | 'global.costConfig'
  | 'kpi.workOrderSubmit'
  | 'kpi.fieldFirstPass'
  | 'kpi.savedCost'
  | 'kpi.efficiencyCount'
  | 'kpi.efficiencyDuration'
  | 'kpi.efficiencyLabor'
  | 'volume.trend'
  | 'volume.leak'
  | 'quality.radar'
  | 'quality.fieldTable'
  | 'cost.avgCostPerOrder'
  | 'cost.avgDuration'
  | 'cost.inputHours'
  | 'cost.saveTrend'
  | 'cost.durationTrend'
  | 'cost.rework'
  | 'efficiency.rank'
  | 'efficiency.durationDist'
  | 'efficiency.laborDist'
  | 'detail.conversion'
  | 'detail.quality'
  | 'detail.cost'
  | 'detail.efficiency'
  | 'dialog.fieldDiff';

export type BiHelpBlock = {
  title?: string;
  /** 每段一行，可用换行符分段 */
  paragraphs: string[];
};

export const BI_HELP_BLOCKS: Record<BiHelpKey, BiHelpBlock> = {
  'global.filters': {
    title: '查询条件如何影响全页',
    paragraphs: [
      '时间区间：统计窗口为所选起止日期；多数指标以工作单「完成时间」落入区间内为准。',
      '租户：当前租户数据隔离。',
      '来源「全部 / 邮件 / 文件」：单量、耗时、成本、人效等按工单 recordType 过滤（文件→CHAT，邮件→EMAIL）。',
      '识别准确率相关：按 initialSource 过滤，并仅统计 entrusted_info.type=1 的原始工作单。',
      '组织筛选（人效维度）：前端将部门转为人员范围后过滤，与方案中 userIds 一致。'
    ]
  },
  'global.costConfig': {
    title: '全局成本参数',
    paragraphs: [
      '客服/操作成本：与产品约定一致（如元/人天），演示页用于换算金额。',
      '原校对/原审核时长：min/单，作为「基准耗时」参与节省成本计算。',
      '人效「平均投入成本」（若用四分项）：平均投入成本 = (校对总时长/校对总单量)×校对单价 + (审核总时长/审核总单量)×审核单价；单价与时长单位需一致（如时长为分钟则用元/分钟）。',
      '节省总成本（演示）≈ Σ[(基准时长 − 实际时长) 按角色折算 × 单价]。正式接口以《接单 BI 看板完整方案设计》为准。'
    ]
  },
  'kpi.workOrderSubmit': {
    title: '工作单提交量',
    paragraphs: [
      '公式：提交量 = COUNT(完成时间在区间内且提交成功的工作单)。',
      '来源筛选时按 recordType 过滤。'
    ]
  },
  'kpi.fieldFirstPass': {
    title: '字段一次通过率（概览）',
    paragraphs: [
      '公式：AVG_i(firstPassRate_i)，其中 firstPassRate_i = firstPassCnt_i / totalFieldCnt_i。',
      '口径：仅 initialSource∈{EMAIL,FILE} 且 type=1 的初始生成工作单；先算每单再算术平均。'
    ]
  },
  'kpi.savedCost': {
    title: '节省总成本',
    paragraphs: [
      '公式思路：节省 = (N×基准校对 − Σ实际校对)×校对单价 + (N×基准审核 − Σ实际审核)×审核单价（演示用页面参数）。',
      '后端正式环境只返回原始时长与单量，金额由前端用配置计算。'
    ]
  },
  'kpi.efficiencyCount': {
    title: '处理单量（人效 KPI）',
    paragraphs: [
      '公式：COUNT DISTINCT(完成工作单 | 成员在耗时埋点中真实参与处理)。',
      '按真实处理人统计，非仅看工单当前负责人。'
    ]
  },
  'kpi.efficiencyDuration': {
    title: '平均投入时长（人效 KPI）',
    paragraphs: [
      '公式：平均投入时长 = (校对总时长 + 审核总时长) / 总单量；总单量 = 该成员在校对或审核埋点中出现过的「工作单 entrusted_info_id」去重个数。',
      '后端宜同时返回：校对总时长、校对总单量（去重）、审核总时长、审核总单量（去重），单位与接口约定一致（分钟）。',
      '与处理单量、排行图同一套人效口径。'
    ]
  },
  'kpi.efficiencyLabor': {
    title: '平均人力成本（人效 KPI）',
    paragraphs: [
      '公式（前端）：平均投入成本 = (校对总时长/校对总单量)×校对单价 + (审核总时长/审核总单量)×审核单价；校对/审核总单量均为按工作单 id 去重后的单量。',
      '演示页用全局成本参数换算；分母为 0 时前端需防除零。'
    ]
  },
  'volume.trend': {
    title: '业务单量折线',
    paragraphs: [
      '各序列含义：来源输入 = 初始新邮件数 + 文件 chat 条数；成功创建 = 对应链路建单成功；工作单量 = 当日新建工单数；成功提交委托 = 按完成日的提交成功量。',
      '趋势按「天」展示；周/月可由前端对日数据聚合。'
    ]
  },
  'volume.leak': {
    title: '漏单深度分析',
    paragraphs: [
      '漏单率 = 漏单数 / 成功建单数。邮件与文件分母均为成功建单数；邮件侧可用「初始新邮件−无效委托」等价表述。',
      '漏单原因占比 = 各原因失败次数 / 所有失败次数之和。'
    ]
  },
  'quality.radar': {
    title: '核心质量指标（雷达）',
    paragraphs: [
      '单工作单：一次通过率 = firstPassCnt/totalFieldCnt；修改率、补录率、误召回率等同理为计数/总字段数。',
      '雷达展示值 = 多张工作单上该指标的算术平均（工作单维度先算再 AVG）。',
      '文件识别准确率 = file_commit_cnt/(file_commit_cnt+initial_idp_cnt)；邮件识别准确率 = mail_commit_cnt/(mail_commit_cnt+initial_mail_cnt)。',
      '口径：initialSource 与 type=1。'
    ]
  },
  'quality.fieldTable': {
    title: '字段识别准确率（字段维度）',
    paragraphs: [
      '公式：某字段准确率 = Σ firstPassCnt / Σ totalSubmitCnt（按字段跨日汇总）。',
      '与雷达的「工作单级 AVG」数学含义不同，属有意设计；业务上通常接近。'
    ]
  },
  'cost.avgCostPerOrder': {
    title: '平均每工作单成本',
    paragraphs: [
      '演示页：由投入时长与客服/操作成本参数推算单均成本；含客服、操作拆分。'
    ]
  },
  'cost.avgDuration': {
    title: '平均处理时长',
    paragraphs: [
      '公式：平均处理时长 = Σ(单工作单总耗时) / 提交工作单数；单工作单总耗时为该校对+审核等角色耗时之和。',
      '详细设计约定：接口侧「平均处理时长」对外统一为「分钟」展示与返回（内部可按秒聚合后再换算）。',
      '统计对象为区间内完成的工作单，来源按 recordType 过滤。'
    ]
  },
  'cost.inputHours': {
    title: '投入时间',
    paragraphs: [
      '客服/操作投入总时长：由单工作单校对、审核耗时汇总；可与接口一致用分钟或按页面再换算为小时展示。'
    ]
  },
  'cost.saveTrend': {
    title: '节省成本与单量趋势',
    paragraphs: [
      '按天展示节省成本曲线与工作单提交量；节省成本由页面参数与原始时长计算。'
    ]
  },
  'cost.durationTrend': {
    title: '平均处理时长趋势',
    paragraphs: [
      '按天展示处理总时长、校对时长、审核时长；与详细设计一致时，趋势点时长对外为「分钟」。',
      '前端可按日/周/月再聚合。'
    ]
  },
  'cost.rework': {
    title: '工作单提交与返工',
    paragraphs: [
      '返工次数：驳回 + 撤回次数（埋点累计）。',
      '返工率 = 返工次数≥1 的工作单数 / 提交成功工作单数。'
    ]
  },
  'efficiency.rank': {
    title: '人员处理单量排行',
    paragraphs: [
      '按真实处理人统计参与完成的工作单量并排序；工作单量按 entrusted_info_id 去重。',
      '组织筛选等价于限定 userIds。'
    ]
  },
  'efficiency.durationDist': {
    title: '人员平均投入时长分布',
    paragraphs: [
      '每人：(校对总时长+审核总时长)/去重总单量（工作单 id）；四分项定义同 KPI 说明。',
      '按人展示分布；时长单位与接口一致（分钟）。'
    ]
  },
  'efficiency.laborDist': {
    title: '人员平均人力成本分布',
    paragraphs: [
      '基于四分项与单价：(校对总时长/校对总单量)×校对单价 + (审核总时长/审核总单量)×审核单价（演示用页面参数）。'
    ]
  },
  'detail.conversion': {
    title: '业务明细表',
    paragraphs: [
      '租户级列表，不叠加个人数据权限；列为邮件/文件入口、状态、处理人、时间等 mock 字段。'
    ]
  },
  'detail.quality': {
    title: '质量明细表',
    paragraphs: [
      '每行一张工作单的质量指标：一次通过、修改、补录、误召回及文件/邮件识别准确率等。'
    ]
  },
  'detail.cost': {
    title: '效率成本表',
    paragraphs: [
      '每行一张工作单：校对/审核/总时长、返工次数及各类成本列；金额列由前端按参数计算。'
    ]
  },
  'detail.efficiency': {
    title: '人效明细表',
    paragraphs: [
      '按人员汇总：宜含校对总时长、校对总单量、审核总时长、审核总单量、去重总单量及派生平均投入时长；与 6.3.5 口径一致。',
      '平均投入成本由前端用四分项与单价计算。'
    ]
  },
  'dialog.fieldDiff': {
    title: '字段识别及编辑情况',
    paragraphs: [
      '根据 entrustedInfoId 读取 diff JSON 解析展示：原始来源、原始值、清洗值、提交值等；为快照明细，不经过日汇总表。'
    ]
  }
};
