<template>
  <div class="home mt-5">
    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th width="2%">ID</th>
              <th width="23%">Nome</th>
              <th width="20%">Descrição</th>
              <th width="20%">Marca</th>
              <th width="10%">QDT</th>
              <th width="15%">Adicionado</th>
              <th width="10%">Funções</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(material, index) in materials.items" :key="index">
              <th scope="row">{{ material.id }}</th>
              <td>{{ material.name }}</td>
              <td>{{ material.description }}</td>
              <td>{{ material.brand }}</td>
              <td>{{ material.quantity }}</td>
              <td>{{ material.date }}</td>
              <td>
                <b-icon class="iconsApp" icon="pencil-fill" variant="success" v-b-popover.hover.top="'Editar'"></b-icon>
                <b-icon class="iconsApp" icon="trash" variant="danger" @click.prevent="destroyMaterial(material)" v-b-popover.hover.top="'Excluir'"></b-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-3">
        <b-button squared variant="primary" v-b-modal.modalRegister>Adicionar Material</b-button>
        <b-modal id="modalRegister" ref="modalRegister" title="BootstrapVue">
          <div class="col-12">
            <form>
              <div class="mb-3">
                <label class="form-label">Nome:</label>
                <input type="text" v-model="formData.name" name="name" class="form-control" >
              </div>
              <div class="mb-3">
                <label class="form-label">Descrição:</label>
                <input type="text" v-model="formData.description" name="description" class="form-control" >
              </div>
              <div class="mb-3">
                <label class="form-label">Marca:</label>
                <input type="text" v-model="formData.brand" name="brand" class="form-control" >
              </div>
              <div class="mb-3">
                <label class="form-label">Quantidade:</label>
                <input type="text" v-model="formData.quantity" name="quantity" class="form-control" >
              </div>
              <div class="mb-3">
                <label class="form-label">Data:</label>
                <input type="text" v-model="formData.date" name="date" class="form-control" >
              </div>
              <b-button squared variant="primary" 
                :disabled="loading"
                @click.prevent="registerMaterial">
                <span v-if="loading">Cadastrando...</span>
                <span v-else>Cadastrar</span>
              </b-button>
            </form>
          </div>
        </b-modal>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Home',

  data() {
    return {
      loading: false,
      formData: {
        name: '',
        description: '',
        brand: '',
        quantity: '',
        date: ''
      }
    }
  },

  mounted(){
      this.getMaterials()
      .catch(response => this.$vToastify.error("Falha ao carregar materiais", "Erro! "))
  },

  computed:{
      ...mapState({
          materials: state => state.materials
      })
  },

  methods:{
    ...mapActions([
        'getMaterials',
        'postMaterials',
        'deleteMaterials',
    ]),

    registerMaterial(){
      this.loading = true

      this.postMaterials(this.formData)
        .then(response => {
          this.$refs['modalRegister'].hide()
          this.getMaterials()
          this.$vToastify.success("Material cadastrado!", "Sucesso! ")
        })
        .catch(error => this.$vToastify.error("Falha ao cadastrar material", "Erro! "))
        .finally(() => this.loading = false)
    },

    destroyMaterial(material){
      this.deleteMaterials(material.id)
        .then(response => {
            this.getMaterials()
            this.$vToastify.success("Material excluido!", "Sucesso! ")
          })
        .catch(error => this.$vToastify.error("Falha ao excluir material", "Erro! "))
    }
  }

}
</script>

<style lang="scss" scoped>
.iconsApp{
  margin: 0 10px;
  cursor: pointer;
}
</style>
