import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import role from './modules/role'
import common from './modules/common'
import tags from './modules/tags'
import logs from './modules/logs'
import organization from './modules/organization'
import dataPermission from './modules/dataPermission';
import icon from './modules/icon';
import getters from './getters'

import home from './modules/home';

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        user,
        role,
        common,
        logs,
        tags,
        home,
        organization,
        dataPermission,
        icon
    },
    getters,
})

export default store