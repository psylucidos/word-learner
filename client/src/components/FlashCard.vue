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
      <q-btn @click="$emit('repeat')">Repeat</q-btn>
      <q-btn @click="$emit('neutral')">Neutral</q-btn>
      <q-btn @click="$emit('confident')">Confident</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    flashcard: {
      type: Object,
      required: true
    }
  },
  methods: {
    getGender(gender) {
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
    }
  }
}
</script>