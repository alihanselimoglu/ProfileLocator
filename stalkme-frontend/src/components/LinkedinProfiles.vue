<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './Navbar.vue';

const profiles = ref([]);

const route = useRoute(); // Access the current route

const fetchData = async () => {
  try {
    const name = route.params.name;
    const response = await fetch(`http://localhost:4000/search/li/${name}`);
    profiles.value = await response.json();
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchData);
</script>

<template>
  <body>
    <Navbar />

    <div v-if="profiles.length > 0" class="container">
      
      <div class="profiles-container">
        
        <div class="profile-count">
          <div v-if="profiles.length === 1">{{ profiles.length }} Profile</div>
          <div v-else>{{ profiles.length }} Profiles</div>
        </div>
        <div v-for="profile in profiles" :key="profile.profileImg">
          <div class="save-button"><button>
            +
          </button></div>
          <a-card>
            <div class="card">
              <div class="profile-header">
                <div class="profile-name">
                  <h2>{{ profile.fullname }}</h2>
                  <p>{{ profile.title }}</p>
                </div>
                <a-avatar class="profile-img" :src="profile.profileImg" />
              </div>
              <p>Company : {{ profile.experience }}</p>
              <p>Education : {{ profile.education }}</p>
              <p>Location : {{ profile.location }}</p>
            </div>
          </a-card>
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

<style scoped>
@keyframes animatedBackground {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
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
}

button {
  background-color: #1398eb;
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
  background: linear-gradient(
    90deg,
    #004970,
    #024f70,
    #05698d,
    #02526d,
    #58bbda,
    #78d2e9,
    #f7f7f7
  );
  background-size: 200% 100%;
  animation: animatedBackground 40s ease infinite; /* Increased duration and eased timing function */
  color: #fff;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.profile-count {
  font-size: 34px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
}

.profile-name > p {
  font-size: 14px !important;
  font-weight: bold;
  margin: 0;
  width: 90%;
}

.profile-name > h2 {
  font-size: 30px !important;
  margin: 0;
  width: 90%;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.profile-header {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #1398eb;
  padding-bottom: 20px;
  justify-content: space-between;
}

.profiles-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0% 10% 0% 10%;
  margin-top: 20px;
}

.profiles-container > div {
  margin: 30px;
}

.card {
  width: 400px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(2, 18, 241);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff; /* White background */
  color: #031d29; /* Dark text color */
}

/* Styling for the title */
.card h2 {
  font-size: 24px; /* Larger font size */
  color: #1398eb; /* Blue title color */
  margin: 0; /* Remove default margin */
}

/* Styling for the subtitle */
.card p {
  font-size: 16px; /* Smaller font size */
  margin: 10px 0; /* Add spacing between paragraphs */
}

/* Styling for the location, company, and education text */
.card p.location,
.card p.company,
.card p.education {
  font-weight: bold; /* Make them bold */
  color: #555; /* Slightly darker text color */
}

.profiles-container > div > a-card {
  width: 100px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
