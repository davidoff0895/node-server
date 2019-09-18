<template>
  <container :locale="locale">
    <div slot="content">
      <i18n path="mail.mail-content" :locale="locale">
        <b>{{ body.guest.firstName }} {{ body.guest.lastName }}</b>
        <a href="https://github.com/davidoff0895/node-server">https://github.com/davidoff0895/node-server</a>
      </i18n>
    </div>
  </container>
</template>

<script>
  import Container from './container'
  export default {
    name: 'mail',
    components: {Container},
    props: {
      contentData: Object
    },
    data() {
      return {
        body: this.contentData.body,
        locale: this.contentData.locale,
      }
    }
  }
</script>
