<template>
  <view class="info">
    <view class="key">{{item.key}}</view>
    <view class="value">{{item.value}}</view>
  </view>
</template>

<script>
  export default {
    name:"myInfo",
    props: {
      item: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="less">
  .info {
    margin: 0 auto;
    margin-bottom: 10rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 520rpx;
    height: 100rpx;
    border: 1px solid #BBBBBB;
    border-radius: 20rpx;
  }
</style>
