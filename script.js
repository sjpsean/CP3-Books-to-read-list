let app = new Vue({
    el: '#app',
    data: {
        toRead: [],
        bookTitle: '',
        results: [],
        show: 'all',
    },
    methods: {
        showBooks() {
            this.show = 'all';
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
            this.showBooks();
            this.results = [];
            this.bookTitle = '';
        }
    },
    watch: {
        toRead: () =>{
            this.showBooks();
        },
        bookTitle: (newVal, oldVal) =>{
                this.results = [];
        }
    }



})
