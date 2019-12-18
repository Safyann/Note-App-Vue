<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <!-- message -->
        <message v-if="message" />

        <!-- new note -->
        <newNote />

        <div class="note-header" style="margin: 36px 0">
          <!-- title -->
          <h1>{{ title }}</h1>

          <!-- search -->

          <search
            :value="search"
            placeholder="Find your note"
            @search="search = $event"
          />
          <!-- icons controls -->
          <div class="icons">
            <svg
              :class="{ active: grid }"
              @click="grid = true"
              style="cursor:pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>

            <svg
              :class="{ active: !grid }"
              @click="grid = false"
              style="cursor:pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3" y2="6" />
              <line x1="3" y1="12" x2="3" y2="12" />
              <line x1="3" y1="18" x2="3" y2="18" />
            </svg>
          </div>
        </div>

        <!-- note list -->
        <notes :notes="notesFilter" :grid="grid" @cancelEdit="notUpdateNote" />
      </div>
    </section>
  </div>
</template>

<script>
import message from "@/components/Message.vue";
import newNote from "@/components/NewNote.vue";
import notes from "@/components/Notes.vue";
import search from "@/components/Search.vue";

export default {
  components: {
    message,
    newNote,
    notes,
    search
  },

  data() {
    return {
      title: "",
      search: "",
      grid: true,
      note: null,
      notes: null
    };
  },

  created() {
    this.notes = this.$store.getters.getNotes;
    this.title = this.$store.getters.getTitle;
  },

  computed: {
    notesFilter() {
      let array = this.notes,
        search = this.search;

      if (!search) return array;

      //Small
      search = search.trim().toLowerCase();
      //Filter
      array = array.filter(function(item) {
        if (item.title.toLowerCase().indexOf(search) !== -1) {
          return item;
        }
      });
      //Error
      return array;
    },
    message() {
      return this.$store.getters.getMessage;
    }
  },

  methods: {
    notUpdateNote(index) {
      this.notes[index].title = this.notes[index].title;
    }
  }
};
</script>
