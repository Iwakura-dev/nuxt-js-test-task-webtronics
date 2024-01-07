<script setup lang="ts">
const supabaseClient = useSupabaseClient()
const supabaseUser = useSupabaseUser()
const email = ref<string>("")
const password = ref<string>("")
const isPwd = ref<boolean>(true)
function onSubmit(event: Event) {
  event.preventDefault()
  signInWithOtp()
}
function onReset() {
  email.value = ""
  password.value = ""
}
const { data } = await supabaseClient.from('profiles').select(`email`).single()
if (data) {
  email.value = data.email
}
async function updateEmail() {
  const updateEmail: { email: string } = {
    email: email.value
  }
  try {
    const { error } = await supabaseClient.from('profiles').upsert(updateEmail, {
      returning: 'minimal'
    })
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
async function signInWithOtp() {
  try {
    const { error } = await supabaseClient.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: "http://localhost:3000/confirm"
      }
    })
    updateEmail()
    alert("Success, please check your email!")
    if (error) console.log(error)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
</script>

<template>
  <div class="column form">
    <h1 style="font-size: 36px; padding: 10px 0;">Hey friend! Welcome back</h1>
    <div class="q-pa-md shadow-2 rounded-borders" style="width: 500px;">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="email" label="Your email *" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type your email']" hint="Input your valid email address" />
        <q-input v-model="password" label="Your password *" filled :type="isPwd ? 'password' : 'text'"
          hint="Password with toggle" :rules="[
            val => val !== null && val !== '' || 'Please type your password']">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <div>
          <q-btn type="submit" color="dark" :label="supabaseUser?.id ? 'Sign Up' : 'Sign In'" />
          <q-btn outline label="Reset" type="reset" color="red" class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<style>
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>