/**
 * used Google Books API
 * Studied Vue-todo part from the class and used it
 * name: Sungjin Park
 */

let app = new Vue({
  el: '#app',
  data: {
    toRead: [],
    bookTitle: '',
    results: [],
    show: 'all',
  },
  methods: {
    deleteRead() {
      this.toRead = this.toRead.filter(item => {
        return !item.completed;
      })
    },
    searchBook() {
      let url = 'https://www.googleapis.com/books/v1/volumes?q=' + this.bookTitle;
      axios.get(url).then(response => {
        console.log(response);
        console.log(response.data.items[0].volumeInfo.subtitle);
        console.log(response.data.items.length);
        this.results = [];
        this.results.push({
          title: response.data.items[0].volumeInfo.title,
          subtitle: response.data.items[0].volumeInfo.subtitle,
          author: response.data.items[0].volumeInfo.authors[0],
          completed: false,
        });
        for (let i = 1; i < response.data.items.length; i++) {
          if (response.data.items[i].volumeInfo.title != this.results[0].title) {
            this.results.push({
              title: response.data.items[i].volumeInfo.title,
              subtitle: response.data.items[i].volumeInfo.subtitle,
              author: response.data.items[i].volumeInfo.authors[0],
              completed: false,
            });
          }
        }
        console.log(this.results.title);
        console.log(this.results.subtitle);
        console.log(this.results.author);
      });
    },
    selectBook(item) {
      this.toRead.push(item);
      this.results = [];
      this.bookTitle = '';
    },
    deleteBook(item) {
      this.toRead.splice(this.toRead.indexOf(item),1);
    },
    dragItem(item) {
      this.drag = item;
    },
    dropItem(item) {
      const indexItem = this.toRead.indexOf(this.drag);
      const indexTarget = this.toRead.indexOf(item);
      this.toRead.splice(indexItem, 1);
      this.toRead.splice(indexTarget, 0, this.drag);
    },
  },
  watch: {
    toRead: () => {
      this.bookTitle = '';
    },
    bookTitle: (newVal, oldVal) => {
      if(newVal == ''){
        this.results = [];
      }
    }
  },



})
