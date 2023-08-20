<template>
  <!--w-100 h-100 col-span-1  flex justify-center
     flex-col border-2 rounded-lg border-black shadow-lg 
    mx-auto p-2-->
    <div class="card col-span-1 mx-auto">   
    <img
                  class="w-100 h-64 object-cover object-center cursor-pointer"
                  :src="product.imageURL"
                  alt="x"
                />
<div class="flex justify-between p-3">
  <div class="bg-gray-500 p-1 rounded-xl text-white"><div class="font-bold text-sm">official store</div> </div>
  <div class="bg-gray-500 p-1 rounded-xl text-white"><div class="font-bold text-sm">stock ready</div>  </div>
</div>
<div class="m-3 flex flex-row items-center justify-between">
  <div class="font-bold text-xl"> {{product.name }}</div> 
  <div class=""> {{product.catagory}}</div>  
</div>
<div class="flex flex-row items-center">
 <div class="p-3 text-sm line-through opacity-50">RP 500.000</div>
 <div class="bg-green-500 rounded-3xl text-white"><div class="p-3 text-base font-bold ">Save 20%</div></div></div>
 <div class="flex justify-between p-3 font-bold">
  <button class=" p-2 rounded-md bg-yellow-500  text-center font-bold ">Add to cart</button>  
  <button  class=" p-2 rounded-md bg-gray-600 text-red-50 text-center font-bold ">Follow</button>  </div>
  </div>
  
</template>
<script>
import '../src/style.css'
export default {
  name: "ProductBox",
  props: ["product"],
  data() {
    return {urrl:"../images/2.jpg"}},
  methods: {
   // showDetails() {
    //  this.$router.push({
    //    name: "ShowDetails",
    //    params: { id: this.product.id },
    //  });
   // },
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

.card {
  @apply
  bg-white text-gray-700
  shadow-lg rounded-md overflow-hidden
}
.body {
  @apply
  bg-white text-gray-700
  w-72
  shadow-lg rounded-md overflow-hidden
}
.badge {
  @apply
px-3 py-1 rounded-full text-xs bg-gray-100
}


#edit-product {
  float: right;
}




</style>
