<script setup lang="ts">
import type { IGetTickets } from '~/types/types'
import { columns } from "~/constants/constants"
import CurrentTicket from "~/components/CurrentTicket/CurrentTicket.vue"
import getTicket from '~/service/getTicket'

const tickets = ref<IGetTickets[]>([])
const isActive = ref<boolean>(false)
const currentTicket = ref<IGetTickets | undefined>()

function handleOpenCurrentTicket(id: string | number) {
  currentTicket.value = tickets.value.find((item) => item.id === id)
  isActive.value = true
}
function closeCurrentTicket() {
  currentTicket.value = undefined
  isActive.value = false
}
onMounted(() => {
  getTicket(tickets)
})
</script>

<template>
  <q-page-container>
    <div class="q-pa-md">
      <q-table class="my-sticky-virtscroll-table" virtual-scroll flat bordered :rows-per-page-options="[0]"
        :virtual-scroll-sticky-size-start="48" row-key="id" title="Tickets" :rows="tickets" :columns="columns"
        v-if="!isActive">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name !== 'url'">
                {{ col.value }}
              </template>
              <q-btn v-else color="dark" label="Details" @click="handleOpenCurrentTicket(col.value)" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <template v-else>
        <CurrentTicket v-if="currentTicket" :data="currentTicket" @close-ticket="closeCurrentTicket" />
      </template>
    </div>
  </q-page-container>
</template>

