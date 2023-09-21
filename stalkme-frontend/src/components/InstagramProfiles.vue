<template>
  <body>
    <Navbar />

    <div v-if="profiles.length > 0" class="container">
      <div class="profile-count">
        <div v-if="profiles.length === 1">{{ profiles.length }} Profile</div>
        <div v-else>{{ profiles.length }} Profiles</div>
      </div>
      <div v-for="profile in profiles" :key="profile.username">
        <div class="save-button"><button>
            +
          </button></div>
        <!-- Instagram profile component here -->
        <div class="profile">
          <!-- Profile header -->
          <div class="profile-header">
            <div class="profile-avatar">
              <a-avatar class="profile-img" :src="profile.profileImg" />
            </div>
            <div class="profile-info">
              <h2 class="profile-username">{{ profile.username }}</h2>
            </div>
            <div class="is-hidden-info">
              <div v-if="profile.isHidden" class="private-tag">Private</div>
            </div>
          </div>
          <!-- Bio -->
          <div class="bio-info">
            <p class="profile-bio">{{ profile.bio }}</p>
          </div>
          <!-- Profile stats in footer -->
          <div class="profile-footer">
            <div class="profile-stat">
              <strong>{{ profile.posts }}</strong> Posts
            </div>
            <div class="profile-stat">
              <strong>{{ profile.followers }}</strong> Followers
            </div>
            <div class="profile-stat">
              <strong>{{ profile.followings }}</strong> Following
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="loading-container">
        <div class="loading-spinner">
          <!-- Customize the loading spinner here -->
          <div class="spinner"></div>
        </div>
        <p class="loading-text">Searching profiles...</p>
      </div>
    </div>
  </body>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './Navbar.vue';

const profiles = ref([]);

const route = useRoute(); // Access the current route

const fetchData = async () => {
  try {
    const name = route.params.name;
    const response = await fetch(`http://localhost:4000/search/in/${name}`);
    profiles.value = await response.json();
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchData);
</script>

<style scoped>
@keyframes animatedBackground {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loading-spinner {
  position: relative;
  width: 50px;
  height: 50px;
}

.spinner {
  position: absolute;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff; /* Change the color as needed */
  border-radius: 0%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 16px;
  font-size: 38px;
  font-weight: bold;
  color: #ffffff;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.save-button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-top: 50px;
}

button {
  background-color: #ad0ed4;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 20px 5px 20px;
  font-weight: normal;
  font-size: large;
  cursor: pointer;
}

button:hover {
  background-color: #ff6f61;
}

.spin {
  margin: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 150px;
  background-color: #ffffff;
  background: transparent linear-gradient(90deg, #aa282800 0%, #ffffff 100%) 0%
    0% no-repeat padding-box;
  border-radius: 10px;
  padding: 120px;
}

a-spin {
  margin: 100px;
  display: flex;
}

/* Apply the animation to the body */
body {
  background: linear-gradient(90deg, #ff6f61, #6b5b95, #feb236, #d64161);
  background-size: 200% 100%;
  animation: animatedBackground 40s linear infinite;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.container {
  border-radius: 5px;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* Add these styles for the private tag */
.private-tag {
  background-color: #f1200d; /* Red background color */
  color: #fff; /* White text color */
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 10px;
  font-weight: normal;
  margin-left: 10px; /* Add some space between the tag and the profile info */
}

.profile {
  background: #e5eaf5;
  border: 1px solid #ffffff;
  padding: 20px;
  margin: 0px;
  box-shadow: 6px 6px 6px 6px rgba(183, 0, 255, 0.1);
  width: auto; /* Make the profile width flexible */
  max-width: 600px; /* Limit the maximum width */
  min-width: 350px;
  min-height: 400px; /* Set a minimum height */
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  border-radius: 10px;
}

.profile-count {
  font-size: 34px;
  font-weight: bold;
  color: #fff;
  margin-top: 40px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.bio-info {
  /* ... (other styles) */
  flex-grow: 1; /* Allow the bio section to grow to fill available space */
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-username {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  margin-left: 15px;
}

.profile-bio {
  font-size: 16px;
  color: #777;
  margin: 8px 0;
}

.profile-stats {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 50px;
}

.profile-stat {
  text-align: center;
}

.profile-stat strong {
  font-weight: bold;
  display: block;
}
.profile-footer {
  /* ... (other styles) */
  display: flex;
  justify-content: space-between;
  margin-top: 10px; /* Adjust the margin as needed */
}

/* You can add more styles as needed to match Instagram's design */
</style>
