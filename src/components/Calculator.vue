<template>
  <div class="calculator-wrapper">
    <div class="calc-screen">
      <span :class="{ 'calc-formula-normal': calcResult,  'calc-formula-done': !calcResult }" >{{calcParamLeft || 0}}{{operatorKey}}{{calcParamRight}}</span>
      <span class="calc-result" v-show="calcResult">{{ calcResult }}</span>
    </div>
    <div class="keyboard-wrap">
      <div class="num-key-wrap">
        <a-button v-for="item in numKeyOptions" :key="item" @click="getCalcParam(item)">
          {{ item }}
        </a-button>
        <a-button class="equal-to" @click="getResult">=</a-button>
      </div>
      <div class="operator-wrap">
        <a-button v-for="item in operatorKeyOptions" :key="item" @click="getOperatorKey(item)">
          {{ item }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BigNumber } from "bignumber.js";
import {message} from "ant-design-vue";

// 运算符左侧参数
const calcParamLeft = ref('')
// 运算符右侧参数
const calcParamRight = ref('')
// 运算符
const operatorKey = ref('')
// 计算结果
const calcResult = ref('')

const numKeyOptions = ['C', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.']
const operatorKeyOptions = ['+', '-', 'x', '÷']

/**
 * @author: wwp
 * @createTime: 2024/12/4 15:58
 * @description: 获取计算参数
 * @param item 参数具体值
 */
const getCalcParam = (item) => {
  switch (item) {
    case 'C':
      handleClear();
      break;
    default:
      if(calcResult.value) {
        handleClear();
      }
      if(operatorKey.value) {
        if(calcParamRight.value.length >= 16) {
          message.warn('已经超过最大值')
          return;
        }
        // 直接键入操作符，给左边参数补0
        if(!calcParamLeft.value) {
          calcParamLeft.value = '0';
        }
        if (item === '.') {
          // 直接键入小数点，给参数补0
          if(!calcParamRight.value) {
            calcParamRight.value = '0' + item;
          } else {
            // 如果已经有小数点，则忽略
            if(!calcParamRight.value.includes(item)) {
              calcParamRight.value += item;
            }
          }
        } else {
          calcParamRight.value += item;
        }
      } else {
        if (calcParamLeft.value.length >= 16) {
          message.warn('已经超过最大值')
          return;
        }
        if (item === '.') {
          if(!calcParamLeft.value) {
            calcParamLeft.value = '0' + item;
          } else {
            if(!calcParamLeft.value.includes(item)) {
              calcParamLeft.value += item;
            }
          }
        } else {
          calcParamLeft.value += item;
        }
      }
      break;
  }
}

/**
 * @author: wwp
 * @createTime: 2024/12/4 15:59
 * @description: 获取运算符
 * @param item 运算符值
 */
const getOperatorKey = (item) => {
  if (calcResult.value) {
    calcParamLeft.value = calcResult.value;
    calcParamRight.value = '';
    calcResult.value = '';
  }
  operatorKey.value = item;
}

/**
 * @author: wwp
 * @createTime: 2024/12/4 16:01
 * @description: 清空操作
 */
const handleClear = () => {
  calcParamLeft.value = '';
  calcParamRight.value = '';
  operatorKey.value = '';
  calcResult.value = '';
}

/**
 * @author: wwp
 * @createTime: 2024/12/4 16:01
 * @description: 计算结果
 */
const getResult = () => {
  if (calcParamRight.value) {
    try {
      const reg = /(\d+)\.(?=\d*)/g;
      // 处理当用户输入小数点后直接添加运算符
      calcParamLeft.value = calcParamLeft.value.replace(reg, '$1')
      calcParamRight.value = calcParamRight.value.replace(reg, '$1')
      calcResult.value = new BigNumber(calcParamLeft.value)[operatorDict(operatorKey.value)](calcParamRight.value)
    } catch (e) {
      calcResult.value = ''
    }
  }
}

/**
 * @author: wwp
 * @createTime: 2024/12/4 16:01
 * @description: 运算符字典，用于翻译bignumber相对应的操作
 * @param key 包含在operatorKeyOptions中的某个值
 */
const operatorDict = (key) => {
  switch (key) {
    case '+':
      return 'plus'
    case '-':
      return 'minus'
    case 'x':
      return 'times'
    case '÷':
      return 'div'
  }
}
</script>

<style scoped lang="less">
.calculator-wrapper {
  .calc-screen {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border: 1px solid #E6E6E6;
    height: 60px;
    width: 100%;
    padding-right: 8px;
    border-radius: 6px;
    span {
      text-align: right;
    }
    .calc-formula-normal {
      color: #8A8A8A;
    }
    .calc-formula-done,
    .calc-result {
      font-weight: bold;
      font-size: 20px;
    }
  }
  .keyboard-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
    .num-key-wrap {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-column-gap: 12px;
      grid-row-gap: 12px;
      .ant-btn {
        width: 60px;
        height: 40px;
      }
      .equal-to {
        width: 100%;
        grid-column-start: 1;
        grid-column-end: 5;
        color: #D97A20;
        font-weight: bold;
      }
    }
    .operator-wrap {
      display: grid;
      grid-template-columns: 1fr;
      grid-column-gap: 12px;
      grid-row-gap: 12px;
      .ant-btn {
        width: 60px;
        height: 40px;
        color: #D97A20;
        font-weight: bold;
        font-size: 20px;
      }
    }
  }
}
</style>