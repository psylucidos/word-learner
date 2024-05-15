<template>
  <q-item
    clickable
    :to="to"
    exact
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
defineProps({
  title: {
    required: true
  },

  caption: {
    default: ''
  },

  icon: {
    default: ''
  },

  to: {
    default: null
  }
})
</script>