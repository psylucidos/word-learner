<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-center">
      <div class="q-pa-md">
        <transition name="fade" mode="out-in">
          <flash-card
            :key="currentFlashcard.id"
            :flashcard="currentFlashcard"
            @confident="nextFlashcard('confident')"
            @neutral="nextFlashcard('neutral')"
            @repeat="nextFlashcard('repeat')"
          />
        </transition>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import FlashCard from 'components/FlashCard.vue'
import { useUserStore } from '../stores/user'

import axios from 'axios';

const userStore = useUserStore()

const flashcards = ref([
  { id: '1', word: 'Hund', gender: 'male', prefix: 'ge', suffix: 'et', lastTouched: '2022-01-01' },
  { id: '2', word: 'Kuche', gender: 'female', prefix: '', suffix: '', lastTouched: '2022-01-02' },
  // Add more flashcards here
])

const currentFlashcardIndex = ref(0)

const currentFlashcard = computed(() => {
  if (flashcards.value[currentFlashcardIndex.value]) {
    return flashcards.value[currentFlashcardIndex.value]
  } else {
    return { id: '1', word: 'No Word found', gender: 'male', prefix: 'ge', suffix: 'et', lastTouched: '2022-01-01' }
  }
})

onMounted(() => {
  axios.get('http://localhost:3001/cards/', {
    headers: {
      Authorization: `Bearer ${userStore.getToken}`
    }
  })
    .then(response => {
      console.log('got repsonse', response.data);
      flashcards.value = response.data;
    })
    .catch(error => {
      console.error(error);
    });
})

function nextFlashcard(interactionType) {
  if (currentFlashcardIndex.value < flashcards.value.length - 1) {
    currentFlashcardIndex.value++
  } else {
    currentFlashcardIndex.value = 0
  }

  const interactionData = {
    interactionType: interactionType, // or 'neutral' or 'confident'
    interactionDate: new Date(), // current date and time
    card: {
      id: currentFlashcard.value.id // replace with the actual card ID
    },
    user: {
      id: userStore.getID // replace with the actual user ID
    }
  };

  axios.post('http://localhost:3001/card-interactions', interactionData, {
    headers: {
      Authorization: `Bearer ${userStore.getToken}`
    }
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>