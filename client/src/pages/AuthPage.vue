<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-center">
      <div class="q-pa-md">
        <q-tabs v-model="tab" class="text-teal">
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <login-component />
          </q-tab-panel>

          <q-tab-panel name="register">
            <register-component />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import LoginComponent from 'components/LoginComponent.vue'
import RegisterComponent from 'components/RegisterComponent.vue'

const tab = ref('login')
</script>