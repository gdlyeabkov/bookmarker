export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}

export const actions = {
  setUser (context, user) {
    context.commit('SET_USER', user)
  }
}
