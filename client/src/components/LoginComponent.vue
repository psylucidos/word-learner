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

const username = ref(null)
const password = ref(null)

function onSubmit () {
  // This is where you would call your login API
  console.log('username:', username.value)
  console.log('password:', password.value)
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 600px
</style>