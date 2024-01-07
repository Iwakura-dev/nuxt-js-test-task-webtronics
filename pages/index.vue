<script setup lang="ts">
import Layout from '../components/Layout/Layout.vue'
definePageMeta({
  middleware: "auth"
})
</script>

<template>
  <Layout />
</template>