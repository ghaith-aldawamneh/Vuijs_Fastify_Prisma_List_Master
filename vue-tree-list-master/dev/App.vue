/* eslint-disable */
<template>
  <div>
    <!--<button class="m-4 p-2 rounded-md bg-green-600 text-red-50 text-center" 
    @click="addNode">Add Node</button>-->
    <button class="m-4 p-3 rounded-md bg-green-600 text-yellow-50 text-center  font-bold hover:text-black hover:shadow-xl" 
    @click="AddNewMember">Add a new member to the list</button>
    <vue-tree-list
      @click="onClick"
      @change-name="onChangeName"
      @end-edit="onEndEdit"
      @delete-node="onDel"
      @add-node="onAddNode"
      @drop="drop"
      @drop-before="dropBefore"
      @drop-after="dropAfter"
      :model="data"
      default-tree-node-name="new node"
      default-leaf-node-name="new leaf"
      v-bind:default-expanded="false"
    >
      <template v-slot:leafNameDisplay="slotProps"  >
        <span class="font-bold hover:text-red-600 ">
          {{ slotProps.model.name }} <span class="muted hover:text-red-600" v-if="typeof(slotProps.model.count)===typeof(2)"> Count: {{ slotProps.model.count }}</span>
        </span>
      </template>
      <template v-slot:addTreeNodeIcon="slotProps">
        <span class="icon">📂</span>
      </template>
      <template v-slot:editNodeIcon="slotProps">
        <span class="icon">📃</span>
      </template>
      <template v-slot:delNodeIcon="slotProps">
        <span class="icon">✂️</span>
      </template>
      <template v-slot:leafNodeIcon="slotProps">
        <span class="icon">📦</span>
      </template>
      <template v-slot:treeNodeIcon="slotProps">
        <span class="icon">
          {{
            slotProps.model.children && slotProps.model.children.length > 0 && !slotProps.expanded
              ? '📕'
              : '📖'
          }}</span
        >
      </template>
    </vue-tree-list>
    <Popup v-if="TogglePopup.buttonTrigger"
    :TogglePopup="()=>TogglePopupFunc()"
    :PupupFunc="()=>PupupFunc()"
    ><h1>{{Popup_mes}}</h1></Popup>
    <Popup_config v-if="TogglePopup.configTrigger"
    :TogglePopupFunc="()=>Pupup_configFunc()"
    :categories="categories_total"
    :Fetchdata="()=>Fetchdata()"
    ><h1 class="font-bold text-center text-purple-900 text-3xl">Add A new Member</h1></Popup_config>
    <pre>
      <div class="w-100 h-100 grid grid-cols-3 lg:grid-cols-4 gap-3">
<div v-for=" index in this.Products_size" :key="index" class=" col-span-1 pt-3 justify-content-around d-flex ">
  <ProductBox :product="Products[index-1]"/>
</div>
</div>
    </pre>
  </div>
