<template>
  <q-page class="flex flex-center">
    <q-form @submit.prevent="addCard">
      <q-card class="q-pa-md" style="width: 400px">
        <q-card-section>
          <q-input v-model="card.word" label="Word" />
          <q-select v-model="card.gender" :options="genders" label="Gender" />
          <q-input v-model="card.prefix" label="Prefix" />
          <q-input v-model="card.suffix" label="Suffix" />
          <q-input v-model="card.translation" label="Translation" />
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
import axios from 'axios';
import { useUserStore } from '../stores/user'
import { Notify } from 'quasar'

const userStore = useUserStore()

const card = ref({
  word: '',
  gender: '',
  prefix: '',
  suffix: '',
  translation: ''
})

const genders = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Neuter', value: 'neuter' },
  { label: 'No Gender', value: 'no gender' }
]

async function addCard() {
  try {
    const response = await axios.post('http://localhost:3001/cards/',{
        ...card.value,
        user: userStore.getID // get the current user's ID here
    }, {
      headers: {
        Authorization: `Bearer ${userStore.getToken}`
      }
    })
    console.log(response.data)
    // handle success
    card.value = {
      word: '',
      gender: '',
      prefix: '',
      suffix: '',
      translation: ''
    }
    Notify.create({
      color: 'positive',
      position: 'bottom',
      message: 'Added word!',
      icon: 'report_problem'
    })
  } catch (error) {
    console.error(error)
    // handle error
  }
}
</script>