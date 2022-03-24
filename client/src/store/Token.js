export const TokenModule = {
    namespaced: true,
    state: {
        token: null
    },

    mutations: {
        SET_TOKEN(state, token){
            state.token = token
        }
    },

    actions: {
        setToken({ commit }, token){
            commit('SET_TOKEN', token)
        }
    }
}