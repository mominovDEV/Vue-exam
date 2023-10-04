export default {
  path: "/superadmin",
  name: "superadmin",
  component: () => {
    return import("../views/superadmin/Superadmin.vue");
  },
  children: [
    {
      path: "/userlar",
      name: "userlar",
      component: () => {
        return import("../views/superadmin/Countries.vue");
      },
    },
  ],
};
