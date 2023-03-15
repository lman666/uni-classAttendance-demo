<template>
  <view class="punchResList">
    <uni-list>
      <block v-for="(item, i) in punchResList" :key="i">
        <uni-list-item>
        	<template v-slot:header>
        		<view class="stuInfo">
              <view class="name">{{item.name}}</view>
              <view class="code">{{item.code}}</view>
            </view>
        	</template>
        	<template v-slot:footer>
        		<view class="operate">
              <button v-if="item.isPunch === false" size="mini">打卡</button>
              <button v-if="item.isPunch === true" size="mini">已打卡</button>
              <button size="mini">聊天</button>
            </view>
        	</template>
        </uni-list-item>
      </block>
    </uni-list>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        punchResList: []
      }
    },
    onLoad(option) {
      this.punchResList = JSON.parse(decodeURIComponent(option.punchResList))
      console.log(this.punchResList)
    }
  }
</script>

<style lang="less">
  .punchResList {
    .stuInfo {
      .name {
        color: #3b4144;
        font-size: 28rpx;
      }
      
      .code {
        color: #999;
        font-size: 24rpx;
        margin-top: 6rpx;
      }
    }
    
    .operate {
      width: 230rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      button {
        width: 100rpx;
        height: 64rpx;
        box-sizing: border-box;
        line-height: 64rpx;
        padding: 0;
      }
    }
  }
</style>
