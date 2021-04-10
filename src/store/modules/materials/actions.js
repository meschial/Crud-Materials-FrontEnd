import {apiPublic} from '@/services/api'

const RESOURCE = 'materiais'

const actions = {
    getMaterials({ commit }){
        return apiPublic.get(`/${RESOURCE}`)
            .then(response => commit('SET_MATERIALS', response.data))
    },

    getIdMaterials({ commit }, id){
        return apiPublic.get(`/${RESOURCE}/${id}`)
    },

    postMaterials({ commit }, params){
        return apiPublic.post(`/${RESOURCE}`, params)
    },

    deleteMaterials({ commit }, id){
        return apiPublic.delete(`/${RESOURCE}/${id}`)
    },

    updateMaterials({ commit }, params){
        return apiPublic.put(`/${RESOURCE}/${params.id}`, params)
    },
   
}

export default actions
