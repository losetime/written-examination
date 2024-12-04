<template>
<div class="notepad-wrapper">
  <div class="head-wrap">
    <div class="tags-wrap">
      <a-tag color="orange" :bordered="false" v-for="(item,index) in tags" :key="item.id" closable @close="handleClearTag(index)">
        {{ item.label }}
      </a-tag>
      <div class="input-wrap">
        <a-input v-model:value="inputValue" :bordered="false" size="small" placeholder="请输入" @keyup.enter="handleEnter" @blur="handleEnter" />
      </div>
    </div>
  </div>
  <div class="add-btn">
    <a-button :disabled="tags.length <= 0" @click="handleClearTags">清除</a-button>
    <a-button type="primary" @click="handleAdd">添加</a-button>
  </div>
  <div class="todo-list-wrap" @mouseleave="hideTodoHandle">
    <div class="todo-item-wrap" v-for="(item, index) in todoList" :key="item.id" @mouseenter="showTodoHandle(index)">
      <a-tag :bordered="false" :color="item.status === 'done' ? 'success' : 'processing'" class="todo-content">
        <span class="todo-label">{{ item.label }}</span>
        <span class="done-symbol" v-if="item.status === 'done'">√</span>
      </a-tag>
      <div class="todo-handle" v-show="activeIndex === index">
        <a-button size="small" type="text" v-if="item.status === 'pending'" @click="handleTaskDone(index)">完成</a-button>
        <a-button size="small" type="text" danger @click="handleDelTask(index)">删除</a-button>
      </div>
    </div>
    <a-empty
        v-if="todoList.length <= 0"
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
          height: '60px',
        }"
    >
      <template #description>
        <span>暂无内容</span>
      </template>
    </a-empty>
  </div>
</div>
</template>

<script setup>
import { ref } from "vue";
import { nanoid } from 'nanoid'

const tags = ref([])
const inputValue = ref('')
const todoList = ref([])
const activeIndex = ref(-1)

/**
 * @author: wwp
 * @createTime: 2024/12/5 00:36
 * @description: 回车或失去焦点生成一条事件
 */
const handleEnter = () => {
  if (inputValue.value) {
    tags.value.push({
      id: nanoid(),
      label: inputValue.value,
      status: 'pending'
    });
    inputValue.value = '';
  }
}

/**
 * @author: wwp
 * @createTime: 2024/12/5 00:38
 * @description: 清除单个临时事件
 */
const handleClearTag = (index) => {
  tags.value.splice(index, 1);
}

/**
 * @author: wwp
 * @createTime: 2024/12/5 00:38
 * @description: 清除所有临时事件
 */
const handleClearTags = () => {
  tags.value = [];
}

/**
 * @author: wwp
 * @createTime: 2024/12/5 00:39
 * @description: 将所有临时事件添加到列表中
 */
const handleAdd = () => {
  todoList.value = todoList.value.concat(tags.value);
  tags.value = [];
}

/**
 * @author: wwp
 * @createTime: 2024/12/5 00:40
 * @description: 修改事件状态为【完成】
 */
const handleTaskDone = (index) => {
  todoList.value[index].status = 'done'
}

/**
 * @author: wwp
 * @createTime: 2024/12/5 00:40
 * @description: 删除列表中的事件
 */
const handleDelTask = (index) => {
  todoList.value.splice(index, 1)
}

/**
 * @author: wwp
 * @createTime: 2024/12/4 23:33
 * @description: 防抖函数
 * @param func 回调函数
 * @param delay 等待时间
 * @return
 */
const debounceHandle = (func,delay) => {
  let timeout;
  return function (){
    if(timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this,arguments);
    }, delay);
  }
}

/**
 * @author: wwp
 * @createTime: 2024/12/5 00:41
 * @description: 鼠标划过显示操作
 */
const showTodoHandle = debounceHandle((index) => {
  activeIndex.value = index;
}, 200)

/**
 * @author: wwp
 * @createTime: 2024/12/5 00:41
 * @description: 隐藏操作
 */
const hideTodoHandle = () => {
  const timeout = setTimeout(() => {
    activeIndex.value = -1;
    clearTimeout(timeout)
  }, 200)
}
</script>

<style scoped lang="less">
.notepad-wrapper {
  .head-wrap {
    display: flex;
    justify-content: space-between;
    .tags-wrap {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border: 1px solid #D9D9D9;
      border-radius: 6px;
      padding: 4px 10px 12px 10px;
      .ant-tag {
        margin-top: 8px;
        word-break: break-all;
        white-space: normal;
      }
      .input-wrap {
        flex: 1;
        min-width: 50px;
        margin-top: 8px;
        .ant-input {
          width: 100%;
        }
      }
    }
  }
  .add-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
    .ant-btn:last-child {
      margin-left: 12px;
    }
  }
  .todo-list-wrap {
    border: 1px solid #D9D9D9;
    border-radius: 6px;
    margin-top: 12px;
    padding: 12px;
    max-height: 300px;
    overflow: auto;
    .todo-item-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px;
      cursor: pointer;
      .todo-content {
        height: 24px;
        .todo-label {
          word-break: break-all;
          white-space: normal;
        }
        .done-symbol {
          margin-left: 8px;
        }
      }
      .todo-handle {
        min-width: 80px;
        display: flex;
        justify-content: flex-end;
        .ant-btn {
          font-size: 12px;
        }
      }
      &:hover {
        background-color: #F0F0F0;
        border-radius: 6px;
      }
    }
    .todo-item-wrap:first-child {
      margin-top: 0;
    }
  }
}
</style>