<template >
  
  <div class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black bg-opacity-60 ">
<div class="z-20 p-10  flex justify-items-center items-center flex-col">

<div class="  flex bg-white flex-col p-6 justify-between items-center rounded-xl shadow-lg text-xl mt-32">
  <slot />
  <div class=" flex bg-white p-6 justify-between items-center gap-5">
<button class="p-2 bg-green-600 text-white text-center rounded-md" @click="activate">Confirm</button>
<button class="p-2 bg-red-600 text-white text-center rounded-md" @click="deactivate" >Cancel</button></div>
</div></div>
  </div>
</template>
<script>
import '../src/style.css'
export default {
  name: "Popup",
  props: ["TogglePopup","PupupFunc"], 
  data() {
    return {urrl:"../images/2.jpg"}},
  methods: {
    activate(){this.PupupFunc();this.TogglePopup();},
    deactivate(){this.TogglePopup();}},
};
</script>
<style scoped>


flex h-100 w-100 bg-black
.flexhw{
  display: flex;
  height: 100%;
width: 100%;
}

.embed-responsive .card-img-top {
  object-fit: cover;
}

a {
  text-decoration: none;
}

.card-title {
  color: #484848;
  font-size: 1.1rem;
  font-weight: 400;
}

.card-title:hover {
  font-weight: bold;
}

.card-text {
  font-size: 0.9rem;
}

#edit-product {
  float: right;
}
</style>
