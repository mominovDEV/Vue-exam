<template>
  <AppModal v-model="dialog">
    <!-- <pre>{{ forms }}</pre> -->
    <h1 v-if="!forms._id">Add Product</h1>
    <h1 v-else>Edit Product</h1>
    <Form>
      <!-- 1 -->
      <Field
        rules="required"
        :modelValue="forms.name"
        v-slot="{ errors }"
        name="Name"
      >
        <input
          type="text"
          v-model="forms.name"
          class="form-control my-2"
          placeholder="Name"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <!-- 2 -->
      <Field
        rules="required"
        :modelValue="forms.brand"
        v-slot="{ errors }"
        name="brand"
      >
        <input
          type="text"
          v-model="forms.brand"
          class="form-control my-2"
          placeholder="brand"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <!-- 3 -->
      <Field
        rules="required"
        :modelValue="forms.group"
        v-slot="{ errors }"
        name="group"
      >
        <input
          type="text"
          v-model="forms.group"
          class="form-control my-2"
          placeholder="group"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <!-- 4 -->
      <Field
        rules="required"
        :modelValue="forms.price"
        v-slot="{ errors }"
        name="price"
      >
        <input
          type="number"
          v-model="forms.price"
          class="form-control my-2"
          placeholder="price"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <!-- 5 -->

      <Field
        rules="required"
        :modelValue="forms.arrival_price"
        v-slot="{ errors }"
        name="arrival_price"
      >
        <input
          type="number"
          v-model="forms.arrival_price"
          class="form-control my-2"
          placeholder="arrival_price"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <!-- 6 -->

      <Field
        rules="required"
        :modelValue="forms.selling_price"
        v-slot="{ errors }"
        name="selling_price"
      >
        <input
          type="number"
          v-model="forms.selling_price"
          class="form-control my-2"
          placeholder="selling_price"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <!-- desc -->
      <Field
        rules="required"
        :modelValue="forms.description"
        v-slot="{ errors }"
        name="description"
      >
        <input
          type="text"
          v-model="forms.description"
          class="form-control my-2"
          placeholder="description"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <button class="btn btn-success" type="submit" @click="save">save</button>
    </Form>
  </AppModal>
</template>

<script setup>
import AppModal from "../ui/app-modal.vue";
import { ref, watch } from "vue";
import http from "../plugins/axios";
import { createToast } from "mosha-vue-toastify";
import { Form, Field } from "vee-validate";
const dialog = ref(false);

const toastcreate = () => {
  createToast("Successfully created! (Reloading...)", {
    position: "top-right",
    type: "success",
    transition: "bounce",
  });
};

const toastedit = () => {
  createToast("Successfully edited! (Reloading...)", {
    position: "top-right",
    type: "warning",
    transition: "bounce",
  });
};

const forms = ref({
  name: "",
  brand: "",
  group: "",
  price: null,
  arrival_price: null,
  selling_price: null,
  description: "",
});

watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});
const openModal = (value) => {
  if (value) forms.value = { ...value };
  dialog.value = true;
};

const save = (e) => {
  e.preventDefault();
  try {
    if (!forms.value._id) {
      http
        .post("products/add", {
          name: forms.value.name,
          brand: forms.value.brand,
          group: forms.value.group,
          price: forms.value.price,
          arrival_price: forms.value.arrival_price,
          selling_price: forms.value.selling_price,
          description: forms.value.description,
        })
        .then((res) => {
          console.log(res);
          toastcreate();
          setTimeout(() => {
            location.reload();
          }, 3000);
        });
    } else {
      http
        .patch(`products/update/${forms.value._id}`, {
          name: forms.value.name,
          brand: forms.value.brand,
          group: forms.value.group,
          price: forms.value.price,
          arrival_price: forms.value.arrival_price,
          selling_price: forms.value.selling_price,
          description: forms.value.description,
        })
        .then((res) => {
          console.log(res);
          toastedit();
          setTimeout(() => {
            location.reload();
          }, 3000);
        });
    }
  } catch (err) {
    console.log(err);
  }
};
defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>