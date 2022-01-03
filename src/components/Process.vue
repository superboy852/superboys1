<template>
  <div class="process">
    <div v-for="(item, index) in list" :key="item" class="rdx-flex">
      <div :class="['process-item', active === index && 'active']">
        <span class="num">{{index + 1}}</span>
        {{item}}
      </div>
      <div v-if="index < list.length-1" class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: { type: Array, require: true },
    active: { type: Number, default: 0 }
  }
}
</script>

<style lang="scss" scoped>
.process {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: $rdx-tips-color;
  .process-item {
    margin: 0 8px;
  }
  .num {
    display: inline-block;
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-right: 6px;
    text-align: center;
    border: 1px solid $rdx-tips-color;
    border-radius: 50%;
  }
  .active {
    color: $rdx-main-color;
    .num {
      color: $rdx-light-color;
      background: $rdx-primary;
      border: 1px solid $rdx-primary;
    }
  }

  .line {
    width: 160px;
    height: 1px;
    background: $rdx-border-color;
  }
}
</style>
