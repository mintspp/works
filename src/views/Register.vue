<template>
  <div class="screen" align="center">
    <b-card class="card1" style="margin-top: 20px; max-width: 30rem">
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
          <div><h3>Create Account</h3></div>
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
                placeholder="Username"
              ></b-form-input>
            </div>

            <div style="margin-top: 20px">
              <b-form-input
                v-model="PASSWORD"
                placeholder="Password"
              ></b-form-input>
            </div>

            <div>
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
  </div>
</template>
<script>
import axios from "axios";
import firebase from "firebase";
const api_url = require("../../utilities/api");
export default {
  data() {
    return {
      NAME: "",
      LASTNAME: "",
      Word: "",
      PASSWORD: "",
      PROFILE: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
    };
  },

  watch: {
    Word(val) {
      this.Word = val.replace(/\W/g, "");
    },
  },

  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    async addREGISTER() {
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
<style>
.screen {
  padding: 0px 20px;
  background-color: #f2f2f3;
  height: 100vh;
}
.card1 {
  /* border: none;
  color: rgb(85, 85, 85); */

  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2),
    0 10px 20px 0 rgba(124, 124, 124, 0.19);
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
</style>