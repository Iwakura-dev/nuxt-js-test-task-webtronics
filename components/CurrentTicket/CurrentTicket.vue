<script setup lang="ts">
import type { IGetTickets } from '~/types/types'
defineEmits(['close-ticket'])
defineProps<{ data: IGetTickets }>()
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <q-btn @click="$emit('close-ticket')" color="black" icon="arrow_back" label="Back"></q-btn>
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <q-card-section class="q-pt-xs">
            <div class="q-mt-sm q-mb-xs">{{ data.name }}</div>
            <div class="text-h5">{{ data.title }}</div>
            <div class="text-caption text-grey">
              {{ data.body }}
            </div>
          </q-card-section>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat> {{ data.date }} </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>