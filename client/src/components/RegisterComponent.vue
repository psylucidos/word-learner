<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">Register</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <q-input
          filled
          v-model="email"
          label="Email"
          type="email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type your email']"
        />

        <q-input
          filled
          v-model="username"
          label="Username"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type your username']"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password"
          lazy-rules
          :rules="[ val => val && val.length >= 8 || 'Please type a password with at least 8 characters']"
        />

        <q-input
          filled
          type="password"
          v-model="confirmPassword"
          label="Confirm Password"
          lazy-rules
          :rules="[ val => val && val === password || 'Passwords do not match']"
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

const email = ref(null)
const username = ref(null)
const password = ref(null)
const confirmPassword = ref(null)

function onSubmit () {
  const registerDto = {
    email: email.value,
    username: username.value,
    password: password.value
  }

  axios.post('http://localhost:3001/auth/register', registerDto)
    .then(response => {
      // Set the token
      userStore.setToken(response.data.token)
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