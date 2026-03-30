<script setup lang="ts">
import { computed } from 'vue';
import { Warning } from '@element-plus/icons-vue';
import { BI_HELP_BLOCKS, type BiHelpKey } from '../lib/biHelpTexts';

const props = defineProps<{
  helpKey: BiHelpKey;
}>();

const block = computed(() => BI_HELP_BLOCKS[props.helpKey]);
const ariaLabel = computed(() => block.value?.title || '指标说明');
</script>

<template>
  <el-popover
    v-if="block"
    placement="bottom-start"
    :width="400"
    trigger="click"
    popper-class="bi-metric-help-popper"
  >
    <template #reference>
      <button type="button" class="bi-metric-help-btn" :aria-label="ariaLabel" @click.stop.prevent>
        <el-icon class="bi-metric-help-icon">
          <Warning />
        </el-icon>
      </button>
    </template>
    <div class="bi-metric-help-inner">
      <div v-if="block.title" class="bi-metric-help-title">{{ block.title }}</div>
      <div v-for="(p, i) in block.paragraphs" :key="i" class="bi-metric-help-p">{{ p }}</div>
    </div>
  </el-popover>
</template>

<style scoped>
.bi-metric-help-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #909399;
  vertical-align: middle;
  border-radius: 4px;
  line-height: 1;
  flex-shrink: 0;
}

.bi-metric-help-btn:hover {
  color: var(--el-color-primary, #4f46ff);
  background: rgba(79, 70, 255, 0.08);
}

.bi-metric-help-icon {
  font-size: 16px;
}

.bi-metric-help-inner {
  font-size: 13px;
  line-height: 1.65;
  color: #606266;
  max-height: min(70vh, 520px);
  overflow-y: auto;
}

.bi-metric-help-title {
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
  font-size: 14px;
}

.bi-metric-help-p {
  margin: 0 0 10px;
  white-space: pre-wrap;
}

.bi-metric-help-p:last-child {
  margin-bottom: 0;
}
</style>
