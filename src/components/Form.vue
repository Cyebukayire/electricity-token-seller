<template>
      <div class="buy">
    <form @submit.prevent="buy()">
      <div class="box">
        <h1>{{title}}</h1>
        <input
          type="text"
          name=""
          v-model="state.amount"
          placeholder="Money(FRW)"
        />
        
        <input
          type="text"
          name=""
          v-model="state.meter_number"
          placeholder="Meter number"
        />

        <button type="submit">Buy</button>
        <span class="buying_error">{{ state.buying_error }}</span>
        <Token v-bind:token="state.generated_token"/>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { tokens } from "../assets/tokens";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const state = reactive({
  generated_token: "SD3423SD",
  amount: null,
  meter_number: "",
  buying_error: "",
  token: tokens[0],
});

// const router = useRouter();

function buy() {
  if (state.meter_number.length != 6) {
    state.buying_error = "Please! Use a valid meter number";
  } else if (state.amount % 100 != 0 || state.amount > 182500) {
    state.buying_error = "Invalid amount"
    } else {
    state.token.amount = state.amount;
    state.token.meter_number = state.meter_number;
    store.commit("token",state.token.generated_token)
    // store.dispatch("token", state.token)
    // state.meter_number = "";
    // state.buying_error = "";
    // router.push({ name: "dashboard" });
  }
}
</script>

<script>
import Token from "./Token.vue"

export default {
    name: 'BuyingForm',
    components: {
      Token
    },
    props: {
        title: String,
    }
}
</script>

<style scoped>

.box {
  width: 300px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  text-align: center;
  border-radius: 20px 20px;
}
.box h1 {
  color: #87bfff;
  /* text-transform: uppercase; */
  font-weight: 500;
  text-align: center;
}
.box input[type="text"] {
  border: 0;
  background: none;
  display: block;
  margin: 5px auto;
  text-align: center;
  border: 2px solid #cae5ff;
  padding: 14px 10px;
  width: 200px;
  outline: none;
  color: rgb(107, 112, 119);
  border-radius: 24px;
  transition: 0.5s;
  font-size: 16px;
}
.box input[type="text"]:focus {
  border-color: #87bfff;
  width: 250px;
}
.box input[type="text"]::placeholder {
  opacity: 0.6;
}
.box button[type="submit"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #cae5ff;
  padding: 14px 40px;
  outline: none;
  font-style: normal;
  font-size: 18px;
  color: rgb(107, 112, 119);
  transition: 0.25s;
  cursor: pointer;
}
.box button[type="submit"]:focus {
  border-color: #87bfff;
}
.box button[type="submit"]:hover {
  border-radius: 24px;
}
button {
  text-decoration: none;
}

.buying_error {
  color: red;
}
</style>