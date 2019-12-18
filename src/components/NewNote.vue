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
          <option
            v-for="imp in importance"
            :key="imp.value"
            :value="imp.value"
            >{{ imp.title }}</option
          >
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
  data() {
    return {
      message: null,
      note: null,
      importance: null
    };
  },
  created() {
    this.message = this.$store.getters.getMessage;
    this.note = this.$store.getters.getNote;
    this.importance = this.$store.getters.getImportance;
  },
  methods: {
    addNote() {
      if (this.note.title === "") {
        this.$store.dispatch("changeMessage", "title can`t be blank!");
        return false;
      }

      this.$store.dispatch("addNote", this.note);

      this.$store.dispatch("changeMessage", null);
      this.note.title = "";
      this.note.descr = "";
      this.note.importance = "standart";
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
