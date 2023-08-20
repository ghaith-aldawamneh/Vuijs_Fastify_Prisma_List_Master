<template >
<div class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black bg-opacity-60 ">
<div class="font-bold text-center text-gray-700 text-lg z-20 p-10  flex justify-items-center items-center flex-col">
<form @submit="handleSubmit" enctype="multipart/form-data"
 class="  flex bg-white flex-col p-10 justify-between items-center rounded-xl shadow-lg text-xl mt-12">
  <slot />
  <!-- p-2 w-100 br-->
<div class="flex p-6 justify-between items-center gap-5 m-auto ">
<label for="">Name</label>
<input class="border-4 border-sky-500 hover:bg-gray-100" type="name" v-model="name">

</div>
<div class="flex p-6 justify-between items-center gap-5 m-auto ">
  <label  for="">Parent</label>
  <select class="hover:bg-gray-300 font-bold" v-model="category_data" text="sds">
  <option v-for="cat in categories_total" :value="{ id: cat.id, name: cat.name }" :key="cat.id">{{ cat.name }}</option>
</select></div>
        <div>
    <input type="file" ref="fileInput" accept="image/*" style="display: none" @change="handleFileChange">
    <button class="m-4 p-2 bg-green-600 text-white text-center rounded-md" @click.prevent="openFileInput">Upload Picture</button>
  </div>

<div class="flex p-6 justify-between items-center gap-5 m-auto ">
  <label class=" text-2xl">Type</label>
  <select class="hover:bg-gray-300 font-bold" v-model="role">
 <option value="category">Category</option>
 <option value="product">Product</option>
</select></div>


<div v-if="role === 'product'" class="flex p-6 justify-between items-center gap-5 m-auto ">
<label >Count</label>
<input class="border-4 border-sky-500 hover:bg-gray-100" type="count" v-model="count">
</div>

<div class="flex p-6 justify-between items-center gap-5 m-auto ">
<button class="p-2 bg-green-600 text-white text-center rounded-md">Submit</button>
<button class="p-2 bg-red-600 text-white text-center rounded-md" @click.prevent="deactivate" >Cancel</button></div>


</form>

</div>
  </div>
</template>
<script>
import '../src/style.css'
import {AddNewMember} from '../access/fetch'
import axios from 'axios';
import env from '../helpers/index'
export default {
  name: "Popup_config",
  props: ["TogglePopupFunc","categories","Fetchdata"],
  data() {
    return {
      name:'',
      count:null,
      role:'category',
      picture:"",
      categories_total: this.categories,
      category_data:{},
      selectedFile: null,
    }
  },
  methods: {
    async handleSubmit(){
      //this.uploadImage()
      AddNewMember({
      "name":this.name,
      "picture":this.picture,
      },{"role":this.role,
      "category_data":this.category_data,"count":parseInt(this.count)},this.Fetchdata);
      this.TogglePopupFunc();
    },
    deactivate(){
      this.TogglePopupFunc();
    },
      openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
      uploadImage() {
      if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile,this.selectedFile.name);
      axios.post(env.DB_HOST+'uploadphoto', formData, {headers: {'Content-Type': 'multipart/form-data','content-type':'*'}// Set the correct content type
    }).then(response => {console.log('Image uploaded successfully',response);//alert('Image uploaded successfully');
    this.selectedFile = null;}).catch(error => {console.error('Error uploading image:xxx', error);});}     // Handle error here
  }
  },





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
