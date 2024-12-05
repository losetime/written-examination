<template>
<div class="home-wrapper">
  <div class="content-wrap">
    <a-form ref="formRef" :model="formState" layout="vertical">
      <a-form-item label="邮票A面值">
        <a-input v-model:value="formState.$a" placeholder="请输入$A" />
      </a-form-item>
      <a-form-item label="邮票B面值">
        <a-input v-model:value="formState.$b" placeholder="请输入$B" />
      </a-form-item>
      <a-form-item label="需要邮资T">
        <a-input v-model:value="formState.$t" placeholder="请输入$T" />
      </a-form-item>
      <a-form-item label="最小浪费额度">
        <p style="font-size: 20px; font-weight: bold; color: #D97A20;">
          {{ formState.$r || '--'}}
        </p>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">计算</a-button>
      </a-form-item>
    </a-form>
  </div>
</div>
</template>

<script setup>
import { reactive } from 'vue'

const formState = reactive({
  $a: '',
  $b: '',
  $t: '',
  $r: '--',
});

const handleSubmit = () => {
  const { $a, $b, $t } = formState;
  const a = Number($a);
  const b = Number($b);
  const t = Number($t);
  let minNum = -1;
  for(let i = 0; i <= Math.ceil(t / a); i++) {
    for(let j = 0; j <= Math.ceil(t / b); j++) {
      const sum = a * i + b * j
      if(sum === t) {
        formState.$r = '0';
        return;
      } else if(sum > t) {
        const waste = sum - t;
        minNum = minNum === -1 ? waste : Math.min(minNum, waste);
        break;
      }
    }
  }
  return formState.$r = minNum + '';
}
</script>

<style lang="less" scoped>
.home-wrapper {
  height: calc(100vh - 46px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .content-wrap {
    min-width: 360px;
  }
}
</style>