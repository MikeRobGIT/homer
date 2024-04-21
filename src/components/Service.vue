<template>
  <component :is="component" :item="item" :proxy="proxy"></component>
</template>

<script>
import { defineAsyncComponent } from "vue";
import Generic from "./services/Generic.vue";
import { parseUrl } from "../mixins/parseUrl";

export default {
  name: "Service",
  props: {
    item: Object,
    proxy: Object,
  },
  computed: {
    component() {
      // Parse URL if needed
      let parsedUrl = parseUrl(this.item.url);

      // Check if additional path needs to be appended
      if (this.item.path) {
        parsedUrl += this.item.path; // Append the additional path, like '/login'
      }

      // Apply parsed URL to the item object
      // eslint-disable-next-line vue/no-mutating-props, vue/no-side-effects-in-computed-properties
      this.item.url = parsedUrl;

      const type = this.item.type || "Generic";
      if (type === "Generic") {
        return Generic;
      }
      return defineAsyncComponent(() => import(`./services/${type}.vue`));
    },
  },
};
</script>
