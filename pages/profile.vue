<script setup lang="ts">
import { useQuasar } from "quasar"
import type { IUpdatedProfile } from '../types/types'
const $q = useQuasar()
const supabaseClient = useSupabaseClient()
const supabaseUser = useSupabaseUser()
const optionsCity = ref<string[]>(["Budapesht", "Moscow", "Minsk", "Berlin", "Phenian"])
const name = ref<string>("")
const surname = ref<string>("")
const date_of_birtday = ref<string>("")
const city = ref<string>("")

const { data } = await supabaseClient.from('profiles').select(`name, surname, date_of_birtday, city`).eq('id', supabaseUser.value.id).single()
if (data) {
  name.value = data.name
  surname.value = data.surname
  date_of_birtday.value = data.date_of_birtday
  city.value = data.city
}

async function updateProfile() {
  try {
    const updatedProfile: IUpdatedProfile = {
      id: supabaseUser.value?.id,
      name: name.value,
      surname: surname.value,
      date_of_birtday: date_of_birtday.value,
      city: city.value
    }
    const { error } = await supabaseClient.from('profiles').upsert(updatedProfile, {
      returning: 'minimal'
    })
    navigateTo('/')
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

function triggerPositiveNotify() {
  $q.notify({
    type: "positive",
    message: "Success to sign out!"
  })
}

const signOut = async () => {
  try {
    const { error } = await supabaseClient.auth.signOut()
    triggerPositiveNotify()
    if (error) console.log(error)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
supabaseClient.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_OUT") {
    navigateTo('/login')
    console.log("SIGNED_OUT", session)
  }
})

</script>

<template>
  <div class="profileCard q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <q-card-section class="bg-dark text-white">
        <div class="text-h6">{{ supabaseUser?.email }}</div>
        <div class="text-subtitle2">by Iwakura developer</div>
      </q-card-section>
      <q-card-actions>
        <q-form @submit="updateProfile" style="width: 500px;">
          <q-input filled v-model="name" label="Your name *" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type your  name']" />
          <q-input filled v-model="surname" label="Your surname *" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type your  surname']" />
          <q-input filled v-model="date_of_birtday" type="date" label="Your date of birtday"
            :rules="[val => val && val.length > 0 || 'Please type your  date']" />
          <q-select filled v-model="city" :options="optionsCity" label="City"
            :rules="[val => val && val.length > 0 || 'Please type your  city']" />
        </q-form>
      </q-card-actions>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="dark" @click="updateProfile" type="submit" label="Save info" />
        <q-btn color="red" outline @click="signOut">Sign out</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style scoped>
.profileCard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>