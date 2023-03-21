<template>
  <view class="my-userinfo">
    <view class="top-box">
      <image :src="userInfo.avatar" class="avatar"></image>
      <view class="nickname">
        <view class="nick">{{userInfo.nickName}}</view>
        <view class="type">{{userData.role === 0 ? '老师' : '学生'}}</view>
      </view>
    </view>
    <view class="info">
      <uni-list>
        <block v-for="(item, i) in infoListItems" :key="i">
          <uni-list-item :border="false" class="listItem">
            <template v-slot:header>
              <view class="icon">
                <image :src="item.icon"></image>
              </view>
            </template>
            <template v-slot:body>
              <text class="title">{{item.title}}</text>
            </template>
            <template v-slot:footer>
              <view class="detail">
                <text>{{item.detail}}</text>
              </view>
            </template>
          </uni-list-item>
        </block>
      </uni-list>
    </view>
    <view class="more">
      <uni-list>
        <block v-for="(item, i) in more" :key="i">
          <uni-list-item :border="false" showArrow clickable @click="handleClick(item.operate)">
            <template v-slot:header>
              <view class="icon">
                <image :src="item.icon"></image>
              </view>
            </template>
            <template v-slot:body>
              <text class="title">{{item.title}}</text>
            </template>
          </uni-list-item>
        </block>
      </uni-list>
    </view>
    <view class="dialogLogOut">
      <uni-popup ref="alertDialog" type="dialog">
        <uni-popup-dialog type="info" cancelText="取消" confirmText="确定" title="退出登录" content="您确定退出登录吗？"
          @confirm="logOut" @close="dialogClose"></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>

<script>
  import logger from '@/utils/logger.js';
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        infoListItems: [{
            icon: require('@/static/tab_icons/school.png'),
            title: '学校',
            detail: ''
          },
          {
            icon: require('@/static/tab_icons/code.png'),
            title: '',
            detail: ''
          },
          {
            icon: require('@/static/tab_icons/name.png'),
            title: '姓名',
            detail: ''
          }
        ],
        more: [{
            icon: require('@/static/tab_icons/photo.png'),
            title: '更换照片',
            operate: 'changePhoto'
          },
          {
            icon: require('@/static/tab_icons/about.png'),
            title: '关于我们',
            operate: 'aboutUs'
          },
          {
            icon: require('@/static/tab_icons/logOut.png'),
            title: '退出登录',
            operate: 'dialogToggle'
          }
        ]
      };
    },
    computed: {
      ...mapState('m_user', ['userInfo', 'userData'])
    },
    created() {
      this.infoListItems[0].detail = this.userData.school
      this.infoListItems[1].title = this.userData.role === 0 ? '工号' : '学号'
      this.infoListItems[1].detail = this.userData.code
      this.infoListItems[2].detail = this.userData.name
    },
    methods: {
      // 动态绑定列表点击事件
      handleClick(operate) {
        this[operate]()
      },
      // 更换图片
      changePhoto() {
        console.log('changePhoto')
      },
      // 关于我们
      aboutUs() {
        console.log('aboutUs')
      },
      // 退出登录询问
      dialogToggle() {
        this.$refs.alertDialog.open()
      },
      // 对话框点击取消
      dialogClose() {
        this.$refs.alertDialog.close()
      },
      // 对话框点击确定
      logOut() {
        logger.log('| TUI-User-Center | mine  | quit-logout ')
        uni.$TUIKit.logout().then(() => {
        	uni.clearStorage()
        	uni.reLaunch({
        		url: '../index/index',
        		success: () => {
        			uni.$showMsg('退出成功', 'none')
        		}
        	});
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .my-userinfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;

    .top-box {
      width: 100%;
      height: 400rpx;
      background-color: #ffd2d3;
      display: flex;
      align-items: center;

      .avatar {
        margin-bottom: 20rpx;
        height: 70px;
        width: 70px;
        border-radius: 50%;
        margin-left: 100rpx;
      }

      .nickname {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20rpx;

        color: #fff;
        height: 90rpx;

        .nick {
          font-size: 36rpx;
        }

        .type {
          font-size: 24rpx;
        }
      }
    }

    .info,
    .more {
      overflow: hidden;
      width: 680rpx;
      background-color: #fff;
      border: 1rpx solid #ccc;
      border-radius: 20rpx;
      box-shadow: #ccc 0 0 5rpx 2rpx;
      color: rgb(106, 106, 106);

      /deep/ .uni-list-item {
        .uni-list-item__container {
          align-items: center;

          .icon {
            image {
              vertical-align: middle;
              width: 40rpx;
              height: 40rpx;
            }
          }

          .title {
            font-size: 30rpx;
            margin-left: 25rpx;
          }
        }
      }
    }

    .info {
      position: absolute;
      left: 50%;
      top: 350rpx;
      transform: translateX(-50%);

      /deep/ .uni-list-item {

        .uni-list-item__container {
          padding: 16rpx 30rpx;

          .detail {
            flex: 1;
            color: #c2c2c2;
            font-size: 24rpx;
            text-align: end;
          }
        }
      }
    }

    .more {
      margin-top: 250rpx;
    }
  }
</style>
