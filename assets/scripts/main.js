const { createApp } = Vue

createApp({
    data() {
        return {
            eventsURL: "../assets/data/amazing.json",
            data: [],
            events: [],
            eventsCard: [],
            five_events: [],
            categories: [],
        }
    },

    created(){
        fetch(this.eventsURL)
            .then(response => response.json())
            .then(data => {
                this.data = data
                this.events = data.events
                this.eventsCard = data.events
                this.five_events = this.five_random_events(data.events)
                this.categories = this.allCategories(data.events)
            })
    },

    methods:{
        /**
         * select five random values from the events
         * @param {Array} events array of events
         * @returns Array of event objects
         */
        five_random_events(events){
            const random_numbers = []
            const five_events = []
            for (let i = 0; i < 5; i++ ){
                let number
                do{
                    number = Math.floor(Math.random() * events.length)
                }while(random_numbers.indexOf(number) !== -1)
                random_numbers.push(number)
            }
            random_numbers.forEach((number)=>{
                five_events.push(events[number])
            })
            return five_events
        },

        /**
         * all catogories not duplicated
         * @param {array whit object event} events it's events to filter categories
         * @returns array of categories
         */
        allCategories(events) {
            const arrayCategories = []
            events.forEach(event => {
                if (arrayCategories.indexOf(event.category) === -1)
                    arrayCategories.push(event.category)
            })
            arrayCategories.sort()
            return arrayCategories
        },

        search(){

        }
    },

    mounted(){
    },

}).mount('#app')