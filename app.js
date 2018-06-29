//friend component
Vue.component('friend', {
    props : {
        friend: Object,
        index : Number,
    },
    template: '#friend-template',
    data() {
        return {
            isEditing : false
        }
    },
    methods : {
       
        friendEdited : function(){
            //prepare the payload and send it in an event
            const editedFriend = {};
            editedFriend.name = this.$props.friend.name;
            editedFriend.location = this.$props.friend.location;
            editedFriend.gender = this.$props.friend.gender;
            editedFriend.description = document.querySelector('#editedDescription').value.trim();
            const id = this.$props.index;
            // sending along the edited friend and its index
            this.$emit('friend-edited', {editedFriend, id});
            this.isEditing = false;
        },

        removeFriend : function(friend){
            this.$emit('remove-friend', friend);
        }
    }
});

// stats component
Vue.component('stats', {
    props: {
        noOfFriends : Number,
    },
    template: '#stats-template',
});

// vm
const vm = new Vue({
    el : "#app",
    data : {
        friends: [],
        addingFriend: false,
        newFriend : {
            name: '',
            gender: '',
            location: '',
            description: ''
        },
    },
    methods: {
       updateFriend: function(payload){
            let friend = payload.editedFriend;
            let index = payload.id;
            this.friends[index] = friend;
       },
       addFriend : function(newFriend){
        //    must make a shallow copy of the reactive object if i am going to clean it up after saving;
        const friend =  {};
        friend.name = newFriend.name;
        friend.gender = newFriend.gender;
        friend.location = newFriend.location;
        friend.description = newFriend.description;

        this.friends.push(friend);
        this.newFriend.name = '';
        this.newFriend.location ='';
        this.newFriend.gender ='';
        this.newFriend.description ='';

        this.addingFriend = false;
    
        },

    },
    computed : {
        noOfFriends : function(){
            return this.friends.length;
        },
        orderedFriends: function(){
            return this.friends.slice(0).reverse()
        }
    }
})