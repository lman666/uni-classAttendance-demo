<template>
  <view class="body">
    <teacherPart v-if="token && userData && showPart === 'teacher'"/>
    <studentPart v-if="token && userData && showPart === 'student'" :token="token" :userData="userData" v-else/>
  </view>
</template>

<script>
  import teacherPart from '@/components/teacherPart/teacherPart.vue'
  import studentPart from '@/components/studentPart/studentPart.vue'
  
  import {
    mapState
  } from 'vuex'
  
  export default {
    components: {
      teacherPart,
      studentPart
    },
    computed: {
      ...mapState('m_user', ['userInfo', 'token', 'userData'])
    },
    data() {
      return {
        showPart: 'teacher'
      }
    },
    onLoad() {
      if (JSON.stringify(this.userInfo) === '{}' || this.token === '' || !this.verify()) {
        uni.navigateTo({
          url: '/pages/index/index'
        })
      }
    },
    onShow() {
      if (this.userData.role === 0) {
        this.showPart = 'teacher'
      } else {
        this.showPart = 'student'
      }
    },
    methods: {
      // 验证token是否正确
      async verify() {
        let pro = false
        if (this.token !== '') {
          const tokenHelper = uniCloud.importObject('tokenHelper')
          pro = await tokenHelper.verifyToken(this.token)
        }
        return pro
      }
    }
  }
</script>

<style lang="less">

</style>
