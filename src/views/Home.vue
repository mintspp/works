<template>
  <div>
    <div
      class="screen"
      style="justify-content: center; align-items: center"
      align="center"
    >
      <b-card
        @submit.prevent="login"
        class="cardlogin"
        style="background-color: #2e4a62; padding: 0px; color: white"
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
                <b-form-input
                  type="search"
                  placeholder="Username"
                  v-model="USERNAME"
                ></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mb-2" style="margin-top: 20px">
                <b-input-group-prepend is-text>
                  <b-icon icon="lock-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  placeholder="Password"
                  type="password"
                  v-model="PASSWORD"
                ></b-form-input>
              </b-input-group>
            </div>

            <div>
              <button
                class="buttonL"
                @click="login()"
                type="submit"
                style="margin-top: 10px"
              >
                <b>LOGIN</b>
              </button>
              <br />
              <a style="margin-top: 10px" @click="goRegister()"
                >Create Account ?</a
              >
            </div>
          </b-col>
        </b-row>
      </b-card>
      <b-modal ref="Notpassword" centered hide-footer>
        <div class="d-block text-center">
          <b>รหัสผ่านไม่ถูกต้อง</b>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
const api_url = require("../../utilities/api");
export default {
  data: {
    USERNAME: "",
    PASSWORD: "",
  },
  methods: {
    goRegister() {
      this.$router.push({ path: "/Register" });
    },
    async login() {
      if (this.USERNAME != "" && this.PASSWORD != "") {
        var data = {
          USERNAME: this.USERNAME,
          PASSWORD: this.PASSWORD,
        };
        await axios.post(`${api_url.api_url}/login`, data).then((response) => {
          console.log(response.data);
          var res = response.data[0];
          if (response.data.length > 0) {
            localStorage.setItem("IDMEMBER", res.MEMBER_ID);
            this.$router.push({ path: "/Profile" });
          } else {
            this.$refs["Notpassword"].show();
          }
        });
      } else {
        this.$refs["Notpassword"].show();
      }
    },
  },
};
</script>
<style scoped>
.screen {
  /* padding: 0px 20px; */
  background-color: #f2f2f3;
  height: 100vh;

  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1em;
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