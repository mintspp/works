<template>
    <div class="screen" align="center">
    <b-card class="cardP" style="max-width: 40rem;">
        <b-row>
            <b-col cols="12" lg="6"><b-img v-bind="mainProps" rounded="circle" src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" style="width:150px"></b-img></b-col>
            <b-col>
                <div style="margin-top: 20px"><b>{{NAME}}</b></div>
                <div align="left">
                    <div style="margin-top: 10px"><b>Username : {{USERNAME}}</b></div>
                    <div style="margin-top: 10px"><b>Password : {{PASSWORD}}</b></div>
                </div>
            </b-col>
        </b-row>
        <button class="buttonP"   @click="$bvModal.show('bv-modal-example')"> <b> Edit</b> </button>
        <div>
 


  <b-modal id="bv-modal-example" hide-footer>
    <template #modal-title>
      Using <code>$bvModal</code> Methods
    </template>
    <div class="d-block text-center">
      <h3>Hello From This Modal!</h3>
    </div>
    <div align="center"> <b-button class="mt-3" @click="$bvModal.hide('bv-modal-example')">Close Me</b-button></div>
   
  </b-modal>
</div>
        
        
    </b-card>
    </div>

</template>
<script>
export default {
  data(){
    return{
      NAME: "",
      LASTNAME:"",
      USERNAME: "",
      PASSWORD: "",


    };
  },
  create(){
    this.checklogin()
  },
  methods: {
    checklogin(){
      var USERNAME = localStorage.getItem("USERNAME")
      if(!USERNAME){
        window.location = "Home.vue"
      }else{
        this.USERNAME = USERNAME
      }
    }
  }
}
</script>
<style>
.screen {
  padding: 100px 20px;
  background-color: #f2f2f3;
  height: 100vh;
}
.buttonP{
    
    
position: absolute;
  top: 165px;
  left: 300px ;
  padding: 8px 20px; 
  font-size: 16px;
  margin: 0px;
  border-radius: 0.375rem;
  border: none;
  background-color: #f5365c;
  color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(224, 224, 224, 0.19);
}

.buttonP:hover {
  transform: translateY(-1px);
}
/* CSS */

.buttonP:focus {
  background-color: #f5365c;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

.buttonP:active {
  background-color: #bd3543;
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  transform: translateY(0);
}
.cardP{
    border-radius: 20px !important;
     box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(253, 253, 253, 0.19);
}
</style>