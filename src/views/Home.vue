<template>
  <div class="screen" align="center">
    <b-card
    @submit.prevent="login"
      class="cardlogin"
      style="
        background-color: #2e4a62;
        margin-top: 100px;
        padding: 0px;
        color: white;
      "
    >
      <b-row>
        <b-col cols="12" lg="6" style="background-color: ">
          <img
            src="https://cdn-icons-png.flaticon.com/512/476/476863.png"
            alt=""
            width="200px"
            height="200px"
            style="margin-top: 5px"
          />
        </b-col>
        <b-col cols="12" lg="6">
          <h3 style="color: #fff; margin-top: 20px">Member Login</h3>

          <div class="mt-2" align="left">
            <b-input-group size="sm" class="mb-2" style="margin-top: 25px">
              <b-input-group-prepend is-text>
                <b-icon icon="person-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input type="search" placeholder="Username" v-model="USERNAME"
               ></b-form-input>
            </b-input-group>
            <b-input-group size="sm" class="mb-2" style="margin-top: 20px">
              <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input type="search" placeholder="Password" v-model="PASSWORD"></b-form-input>
            </b-input-group>
          </div>

          <div>
            <button class="buttonL" type="submit" style="margin-top: 10px">
              <b>LOGIN</b>
            </button>
            <br>
            <a style="margin-top: 10px" @click="goRegister()">Create Account ?</a>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  data: {
    USERNAME: "",
    PASSWORD: "",
    
  },
  methods:{
    goRegister(){
      this.$router.push({ path: "/Register" });
    },
    login(){
      if(this.USERNAME === THIS.USERNAME && this.PASSWORD === THIS.PASSWORD){
        localStorage.getItem("USERNAME", this.USERNAME)
        window.location="Profile.vue"
      }else{
        alert("ไม่ถูกต้อง")
      }
    }
  }
   
  
};
</script>
<style>
.screen {
  padding: 0px 20px;
  background-color: #f2f2f3;
  height: 100vh;
}
.buttonL {
  padding: 10px 20px;
  font-size: 16px;
  margin: 0px;
  border-radius: 0.375rem;
  border: none;
  background-color: #f5365c;
  color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(224, 224, 224, 0.19);
}

.buttonL:hover {
  transform: translateY(-1px);
}
/* CSS */

.buttonL:focus {
  background-color: #f5365c;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

.buttonL:active {
  background-color: #bd3543;
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  transform: translateY(0);
}
.cardlogin {
  
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(253, 253, 253, 0.19);
}
</style>