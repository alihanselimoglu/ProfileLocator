<template>
    <nav class="navbar">
      <!-- Home Button -->
      <router-link to="/" class="nav-item">
        Home
      </router-link>
  
      <!-- Title -->
      <div class="nav-title">
         STALK ME
      </div>
  
      <!-- Profile Button -->
      <router-link to="/profile" class="nav-item profile">
        Profile
      </router-link>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    background-color: #f199a8;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
  }
  
  .nav-item {
    text-decoration: none;
    color: white;
    margin: 0 10px;
    font-weight: bold;
    transition: color 0.3s ease; /* Add transition for color change */
  }

  .nav-item:hover {
  color: #ff6f61; /* Change text color on hover */
}

.nav-item.profile:hover {
    background-color: #ff6f61; /* Change background color on hover */
    }

  .nav-item.profile {
    text-decoration: none;
    color: white;
    margin: 0 10px;
    font-weight: bold;
    background-color: #a28089;
    border-radius: 5px;
    padding: 3px 10px 3px 10px;
    transition:  0.3s ease; /* Add transition for color change */
  }
  
  .nav-title {
    flex-grow: 1;
    text-align: center;
    font-size: 24px;
  }
  </style>
  