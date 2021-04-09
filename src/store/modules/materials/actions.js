import {apiPublic} from '@/services/api'

const RESOURCE = 'materiais'

const actions = {
    getMaterials({ commit }){
        return apiPublic.get(`/${RESOURCE}`)
            .then(response => commit('SET_MATERIALS', response.data))
    },

    postMaterials({ commit }, params){
        return apiPublic.post(`/${RESOURCE}`, params)
    },

    deleteMaterials({ commit }, id){
        return apiPublic.delete(`/${RESOURCE}/${id}`)
    },
}

export default actions
