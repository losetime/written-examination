<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" theme="dark" @click="handleSelect" />
  <a-config-provider>
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';
import {useRouter} from "vue-router";

const router = useRouter();
const current = ref<string[]>(['Screen']);
const items = ref<MenuProps['items']>([
  {
    key: 'Screen',
    icon: () => h(MailOutlined),
    label: '界面开发题',
    title: '界面开发题',
  },
  {
    key: 'Algorithm',
    icon: () => h(AppstoreOutlined),
    label: '算法题',
    title: '算法题',
  },
]);

const handleSelect = ({ key }) => {
  router.push({ name: key });
}
</script>

