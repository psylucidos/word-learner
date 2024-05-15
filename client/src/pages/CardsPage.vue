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
          />
        </transition>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import FlashCard from 'components/FlashCard.vue'

const flashcards = ref([
  { id: '1', word: 'Hund', gender: 'male', prefix: 'ge', suffix: 'et', lastTouched: '2022-01-01' },
  { id: '2', word: 'Kuche', gender: 'female', prefix: '', suffix: '', lastTouched: '2022-01-02' },
  // Add more flashcards here
])

const currentFlashcardIndex = ref(0)

const currentFlashcard = computed(() => {
  return flashcards.value[currentFlashcardIndex.value]
})

function nextFlashcard() {
  if (currentFlashcardIndex.value < flashcards.value.length - 1) {
    currentFlashcardIndex.value++
  } else {
    currentFlashcardIndex.value = 0
  }
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