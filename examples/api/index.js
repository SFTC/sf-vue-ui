import Vue from 'vue';
export const searchKnight = params =>
  Vue.axios.get('http://10.188.60.215:7300/mock/5c00d99595b2682cbab89553/rider/user/account/getriderlist', { params }).then(res => res.data);

  