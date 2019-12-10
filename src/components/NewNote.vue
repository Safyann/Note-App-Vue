<template>
  <!-- new note -->
  <div class="new-note">
    <div class="new-note__row">
      <div class="new-note__input">
        <label>Title</label>
        <input v-model="note.title" type="text" />
      </div>

      <div class="new-note__input">
        <label>Importance</label>
        <select v-model="note.importance">
          <option value="standart">Standart</option>
          <option value="important">Important</option>
          <option value="very-important">Very important</option>
        </select>
      </div>
    </div>

    <label>Description</label>
    <textarea v-model="note.descr"></textarea>

    <button class="btn btnPrimary" @click="addNote">New note</button>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  methods: {
    addNote() {
      this.$emit("addNote", this.note);
    }
  }
};
</script>

<style lang="scss">
.new-note {
  text-align: center;
}

.new-note__row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.new-note__input {
  width: 48%;
}
</style>