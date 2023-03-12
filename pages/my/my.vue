<template>
  <view class="my-userinfo">
    <view class="top-box">
      <image :src="userInfo.avatar" class="avatar"></image>
      <view class="nickname">{{userInfo.nickName}}</view>
    </view>
    <view class="info">
      <block v-for="(item, i) in infoList" :key="i">
        <myInfo :item="item"></myInfo>
      </block>
    </view>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import myInfo from '@/components/myInfo/myInfo.vue'
  export default {
    data() {
      return {
        infoList: [
          {key: "学校", value: ""}, 
          {key: "", value: ""}, 
          {key: "姓名", value: ""}
        ]
      };
    },
    computed: {
      ...mapState('m_user', ['userInfo', 'userData'])
    },
    onLoad() {
      if (this.userData.role === 0) {
        // 身份为老师
        this.infoList[1].key = '工号';
      } else {
        // 身份为学生
        this.infoList[1].key = '学号';
      }
      this.infoList[0].value = this.userData.school;
      this.infoList[1].value = this.userData.code;
      this.infoList[2].value = this.userData.name;
    }
  }
</script>

<style lang="less">
  page, .my-userinfo {
    height: 100%;
    background-color: #f4f4f4;
    
    .top-box {
      margin-top: 50rpx;
      height: 400rpx;
      background-color: antiquewhite;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      
      .avatar {
        margin-bottom: 20rpx;
        height: 90px;
        width: 90px;
        border-radius: 50%;
        background-color: skyblue;
      }
    }
  }
</style>
