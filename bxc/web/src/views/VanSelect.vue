<template lang="pug">
    div
        van-field(:label="label" :value="value" :required="required" :placeholder="placeholder"  readonly clickable @click="showPicker = true" :label-width="labelWidth" :left-icon="leftIcon")
        van-popup(v-model="showPicker" position="bottom")
            van-picker(show-toolbar :columns="options" @cancel="showPicker = false" @confirm="onConfirm" :default-index="defaultIndex")
</template>
<script>
export default {
  name: "VanSelect",
  props: {
    labelWidth: {
      type: Number,
      default: 90
    },
    leftIcon: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: []
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  data() {
    return {
      showPicker: false,
      defaultIndex: 0
    };
  },
  created() {
    this.defaultIndex = this.options.indexOf(this.value);
  },
  methods: {
    onConfirm(value) {
      this.$emit("change", value);
      this.showPicker = false;
    }
  }
};
</script>