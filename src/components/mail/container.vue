<template>
  <div :style="styles.container">
    <div :style="styles.header">
      {{ $t('mail.header', locale) }}
    </div>
    <div :style="styles.body">
      <slot name="content"></slot>
    </div>
    <div :style="styles.footer">
      <div :style="styles.footerLabel">
        {{ $t('mail.unsubscribe', locale) }}
      </div>
    </div>
  </div>
</template>

<script>
  import styles from './styles'

  export default {
    name: 'container',
    props: {
      locale: String
    },
    data() {
      return {
        styles
      }
    }
  }
</script>
