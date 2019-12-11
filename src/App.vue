<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <!-- message -->
          <message v-if="message" :message="message" />

          <!-- new note -->
          <newNote :note="note" @addNote="addNote" />

          <div class="note-header" style="margin: 36px 0">
            <!-- title -->
            <h1>{{ title }}</h1>

            <!-- search -->

            <search :value="search" placeholder="Find your note" @search="search = $event" />
            <!-- icons controls -->
            <div class="icons">
              <svg
                :class="{active: grid}"
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
                :class="{active: !grid}"
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
          <notes
            :notes="notesFilter"
            :grid="grid"
            @remove="removeNote"
            @update="updateNote"
            @cancelEdit="notUpdateNote"
          />
        </div>
      </section>
    </div>
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
      title: "Notes App",
      search: "",
      message: null,
      grid: true,
      note: {
        title: "",
        descr: "",
        importance: "standart"
      },
      notes: [
        {
          title: "First node",
          descr: "Description for first note",
          importance: "very-important",
          edit: false,
          date: new Date(Date.now()).toLocaleString()
        },
        {
          title: "Second node",
          importance: "important",
          descr: "Description for second note",
          edit: false,
          date: new Date(Date.now()).toLocaleString()
        },
        {
          title: "Third node",
          importance: "standart",
          descr: "Description for third note",
          edit: false,
          date: new Date(Date.now()).toLocaleString()
        }
      ]
    };
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
    }
  },

  methods: {
    addNote() {
      let { title, descr, importance } = this.note;

      if (title === "") {
        this.message = "title can`t be blank!";
        return false;
      }

      this.notes.push({
        title,
        descr,
        importance,
        date: new Date(Date.now()).toLocaleString()
      });

      this.message = null;
      this.note.title = "";
      this.note.descr = "";
      this.note.importance = "standart";
    },
    removeNote(index) {
      this.notes.splice(index, 1);
    },
    updateNote(index, text) {
      this.notes[index].title = text;
      this.notes[index].date = new Date(Date.now()).toLocaleString();
    },
    notUpdateNote(index) {
      console.log(this.notes[index].title);
      this.notes[index].title = this.notes[index].title;
    }
  }
};
</script>

<style></style>
