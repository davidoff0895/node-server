<template>
  <div>
    Hi. I'm mail from node server of github repository
    <a href="https://github.com/davidoff0895/node-server">https://github.com/davidoff0895/node-server</a>
    <p>Your mail params: {{ contentData }}</p>
  </div>
</template>

<script>
  export default {
    name: 'mail',
    props: {
      contentData: Object
    }
  }
</script>
