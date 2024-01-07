<script setup lang="ts">
import { Icon } from "#components"
import { routerItems } from '~/constants/constants'
const supabaseClient = useSupabaseClient()
const supabaseUser = useSupabaseUser()
const drawerLeft = ref<boolean>(false)
const routerItemsReactive = ref(routerItems)
const { data } = await supabaseClient.from('profiles').select(`name, surname`).eq('id', supabaseUser.value.id).single()
</script>

<template>
  <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-dark'">
    <q-toolbar>
      <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
      <q-toolbar-title>{{ data ? `${data.name} ${data.surname}` : supabaseUser?.email }}</q-toolbar-title>
    </q-toolbar>
  </q-header>

  <q-drawer v-model="drawerLeft" show-if-above :width="200" :breakpoint="700" elevated class="bg-dark text-white">
    <q-scroll-area class="fit">
      <div class="q-pa-sm">
        <div v-for="items in routerItemsReactive" class="q-pa-sm">
          <div class="row q-pa-sm" :key="items.id" style="gap: 10px">
            <Icon :name="items.iconName" style="width: 20px; height: 20px" />
            <RouterLink :to="items.routerUrl" class="routerItems" external>
              {{ items.title }}
            </RouterLink>
          </div>
        </div>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped lang="css">
.routerItems {
  text-decoration: none;
  position: relative;
  color: white;
  font-size: 1rem;
}

.routerItems::after {
  content: '';
  position: absolute;
  left: 0;
  display: inline-block;
  height: 1em;
  width: 100%;
  border-bottom: 1px solid;
  margin-top: 10px;
  opacity: 0;
  transition: opacity 0.35s, transform 0.35s;
  transform: scale(0, 1);
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  -webkit-transform: scale(0, 1);
}

.routerItems:hover::after {
  opacity: 1;
  transform: scale(1);
  -webkit-transform: scale(1);
}
</style>