</template>
<script>
import { VueTreeList, Tree, TreeNode } from '../src'
import env from '../helpers/index'
import {deleteProdcate} from '../access/fetch'
import ProductBox from '../components/ProductBox.vue'
import Popup from '../components/Popup.vue'
import Popup_config from '../components/Popup_config.vue'
import { convertToCustomObjects_value} from '../helpers/convertToCustomObjects'
export default {
  components: {VueTreeList,ProductBox,Popup,Popup_config},
  data() {
    return {
      categories_total:[],
      TogglePopup:{
    buttonTrigger: false,
    configTrigger: false,
  },
  Popup_mes:"Do you want to confirm this ?",
  FUNC:()=>{return true},

      Products:[
{name:'Electronic plugin',catagory:'Electronics',imageURL:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdwcW2XGV6A7gZK_C1BT9a-QJ-qmxaj2mWOBWauWMXMw&s'},
{name:'sandwish',catagory:'food',imageURL:'data:image/jpeg;base64,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'},
{name:'mobile phone htc pro',catagory:'Tech',imageURL:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIpLDdfIq4aSuaJyuE8mdgdxmEVdneuuVI0_FDoiHElHHsgsUqh_QwHbxUqPqhpHj-bWM&usqp=CAU'},
{name:'pen',catagory:'Stationery',imageURL:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQIDBAYHAQj/xAA5EAABAwMCAgcGAwgDAAAAAAABAAIDBAUREiEGMRNBUWFxgZEHIiMyQsEzUrEUFSRDcoKi8HOTof/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgQD/8QAHREBAQACAwADAAAAAAAAAAAAAAECMQMEERIhMv/aAAwDAQACEQMRAD8A7iiIgIiICIiAiIgIiILNXUw0dLLU1MjY4YWF8j3cmtAySvm+4XaTibiGu4iqdQjlPR0jHfy4W/KPPme8lb/7beIXGGm4VoZCJavEtaWn5YQdmn+oj0HeuY18zaamEMewDcYCIxKyZ1VUiNu+SugcNULbVaXVkgxI4aYvHtWpcIWp9wrmucNs7k9S6TRUYvt8p7dCCKKnGXkH6Bz9T+q0lbN7P7S6Chdcqlvx6r8PP0x9Xrz9FtypjaGMDGgNa0YAHIBVLLUEREBERAREQEREBYF8utNZLTV3Otfpp6aIyPPWcdQ7ydgs9cr9u9ybJb7dYKX4lZUzCoczXhojZn5u4k7eB7EHMzWVFyray+XM/wAXWvMhH5G/S0dwGB5KJdrr63QOWd1Vc7i6Fop6iF8EnLDuR8wpng22dNMJ5R7o94lVG2WmFtotGQMSyjA8F0zgizm2WlsszcVNViSTI3aPpb/vWStQ4Wt378vodIzNHSYc4HkT9LfXPouohKk369REUaEREBERAREQEREFqpnipaeWoqHtjhiYXve44DWgZJK+dqy6v4hvdw4jqAWsmPR0zXfRA3Zvrz8SVvftn4gL4oOFaGTE1ZiWtcD8kAOQ3xcR6A9q5hd6lkcbKWAYY0AABBYbD+9KzontD2E7jC3Gh4duNsfR0trc2cVhDDTPOHxgnmHdYAySDvz3WJwdbWxN/bKhvutGfE9i6rwPbnPa+81Q+JOC2AH6Y+3zx6AdqrO0xwzZ2WW1spsh0pOuV4+px+3UpZEUaEREBERAREQEREBQnGHEtFwrZJrjXOyR7kMIPvTSHk1v+7DJU2tO9pXDltvdqZWV0j4am3an0srN/edgadPJ2rDQlvmzbij6mpe+ru90eH3Gtf0kzuoHqaO4DAHgo+2QPuNwBO7cqriAVtO9rKqmkiaTgPLfdJ8VsXClCIIRK8b4zukss9iZS47bZZLX+8KyltUYLYvnnI6mDn9h5rrUbGRxtZG0NY0ANaBsAOpaxwFbf2e2urpW/GrCCM9UY+X13PmFtKtIIiKKIiICIiAiIgIiIPCufcR3R17ubaalOqkp36WEcpZeRd4DfHmpbjS8zs1We3tf074elqZWfyYSdPkXHIHYAStYoKmntclMx8chmqWyNpAyMlvuAai49XMALh7fJfPhHV18J+6zbnBTyQtt72NkghGZMjm5ZVv4EgktkZbUS00sgLi0NBaGnkMbb4S1URq62GF2S1x1yk9YG59St7AAGAnSwslyOzZfpTDEyGJkUTdLGNDWgdQHJVoi7nKIvCQOeyoMzRy38EFxFZMrjyGFTknmSgyEREBEXmUHqIiDnftTvzLJTSwUeG3CviDC8c2sGRn9VicISS8URuqhGYGwRsjJcMMzjk3HmfMLXvaXDLd/aFJR0zHSyRxRQiNoySSNX6OHkuncOW2ns1mgoQ3pC1vxNsBzjzK8+Tix5Nt4Z3HS9w1S9HHLUkZ1u0sPa0dY8VNOe1vzOAWGZHvaGMZpA5BqqZTPO7sBawxmE8jOWVyvtXXVLfpBKtume7sCuCmb+Yq42NjeTQtIxmtc45AKuCF3WcLIRBbbEBz3VeAOpeogKGuFzq3XI2u1QxGpEYllnqCejhaSQPdG7ySDsCBtuRtmZWNV0FHWtDa2kgqAOQmjD8eqCPfbIyNd2ulRP2gzdBGPBrMbeJKxXng+F2l5s+s/mMbnH7qVjs1qiOYrZRMx+WnYPsse5WGnuOGyVNbDCBgw0s5hafHTgn1QQ9TeOEqSQRNlMMp+VlJHKxx8NAGVcjrnTgC3M4kLcbHoWtHrOApGj4XtVE0tpo6iMHmG1coB7yNWM96w6/hClr5viVE8VNt8KD3XHxecu9CEF+y8O0tFV1VylM89dW6XTSVGjU3AA0jQABy6uxTWiJgyQ0DtKg5eD7XJRx0uuubEzl/GSOOOzLicDwwrjeHeHbdTB0lBRtii3D6kB+nv1PzhBIOultiOH19Iw9hmaPuvY7nb5DiOupXnsbM0/dRjrxaomH9gpX1IAyDS0+I/+w4j/wAlHPvstwIZRUNMdQ20xmrI7joHRg+MiDbg4EZBBHcvcrULdZrm2rZWshbSS7/ivawDO28UOA8f1SOwpCto7k4tY6WrrDIDno5m0sMfiW/E9NXkgnJZY4W6ppGMb2udgKw24Usn4MvS/wDE0v8A0younsT2v6Vz6aGX88NOHSeckmou9ApqCN0cQZJK+Vw5veACfQAf+IKmO1DOCPEYVSIgIiICIiAiIgx6+GWpo5YYKmSlle3DZo2tLmHtAcCFBQ8KfFbLVXOollac9J0bC4/3PDi3+3StlRBGR2G2tcHywGpkG4fVPdMQe7UTjywpINAGAMDsC9RAREQEREBERB//2Q=='},
{name:'iphone 14',catagory:'Tech',imageURL:'data:image/jpeg;base64,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'},
          ],
          category_size:0,
          Products_size:5,
      newTree: {},
      data: new Tree([])
    }
  },
  created() {
this.Fetchdata()
  },
  mounted(){
    var node = new TreeNode({ name: 'new node', isLeaf: false })
      if (!this.data.children) this.data.children = []
      this.data.addChildren(node)
  },
  methods: {
    Fetchdata(){fetch(env.DB_HOST+'categories').then(res => res.json()).then(
    categories=>{
    this.categories_total=categories
    const children= convertToCustomObjects_value(categories)
    const filteredCategories = children
    this.data.children = filteredCategories
  }
    )},
    TogglePopupFunc(){this.TogglePopup.buttonTrigger=false},
    PupupFunc(){this.FUNC()},
    Pupup_configFunc(){this.TogglePopup.configTrigger=false},
    onDel(node) {
      this.TogglePopup.buttonTrigger=true;
      console.log('onDel', node);
      this.Popup_mes="Do really want to delete this ?"
      this.FUNC=()=>{deleteProdcate(node,()=>this.Fetchdata())};
    },
    AddNewMember() {
      this.TogglePopup.configTrigger=true;
    },
    onEndEdit(params) {
      console.log('onEndEdit', params)
    },
    onChangeName(params) {
      // eslint-disable-next-line no-console
      console.log('onChangeName', params)
    },
    onAddNode(params) {
      // eslint-disable-next-line no-console
      console.log('onAddNode', params)
    },
    onClick(params) {
      // eslint-disable-next-line no-console
      console.log('onClick', params)
    },
    drop: function() {
      // eslint-disable-next-line no-console
      console.log('drop')
    },
    dropBefore: function({ node, src, target }) {
      // eslint-disable-next-line no-console
      console.log('drop-before', node, src, target)
    },
    dropAfter: function({ node, src, target }) {
      // eslint-disable-next-line no-console
      console.log('drop-after', node, src, target)
    },
    addNode() {
      console.log('AddNode')
      var node = new TreeNode({ num:8 ,name: 'new node',isLeaf: false })
      if (!this.data.children) this.data.children = [];
      this.TogglePopup.buttonTrigger=true;
      this.Popup_mes="Do really want to add this ?";
      this.FUNC=()=>{this.data.addChildren(node)};
    },
    
    getNewTree() {
      var vm = this
      function _dfs(oldNode) {
        var newNode = {}
        for (var k in oldNode) {
          if (k !== 'children' && k !== 'parent' && k !== 'products' ) {
            newNode[k] = oldNode[k]
          }
        }
        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = []
          for (var i = 0, len = oldNode.children.length; i < len; i++) {
            newNode.children.push(_dfs(oldNode.children[i]))
          }
        }
        if (oldNode.products && oldNode.products.length > 0) {
          newNode.products = []
          for (var ii = 0, lenn = oldNode.products.length; ii < lenn; ii++) {
            newNode.products.push(_dfs(oldNode.products[i]))
          }
        }
        return newNode
      }
      vm.newTree = _dfs(vm.data)
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
//h-100 w-100 grid m-4 md:mx-8 md:my-6 grid grid-cols-2
// md:grid-cols-3 lg:grid-cols-4
.griddiv{
height: 100%;
width: 100%;
display: grid ;
margin:1rem;
grid-template-columns: repeat(2, minmax(0, 1fr));
}
.button{

font-size: larger;
text-decoration-color: aquamarine;
}
.vtl {
  .vtl-drag-disabled {
    background-color: whitesmoke;
    &:hover {
      background-color: gainsboro;
    }
  }
  .vtl-disabled {
    background-color: #d0cfcf;
  }
}
</style>

<style lang="less" rel="stylesheet/less" scoped>
.icon {
  &:hover {
    cursor: pointer;
  }
}

.muted {
  color: gray;
  font-size: 80%;
}
.muted:hover {
  color: brown;
}

</style>
