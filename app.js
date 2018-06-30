// pluarize mixin
const mix = {
    filters: {
        pluralize: function(value){
            if(value === 0){
                return
            }
            let qualifier = value == 1 ? 'friend' : 'friends';
            return `${value} ${qualifier}`;
        }
    }
}

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
    },
    mixins : [ mix ]
});

// stats component
Vue.component('stats', {
    props: {
        noOfFriends : Number,
    },
    template: '#stats-template',
    mixins : [ mix ],
});

// vm
const vm = new Vue({
    el : "#app",
    data : {
        friends: [
            {
                name: 'Ojezel Ofure Peace',
                gender: 'female',
                location: 'Warri',
                description: 'Ome'
            },
            {
                name: 'Abolarin Oluwasegun Victor',
                gender: 'male',
                location: 'Abuja',
                description: 'My brother'
            },
        ],
        addingFriend: false,
        newFriend : {
            name: '',
            gender: '',
            location: '',
            description: ''
        },
        filter: '',
    },
    methods: {
       updateFriend: function(payload){
            let friend = payload.editedFriend;
            let index = payload.id;
            this.friends[index] = friend;
       },
       addFriend : function(newFriend){
        //    must make a shallow copy of the reactive object if i am going to clean it up after saving;
        const friend =  Object.assign({}, newFriend);

        this.friends.push(friend);
        // clean out the object
        for(let key of ['name', 'location', 'gender', 'description']) this.newFriend[key] =''; 

        this.addingFriend = false;
    
        },
        order: function(group){
            return group.slice(0).reverse();
        },
      
    },
    computed : {
        noOfFriends : function(){
            return this.friends.length;
        },
        filteredFriends: function(){
            let group = this.friends;
            if(this.filter){
                group = group.filter((friend, index) => {
                    return friend.name.toLowerCase().includes(this.filter) ||  friend.location.toLowerCase().includes(this.filter) ||  friend.gender.toLowerCase().includes(this.filter) ||  friend.description.toLowerCase().includes(this.filter);
                })
            }
            return this.order(group);
        }
    }
})