<template>
  <div>
    <div
      class="screen"
      style="justify-content: center; align-items: center"
      align="center"
    >
      <b-card class="cardP" style="width: 20rem">
        <b-img
          rounded="circle"
          :src="item.PROFILE"
          style="width: 150px; height: 150px"
        ></b-img>

        <div style="margin-top: 10px">
          <b>{{ item.NAME }} {{ item.LASTNAME }}</b>
        </div>

        <div style="margin-top: 20px">
          <b-row>
            <b-col cols="4" lg="4">
              <b-button
                variant="outline-success"
                class="mb-2"
                id="show-btn"
                @click="showModal1(item)"
              >
                <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
              </b-button>
            </b-col>
            <b-col cols="4" lg="4">
              <b-button
                variant="outline-secondary"
                class="mb-2"
                @click="showModal2(item)"
                ><b-icon icon="gear-wide" aria-hidden="true"></b-icon
              ></b-button>
            </b-col>
            <b-col cols="4" lg="4">
              <b-button variant="outline-danger" class="mb-2" @click="logouts">
                <b-icon icon="power" aria-hidden="true"></b-icon>
              </b-button>
            </b-col>
          </b-row>
          <b-modal ref="my-modal1" hide-footer>
            <div class="d-block text-center">
              <h3>เเก้ไขข้อมูล</h3>
            </div>
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
              <b-form-file
                @change="previewImage"
                v-model="PROFILE"
                accept="image/*"
                align="center"
              ></b-form-file>
            </div>
            <b-button
              class="mt-3"
              variant="outline-danger"
              block
              @click="Updatemember(item)"
              >บันทึก</b-button
            >
            <b-button
              class="mt-2"
              variant="outline-warning"
              block
              @click="hideModal1"
              >ยกเลิก</b-button
            >
          </b-modal>
          <b-modal ref="my-modal2" hide-footer>
            <div class="d-block text-center">
              <h3>เเก้ไขรหัสผ่าน</h3>
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

            <b-button
              class="mt-3"
              variant="outline-danger"
              block
              @click="Updatepassword(item)"
              >บันทึก</b-button
            >
            <b-button
              class="mt-2"
              variant="outline-warning"
              block
              @click="hideModal2"
              >ยกเลิก</b-button
            >
          </b-modal>
        </div>
      </b-card>
      <b-modal ref="Notpassword" centered hide-footer>
        <div class="d-block text-center">
          <b>รหัสผ่านนี้เคยถูกใช้ไปเเล้ว</b>
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
      NAME: "",
      LASTNAME: "",
      Word: "",
      PASSWORD: "",
      PROFILE: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
      item: null,
    };
  },
  mounted() {
    axios
      .post(`${api_url.api_url}/checkmember`, {
        MEMBER_ID: localStorage.getItem("IDMEMBER"),
      })
      .then((response) => {
        console.log(response.data);
        this.item = response.data[0];
      });
  },
  methods: {
    logouts() {
      console.log("logout");
      this.$router.push({ path: "/" });
      localStorage.clear();
    },
    showModal1(item) {
      (this.NAME = item.NAME),
        (this.LASTNAME = item.LASTNAME),
        this.$refs["my-modal1"].show();
    },
    showModal2(item) {
      (this.Word = item.USERNAME), this.$refs["my-modal2"].show();
    },
    hideModal1() {
      this.$refs["my-modal1"].hide();
    },
    hideModal2() {
      this.$refs["my-modal2"].hide();
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    Updatemember(x) {
      if (this.PROFILE != "") {
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
                .post(`${api_url.api_url}/updateMember`, {
                  NAME: this.NAME,
                  LASTNAME: this.LASTNAME,
                  PROFILE: url,
                  MEMBER_ID: x.MEMBER_ID,
                })
                .then((response) => {
                  console.log(response.data);
                  axios
                    .post(`${api_url.api_url}/checkmember`, {
                      MEMBER_ID: localStorage.getItem("IDMEMBER"),
                    })
                    .then((response) => {
                      console.log(response.data);
                      this.item = response.data[0];
                    });
                });
            });
          }
        );
      } else {
        axios
          .post(`${api_url.api_url}/updateMember`, {
            NAME: this.NAME,
            LASTNAME: this.LASTNAME,
            PROFILE: x.PROFILE,
            MEMBER_ID: x.MEMBER_ID,
          })
          .then((response) => {
            console.log(response.data);
            axios
              .post(`${api_url.api_url}/checkmember`, {
                MEMBER_ID: localStorage.getItem("IDMEMBER"),
              })
              .then((response) => {
                console.log(response.data);
                this.item = response.data[0];
              });
          });
      }
      this.$refs["my-modal1"].hide();
    },
    async Updatepassword(x) {
      let checkpassword = await axios.post(
        `${api_url.api_url}/checkUserpassword`,
        {
          MEMBER_ID: localStorage.getItem("IDMEMBER"),
          PASSWORD: this.PASSWORD,
        }
      );
      console.log(checkpassword.data);
      if (checkpassword.data.length > 0) {
        this.$refs["Notpassword"].show();
      } else {
        await axios
          .post(`${api_url.api_url}/updatePassword`, {
            ID: x.ID,
            MEMBER_ID: x.MEMBER_ID,
            USERNAME: this.Word,
            PASSWORD: this.PASSWORD,
          })
          .then((response) => {
            console.log(response.data);
            axios
              .post(`${api_url.api_url}/checkmember`, {
                MEMBER_ID: localStorage.getItem("IDMEMBER"),
              })
              .then((response) => {
                console.log(response.data);
                this.item = response.data[0];
              });
          });
      }
      this.$refs["my-modal2"].hide();
    },
  },
};
</script>
<style scoped>
.screen {
  padding: 100px 20px;
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
.buttonP {
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
.cardP {
  border-radius: 20px !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(253, 253, 253, 0.19);
}
</style>