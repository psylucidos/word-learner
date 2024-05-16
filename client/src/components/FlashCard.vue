<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        <span class="text-subtitle2">({{ getGender(flashcard.gender) }})</span>
        {{ flashcard.prefix }}
        <span class="text-h4">{{ flashcard.word }}</span>
        {{ flashcard.suffix }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      Last Touched: {{ flashcard.lastTouched }}
    </q-card-section>

    <q-card-actions align="right">
      <q-btn @click="handleInteraction('repeat')">Repeat</q-btn>
      <q-btn @click="handleInteraction('neutral')">Neutral</q-btn>
      <q-btn @click="handleInteraction('confident')">Confident</q-btn>
      <q-btn @click="handleDelete">Delete</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import axios from 'axios';
import { useUserStore } from '../stores/user';
import { defineProps, defineEmits } from 'vue';
import { Notify } from 'quasar'

const props = defineProps({
  flashcard: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['repeat', 'neutral', 'confident', 'delete']);

const userStore = useUserStore();

const handleInteraction = (interactionType) => {
  const interactionData = {
    interactionType,
    interactionDate: new Date(),
    card: {
      id: props.flashcard.id
    },
    user: {
      id: userStore.getID
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

  emit(interactionType);
};

const handleDelete = () => {
  axios.delete(`http://localhost:3001/cards/${props.flashcard.id}`, {
    headers: {
      Authorization: `Bearer ${userStore.getToken}`
    }
  })
    .then(response => {
      console.log(response.data);
      emit('delete');
      Notify.create({
        color: 'positive',
        position: 'bottom',
        message: 'Deleted word!',
        icon: 'report_problem'
      })
    })
    .catch(error => {
      console.error(error);
    });
};

const getGender = (gender) => {
  switch (gender) {
    case 'male':
      return 'der';
    case 'female':
      return 'die';
    case 'neuter':
      return 'das';
    default:
      return '';
  }
};
</script>