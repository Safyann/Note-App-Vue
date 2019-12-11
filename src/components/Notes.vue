<template>
  <!-- note list -->
  <div class="notes">
    <div
      class="note"
      :class="[note.importance, !grid ? 'full' : '']"
      v-for="(note, index) in notes"
      :key="index"
    >
      <div class="note-header" :class="{full: !grid}">
        <p @click="editNote(note)" v-if="!note.edit">{{ note.title }}</p>
        <input
          type="text"
          v-model="note.title"
          v-else
          @blur="updateNote(index, note)"
          @keyup.enter="updateNote(index, note)"
          @keyup.esc="cancelEdit(note)"
        />
        <p style="cursor:pointer" @click="removeNote(index)">X</p>
      </div>

      <div class="note-body">
        <p>{{ note.descr }}</p>
        <span>{{ note.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    },
    grid: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    removeNote(index) {
      this.$emit("remove", index);
    },
    updateNote(index, note) {
      this.$emit("update", index, note.title);
      note.edit = false;
    },
    editNote(note) {
      this._originalNote = Object.assign({}, note);
      note.edit = true;
    },
    cancelEdit(note) {
      Object.assign(note, this._originalNote);
      note.edit = false;
    }
  }
};
</script>

<style lang="scss">
.notes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 0;
}

.note {
  width: 48%;
  padding: 18px 20px;
  margin-bottom: 20px;
  background-color: #ffffff;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  box-shadow: 0 30px 30px rgba($color: #000000, $alpha: 0.02);
  &:hover {
    box-shadow: 0 30px 30px rgba($color: #000000, $alpha: 0.04);
    transform: translate(0, -6px);
    transition-delay: 0s;
  }
  &.full {
    width: 100%;
    text-align: center;
  }
  &.very-important {
    background: #fc5c65;
    p,
    span {
      color: #ffffff;
    }
  }
  &.important {
    background: #fed330;
  }
  input {
    margin-bottom: 0;
    margin-right: 20px;
  }
}

.note-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 32px;
  }
  p {
    color: #494ce8;
    font-size: 22px;
  }
  svg {
    margin-right: 12px;
    color: #999;
    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #494ce8;
    }
  }
  &.full {
    justify-content: center;
    p {
      margin-right: 16px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.note-body {
  p {
    margin: 20px 0;
  }
  span {
    font-size: 14px;
    color: #999;
  }
}
</style>