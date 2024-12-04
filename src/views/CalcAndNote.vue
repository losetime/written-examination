<template>
  <div class="home-wrapper">
    <div class="content-wrap">
      <Header />
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="计算器">
          <Calculator />
        </a-tab-pane>
        <a-tab-pane key="2" tab="记事本" force-render>
          <Notepad />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import Header from "../components/Header.vue";
import Calculator from "../components/Calculator.vue";
import Notepad from "../components/Notepad.vue";

const activeKey = ref('1')
</script>

<style scoped lang="less">
.home-wrapper {
  height: calc(100vh - 46px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .content-wrap {
    min-width: 360px;
    ::v-deep(.ant-tabs) {
      margin-top: 12px;
      .ant-tabs-content-holder {
        min-height: 400px;
      }
    }
  }
}
</style>
