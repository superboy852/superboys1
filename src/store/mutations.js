import * as types from './mutation-types'

const mutations = {
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.SET_USER_TOKEN](state, token) {
    state.token = token
  },
  [types.SET_COLLAPSED](state, collapsed) {
    state.collapsed = collapsed
  },
  [types.SET_USER_TOKENOK](state, tokenOk) {
    state.tokenOk = tokenOk
  },
  [types.SET_LOCALURL](state, localurl) {
    state.localurl = localurl
  }
}

export default mutations
