
const app = {
  state: {
    sidebar: {
      opened: false
    },
    brand: '首页'
  },
  mutations: {
    SET_BRAND: (state, brand) => {
      state.brand = brand
    }
  }
}

export default app
