<template>
  <q-page class="flex flex-center">
    <q-form @submit.prevent="addCard">
      <q-card class="q-pa-md" style="width: 400px">
        <q-card-section>
          <q-input v-model="card.word" label="Word" />
          <q-select v-model="card.gender" :options="genders" label="Gender" />
          <q-input v-model="card.prefix" label="Prefix" />
          <q-input v-model="card.suffix" label="Suffix" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn type="submit" color="primary">Add Card</q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'

const card = ref({
  word: '',
  gender: '',
  prefix: '',
  suffix: ''
})

const genders = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Neuter', value: 'neuter' },
  { label: 'No Gender', value: 'no gender' }
]

async function addCard() {
  try {
    const response = await api.post('/cards', {
      ...card.value,
      lasttouched: new Date(),
      user_id: '' // get the current user's ID here
    })
    console.log(response.data)
    // handle success
  } catch (error) {
    console.error(error)
    // handle error
  }
}
</script>