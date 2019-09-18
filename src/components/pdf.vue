<template>
  <div class="page">
    <img class="background" src="https://raw.githubusercontent.com/davidoff0895/todo/master/app/img/bg.jpg"
         alt="pdfBackgroudn">
    <div class="text">
      <i18n path="pdf.content" :locale="locale">
        <span>{{ body.guest.firstName }} {{ body.guest.lastName }}</span>
      </i18n>
    </div>
    <div class="date">
      {{ dateNow }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pdf',
    props: {
      contentData: Object
    },
    data() {
      return {
        body: this.contentData.body,
        locale: this.contentData.locale,
        dateNow: `${new Date().getDay()}.${new Date().getMonth()}.${new Date().getFullYear()}`
      }
    }
  }
</script>
