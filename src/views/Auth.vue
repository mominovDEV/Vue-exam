<template>
  <div class="card container mt-5">
    <div class="card-header text-center">
      <h1>LogIn</h1>
    </div>
    <div class="card-body d-flex">
      <input
        type="text"
        placeholder="Name"
        class="form-control"
        v-model="info.name"
      />
      <input
        type="password"
        placeholder="Password"
        class="form-control"
        v-model="info.password"
      />
    </div>
    <div class="card-footer">
      <Btn :title="'success'" @click="savebnt">Sign In</Btn>
    </div>
  </div>
  <template>
    <button @click="toast">Toast it!</button>
  </template>
</template>

<script setup>
import { ref } from "vue";
import Btn from "../components/ui/Btn.vue";
import { useRouter } from "vue-router";
import $http from "../components/plugins/axios";
const router = useRouter();

const info = ref({
  email: "",
  password: null,
});

const savebnt = () => {
  $http
    .post("/admins/login", {
      username: info.value.name,
      password: info.value.password,
    })
    .then((res) => {
      console.log(res.data.roles[0]);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("roles", res.data.roles);

      }
      if (res.data.roles[0] == "admin") {
        console.log(52);
        router.push({ name: "admin" });
      }
      if(res.data.roles[0] == "superadmin"){
        router.push({ name: "superadmin" });

      }
    })
    .catch((err) => {
      toast();
      console.log(err);
    });
};

import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const toast = () => {
  createToast("Name or password is wrong!", {
    position: "top-right",
    type: "danger",
    transition: "bounce",
  });
};
</script>

<style lang="scss" scoped>
.d-flex {
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.form-control {
  width: 50%;
}

.card-footer {
  display: flex;
  justify-content: center;
}
</style>
