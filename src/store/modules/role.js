import {getRoleList} from '@/api/role'
 const role={
    state:{//对数据的全局存储
        roleList: [],
    },
    actions:{//对数据的异步修改
        GetRoleList({commit}){
            return new Promise((resolve) => {
                getRoleList().then(res => {
                    const data = res.data.data;
                    commit('SET_ROLE', data);
                    resolve(data);
                }).catch(() => {
                    
                });
            })
        }
    },
    mutations:{
        //对数据的同步修改
        SET_ROLE: (state, role) => {
            state.roleList = role;
        },
    }
 }
 export default role;