<template>
  <div id="app" data-server-rendered="true">
    <router-view :contentData="contentData"/>
  </div>
</template>

<script>
  export default {
    name: 'server',
    props: {
      contentData: Object
    }
  }
</script>
