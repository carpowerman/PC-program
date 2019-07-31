import { getOrgTree } from '@/api/organization';

const organization = {
    state: {
        tree: []
    },
    actions: {
        GetOrgTree({commit}) {
            return new Promise((resolve, reject) => {
                getOrgTree().then((res) => {
                    if(res.data.code === 0) {
                        const data = res.data.data;
                        commit('SET_ORGTREE', data);
                        resolve(data);
                    }
                }).catch((err) => {
                    reject(err);
                })
            })
        }
    },
    mutations: {
        SET_ORGTREE: (state, tree) => {
            state.tree = tree;
        }
    }
}

export default organization;