<template>
<div class="header-wrapper">
  <div class="date-wrap">
   今天是{{ currentDate }}
  </div>
  <div class="temperature-and-weather-wrap">
    <span>{{ temperature }}</span>
    <span>{{ weather }}</span>
  </div>
</div>
</template>

<script setup>
import dayjs from "dayjs";
import { onMounted, ref } from "vue";

const currentDate = ref()
const temperature = ref()
const weather = ref()

onMounted(() => {
  getCurrentDate();
  getWeather();
})

/**
 * @author: wwp
 * @createTime: 2024/12/3 20:16
 * @description: 获取当前时间
 * @return
 */
const getCurrentDate = () => {
  const date = dayjs();
  currentDate.value = date.format("YYYY年MM月DD日 HH:mm:ss");
  const timeout = setTimeout(() => {
    getCurrentDate();
    clearTimeout(timeout);
  }, 1000)
}

/**
 * @author: wwp
 * @createTime: 2024/12/3 20:25
 * @description: 获取第三方天气数据
 * @return
 */
const getWeather = () => {
  fetch("https://restapi.amap.com/v3/weather/weatherInfo?city=610400&key=54b594391cc485898ba027887d5df709").then(res => {
    res.json().then(data => {
      const { infocode, lives } = data;
      if(infocode === '10000') {
        if(lives.length > 0) {
          const liveResult = lives[0];
          weather.value = liveResult.weather;
          temperature.value = liveResult.temperature + '℃';
        }
      }
    })
  })
  const timer = 1000 * 60 * 5;
  const timeout = setTimeout(() => {
    getCurrentDate();
    clearTimeout(timeout);
  }, timer);
}
</script>

<style scoped lang="less">
.header-wrapper {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(to bottom left, #4A6DFB, #A981FC);
  padding: 12px;
  color: #ffffff;
  border-top-left-radius: 26px;
  border-bottom-right-radius: 26px;
  .temperature-and-weather-wrap {
    margin-top: 12px;
    span:last-child {
      margin-left: 12px;
    }
  }
}
</style>