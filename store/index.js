export const state = () => ({
  user: null,
  token: null
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  }
}

export const actions = {
  setUser (context, user) {
    context.commit('SET_USER', user)
  },
  setToken (context, token) {
    context.commit('SET_TOKEN', token)
    console.log(`token: ${token}`)
  }
}
