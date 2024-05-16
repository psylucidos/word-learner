<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">Login</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <q-input
          filled
          v-model="username"
          label="Username"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type your username']"
        />

        <q-input
          filled
          type="email"
          v-model="email"
          label="Email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type your email']"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type your password']"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import axios from 'axios'
import { Notify } from 'quasar'

const userStore = useUserStore()
const router = useRouter()

const username = ref(null)
const email = ref(null)
const password = ref(null)

function onSubmit () {
  const loginDto = {
    username: username.value,
    email: email.value,
    password: password.value
  }

  axios.post('http://localhost:3001/auth/login', loginDto)
    .then(response => {
      // Set the token
      userStore.setToken(response.data.access_token)
      userStore.setID(response.data.id)

      router.push('/cards')
    })
    .catch(error => {
      if (error.response.status === 400) {
        Notify.create({
          color: 'negative',
          position: 'top',
          message: 'Invalid username, email or password',
          icon: 'report_problem'
        })
      } else {
        Notify.create({
          color: 'negative',
          position: 'top',
          message: 'An error occurred while trying to login',
          icon: 'report_problem'
        })
      }
    })
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 600px
</style>