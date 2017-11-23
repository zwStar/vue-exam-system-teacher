<template>
  <div id="testList">

  </div>
</template>

<script>
  import {get_test} from '@/api/request'
  export default {
    data(){
      return {

      }
    },
    mounted(){
      get_test().then((result)=>{
        console.log(result)
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
