//friend component
Vue.component('friend', {
    props : ['friend'],
    template: '#friend-template',
    data() {
        return {
            isEditing : false
        }
    },
    methods : {
        editFriend : function(){
            this.isEditing = true;
            
        },
        friendEdited : function(friend){
            this.$emit('friend-edited', friend);
            this.isEditing = false;
        },

        removeFriend : function(friend){
            this.$emit('remove-friend', friend);
        }
    }
});

// stats component
Vue.component('stats', {
    props: ['noOfFriends'],
    template: '#stats-template',
});

// vm
const vm = new Vue({
    el : "#app",
    data : {
        friends: [
            { 
                name:'Ojezele Ofure Peace',
                gender: 'female',
                location: 'Warri',
                description:'My one true love'
            },

            { 
                name:'Abolarin Oluwasegun Victor',
                gender: 'male',
                location: 'Abuja',
                description:'My elder brother'
            },
            { 
                name:'Tony Michael',
                gender: 'male',
                location: 'Abuja',
                description:'My brother'
            }
        ]
    },
    methods: {
       
    },
    computed : {
        noOfFriends : function(){
            return this.friends.length;
        }
    }
})