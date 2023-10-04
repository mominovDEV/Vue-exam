<template>
  <div class="products">
    <products ref="products_modal" />
    <div class="btn-first mb-3">
      <button @click="createItem" class="btn btn-success">Create Product</button>
      <button @click="logOut" class="btn btn-warning">LogOut</button>
    </div>
    <div class="row">
      <div class="col-3 my-2" v-for="(item, index) in items" :key="index">
        <!-- <pre>{{ item }}</pre> -->
        <div class="card">
          <div class="card-header">
            <h1 class="text-center fs-6">{{ item?.name }}</h1>
          </div>
          <div class="card-body">
            <h1 class="fs-3">{{ item?.brand }}</h1>
            <h1 class="fs-3">{{ item?.group }}</h1>
            <p>{{ item?.price }}</p>
            <p>{{ item?.arrival_price }}</p>
            <p>{{ item?.selling_price }}</p>
            <p>{{ item?.description }}</p>
          </div>
          <div class="card-footer">
            <button class="btn btn-info" @click="editItem(item)">
              Edit
            </button>
            <button class="btn btn-danger" @click="deleteItem(item?._id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import http from "../../components/plugins/axios";
import products from "../../components/pages/products.vue";
import { createToast } from "mosha-vue-toastify";

const toastdelete = () => {
  createToast("Successfully deleted! (Reloading...)", {
    position: "top-right",
    type: "success",
    transition: "bounce",
  });
};

const items = ref([]);
const products_modal = ref();
const getCountries = () => {
  http
    .get("products")
    .then((res) => {
      console.log(res);
      items.value = res.data.products;
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteItem = (_id) => {
  http
    .delete(`products/${_id}`)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        toastdelete();
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const createItem = () => {
  products_modal.value.openModal();
  console.log(products_modal.value);
};

const editItem = (_id) => {
  console.log(_id);
  products_modal.value.openModal(_id);
};

const logOut = () => {
  localStorage.removeItem("token");
  location.reload();
};
getCountries();
</script>

<style lang="scss" scoped>
.btn-first {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}
</style>
