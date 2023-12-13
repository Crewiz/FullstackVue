<template>
    <div>
      <navigationBar />
      <div v-if="isAuthenticated && user">
        <div class="profile">
          <div class="profile-header">
            <div class="avatar-container">
              <div v-if="user.avatar" class="avatar">
                <img :src="user.avatar" alt="Profile Picture">
              </div>
              <div v-else class="initials-avatar">
                {{ userInitials }}
              </div>
            </div>
            <h1>{{ fullName }}</h1>
            <h3>{{ user.email }}</h3>
          </div>

          <div class="profile-posts">
            <h2>Inlägg</h2>
            <ul class="post-container">
              <li v-for="post in user.posts" :key="post.id">
                {{ post.title }}
                <!-- Add post details here if needed -->
              </li>
              <li>
                <v-card
                width="400"
                title="This is a title"
                subtitle="This is a subtitle"
                text="This is content"
                ></v-card>
              </li>
              <li>
                <v-card
                width="400"
                title="This is a title"
                subtitle="This is a subtitle"
                text="This is content"
                ></v-card>
              </li>
              <li>
                <v-card
                width="400"
                title="This is a title"
                subtitle="This is a subtitle"
                text="This is content"
                ></v-card>
              </li>
              <li>
                <v-card
                width="400"
                title="This is a title"
                subtitle="This is a subtitle"
                text="This is content"
                ></v-card>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Du är inte inloggad.</p>
        <!-- Eventuell annan logik eller meddelande för användare som inte är inloggade -->
      </div>
    </div>
  </template>
  
  <script>
  import navigationBar from '../layout/navigationBar.vue';
  import useAuthStore from '../../stores/authStore';
  
  export default {
    name: 'userProfile',
    components: {
      navigationBar,
    },
    data() {
      return {
        userInitials: '',
      };
    },
    computed: {
      isAuthenticated() {
        return useAuthStore().isAuthenticated;
      },
      user() {
        return useAuthStore().user || {};
      },
      fullName() {
        // Display full name (if both first and last name are available)
        return `${this.user.firstName || ''} ${this.user.lastName || ''}`.trim();
      },
    },
    watch: {
      user: {
        immediate: true,
        handler(newUser) {
          // Update initials when the user changes
          console.log('User object in watch:', newUser);
          this.updateUserInitials(newUser);
        },
        deep: true, // Watch changes inside the user object
      },
    },
    methods: {
      updateUserInitials(user) {
        // Create initials from first and last name
        if (user.firstName && user.lastName) {
          this.userInitials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
  }
  
  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    margin: 50px 0 20px 0;
  }

  .profile-posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    margin: 50px 0 20px 0;
    width: 100%;
    min-height: auto;
  }

  .profile-posts li {
    list-style: none;
    margin: 25px;
  }

  .post-container {
    display: flex;
  }
  
  .avatar-container {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .initials-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 24px;
    color: #fff;
    background-color: #007BFF; /* You can change the background color here */
    border-radius: 50%;
  }
  </style>
  