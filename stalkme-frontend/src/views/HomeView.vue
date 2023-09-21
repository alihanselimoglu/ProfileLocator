<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';

const nameLinkedin = ref('');
const nameInstagram = ref('');
const router = useRouter();

const onFinishLinkedin = () => {
  if (nameLinkedin.value) {
    console.log(nameLinkedin.value);
    router.push(`/search/li/${nameLinkedin.value}`);
  }
};

const onFinishInstagram = () => {
  if (nameInstagram.value) {
    router.push(`/search/in/${nameInstagram.value}`);
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
</script>
<template>
  <body>
    <Navbar />

    <div class="inputs-container">
      <!-- LinkedIn Form -->
      <div class="form-container linkedin-form">
        <div class="input-title linkedin-title">
          Whose Linkedin profile do you want?
        </div>
        <a-form
          name="linkedin"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @submit="onFinishLinkedin"
          @finishFailed="onFinishFailed"
        >
          <a-form-item name="nameLinkedin" class="centered-form-item">
            <a-input class="custom-input" v-model:value="nameLinkedin" />
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Search</a-button>
          </a-form-item>
        </a-form>
      </div>

      <div class="or">OR</div>

      <!-- Instagram Form -->
      <div class="form-container instagram-form">
        <div class="input-title instagram-title">
          Whose Instagram profile do you want?
        </div>
        <a-form
          name="instagram"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @submit="onFinishInstagram"
          @finishFailed="onFinishFailed"
        >
          <a-form-item name="name" class="centered-form-item">
            <a-input class="custom-input" v-model:value="nameInstagram" />
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Search</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </body>
</template>


<style scoped>


/* Animation for the background */
@keyframes animatedBackground {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}

.centered-form-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Customize input width */
.custom-input {
  width: 100%; /* Adjust the width as needed */
  margin-left: 30px;

}

/* Apply the animation to the body */
body {
  /* background: linear-gradient(90deg, #ff6f61, #6b5b95, #feb236, #d64161); */
  background-size: 200% 100%;
  background-color: #d0bdf4;
  animation: animatedBackground 10s linear infinite;
}
.inputs-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-container {
  width: 30%;
  height: 70%;
  border-radius: 10px;
  padding: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 40px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.instagram-form {
  border: #ae3fe2 12px solid;
}

.linkedin-form {
  border: #38aae7 12px solid;
}

.linkedin-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #0077b6;
}

.input-title {
  text-align: center;
}

.instagram-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #bc2a8d;
}

a-form-item {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center; 
  
}

a-button {
  margin-top: 16px;
  background-color: #1398eb;
  color: #fff;
  border: none;
  font-weight: bold;
}

.or {
  font-size: 20px;
  font-weight: bold;
  color: #555;
  margin: 20px 0;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 7px 15px;
}
</style>
