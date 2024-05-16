<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-center">
      <div class="q-pa-md">
        <transition name="fade" mode="out-in">
          <flash-card
            :key="currentFlashcard.id"
            :flashcard="currentFlashcard"
            @confident="nextFlashcard"
            @neutral="nextFlashcard"
            @repeat="nextFlashcard"
            @delete="handleDelete"
          />
        </transition>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue'
import FlashCard from 'components/FlashCard.vue'
import { useUserStore } from '../stores/user'

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
  getCardDeck();
})

function getCardDeck() {
  axios.get('http://localhost:3001/cards/review', {
    headers: {
      Authorization: `Bearer ${userStore.getToken}`
    }
  })
    .then(response => {
      console.log('got repsonse', response.data);
      flashcards.value = response.data;
      currentFlashcardIndex.value = 0
    })
    .catch(error => {
      console.error(error);
    });
}

function nextFlashcard() {
  if (currentFlashcardIndex.value < flashcards.value.length - 1) {
    currentFlashcardIndex.value++
  } else {
    getCardDeck()
  }
}

function handleDelete() {
  flashcards.value = flashcards.value.filter(card => card.id !== currentFlashcard.value.id);
  nextFlashcard();
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