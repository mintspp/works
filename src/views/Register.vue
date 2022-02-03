<template>
  <div>
    <div
      class="screen"
      style="justify-content: center; align-items: center"
      align="center"
    >
      <b-card class="card1" style="max-width: 30rem; background-color:#314e68 ; color: #fff">
        <b-col>
          <div>
            <div align="right">
              <b-icon
                icon="x-circle"
                scale="2"
                variant="danger"
                @click="Home()"
              ></b-icon>
            </div>
            <div><h5>Create Account</h5></div>
            <div class="mt-2" style="margin-top: 20px">
              <div style="margin-top: 20px">
                <b-form-input
                  v-model="NAME"
                  placeholder="First Name"
                ></b-form-input>
              </div>

              <div style="margin-top: 20px">
                <b-form-input
                  v-model="LASTNAME"
                  placeholder="Last Name"
                ></b-form-input>
              </div>

              <div style="margin-top: 20px">
                <b-form-input
                  v-model="Word"
                  @keydown="wordKeydown($event)"
                  maxlength="12"
                  placeholder="Username"
                ></b-form-input>
              </div>

              <div style="margin-top: 20px">
                <b-form-input
                  v-model="PASSWORD"
                  minlength="6"
                  maxlength="20"
                  placeholder="Password"
                  v-on:keypress="NumbersOnly"
                  @keyup="checkpassWord"
                ></b-form-input>
              </div>
              <div v-if="checkpass" style="color: red">*กรอกให้ครบ 6 ตัว</div>
              <div v-if="checkpassindex" style="color: red">
                *รหัสผ่านนี้ไม่สามารถใช้ได้
              </div>
              <div style="margin-top: 20px">
                <b-form-file
                  @change="previewImage"
                  v-model="PROFILE"
                  accept="image/*"
                  align="center"
                ></b-form-file>
              </div>
            </div>
            <div>
              <button
                @click="addREGISTER()"
                class="buttonL"
                style="margin-top: 20px"
              >
                <b>Sing Up</b>
              </button>
            </div>
          </div>
        </b-col>
      </b-card>
      <b-modal ref="Notusername" centered hide-footer>
        <div class="d-block text-center">
          <b>ชื่อผู้ใช้งานนี้ถูกใช้ไปเเล้ว</b>
        </div>
      </b-modal>
      <b-modal ref="Notpasswordcheck" centered hide-footer>
        <div class="d-block text-center">
          <b>ไม่สามารถใช้รหัสผ่านนี้ได้</b>
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
  data() {
    return {
      min: 6,
      NAME: "",
      LASTNAME: "",
      Word: "",
      PASSWORD: "",
      PROFILE: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
      checkpass: false,
      checkpassindex: false,
    };
  },
  watch: {
    Word(val) {
      this.Word = val.replace(/\W/g, "");
    },
  },

  methods: {
    NumbersOnly(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    checkpassWord() {
      if (this.PASSWORD.length >= 6) {
        this.checkpass = false;
      } else {
        this.checkpass = true;
      }
      var pattern = "0123456789012345789"; //to match circular sequence as well.
      if (pattern.indexOf(this.PASSWORD) == -1) {
        this.checkpassindex = false;
      } else {
        this.checkpassindex = true;
      }
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    async addREGISTER() {
      if (this.PASSWORD.length >= 6) {
        if (this.checkpassindex == false) {
          let checkusername = await axios.post(
            `${api_url.api_url}/checkUserpasswordRegister`,
            {
              USERNAME: this.Word,
            }
          );
          console.log(checkusername.data.length > 0);
          if (checkusername.data.length > 0) {
               this.$refs["Notusername"].show();
          } else {
            this.picture = null;
            const storageRef = firebase
              .storage()
              .ref(`${this.imageData.name}`)
              .put(this.imageData);
            storageRef.on(
              `state_changed`,
              (snapshot) => {
                this.uploadValue =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              },
              (error) => {
                // console.log(error.message);
              },
              () => {
                this.uploadValue = 100;
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                  this.picture = url;
                  // console.log(url);
                  axios
                    .post(`${api_url.api_url}/insertMember`, {
                      NAME: this.NAME,
                      LASTNAME: this.LASTNAME,
                      USERNAME: this.Word,
                      PASSWORD: this.PASSWORD,
                      PROFILE: url,
                    })
                    .then((response) => {
                      console.log(response.data);
                    });
                });
              }
            );
            this.$router.push({ path: "/" });
          }
        } else {
          this.$refs["Notpasswordcheck"].show();
        }
      } else {
        this.checkpass = true;
      }
    },
    Home() {
      this.$router.push({ path: "/" });
    },
    wordKeydown(e) {
      if (/^\W$/.test(e.key)) {
        e.preventDefault();
      }
    },
  },
};
</script>
<style scoped>
.screen {
  padding: 0px 20px;
  background-color:  #f2f2f3;
  height: 100vh;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1em;
}
.card1 {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2),
    0 10px 20px 0 rgba(124, 124, 124, 0.19);
}
.buttonL {
  padding: 8px 20px;
  font-size: 14px;
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

.buttonL:focus {
  background-color: #f5365c;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

.buttonL:active {
  background-color: #bd3543;
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  transform: translateY(0);
}
</style>