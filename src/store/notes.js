export default {
  state: {
    title: "Notes App",
    message: null,
    note: {
      title: "",
      descr: "",
      importance: "standart"
    },
    importance: [
      {
        value: "standart",
        title: "Standart"
      },
      {
        value: "important",
        title: "Important"
      },
      {
        value: "very-important",
        title: "Very important"
      }
    ],
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
  },
  mutations: {
    addNote(state, payload) {
      let { title, descr, importance } = payload;

      state.notes.push({
        title,
        descr,
        importance,
        date: new Date(Date.now()).toLocaleString()
      });
    },
    setMsg(state, payload) {
      state.message = payload;
    },
    removeNote(state, payload) {
      state.notes.splice(payload, 1);
    },
    updateNote(state, payload) {
      console.log(payload);
      let { index, text } = payload;
      state.notes[index].title = text;
      state.notes[index].date = new Date(Date.now()).toLocaleString();
    }
  },
  actions: {
    addNote({ commit }, note) {
      commit("addNote", note);
    },
    removeNote({ commit }, index) {
      commit("removeNote", index);
    },
    updateNote({ commit }, payload) {
      commit("updateNote", payload);
    },
    changeMessage({ commit }, msg) {
      commit("setMsg", msg);
    }
  },
  getters: {
    getTitle(state) {
      return state.title;
    },
    getNotes(state) {
      return state.notes;
    },
    getMessage(state) {
      return state.message;
    },
    getNote(state) {
      return state.note;
    },
    getImportance(state) {
      return state.importance;
    }
  }
};
