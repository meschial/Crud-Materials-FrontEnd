<template>
  <div class="home mt-5">
    <div class="row">
      <div class="col-12">
        <table class="table table-sm">
          <thead class="table-dark">
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
              <td>{{ material.created_at }}</td>
              <td>
                <b-icon class="iconsApp" icon="pencil-fill" variant="success" @click.prevent="modalUpdate(material)" v-b-popover.hover.left="'Editar'"></b-icon>
                <b-icon class="iconsApp" icon="trash" variant="danger" @click.prevent="destroyMaterial(material)" v-b-popover.hover.right="'Excluir'"></b-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-3">
        <b-button squared class="addMaterial" v-b-modal.modalRegister>Adicionar Material</b-button>
        <b-modal id="modalRegister" ref="modalRegister" :hide-footer="true" title="Cadastrar Material">
          <div class="col-12">
            <form>
              <div class="mb-3">
                <label class="form-label">Nome:</label>
                <b-form-input type="text" v-model="formData.name" name="name" :state="error.name.state" placeholder="Nome do material"></b-form-input>
                <b-form-invalid-feedback >{{error.name.message}}</b-form-invalid-feedback>
              </div>
              <div class="mb-3">
                <label class="form-label">Descrição:</label>
                <b-form-input type="text" v-model="formData.description" name="description" :state="error.description.state" placeholder="Descrição do material"></b-form-input>
                <b-form-invalid-feedback >{{error.description.message}}</b-form-invalid-feedback>
              </div>
              <div class="mb-3">
                <label class="form-label">Marca:</label>
                <b-form-input type="text" v-model="formData.brand" name="brand" :state="error.brand.state" placeholder="Marca do material"></b-form-input>
                <b-form-invalid-feedback >{{error.brand.message}}</b-form-invalid-feedback>
              </div>
              <div class="mb-3">
                <label class="form-label">Quantidade:</label>
                <b-form-input type="text" v-model="formData.quantity" name="quantity" :state="error.quantity.state" placeholder="Quantidade do material"></b-form-input>
                <b-form-invalid-feedback >{{error.quantity.message}}</b-form-invalid-feedback>
              </div>
              <b-button squared class="addMaterial btn-block" 
                :disabled="loading"
                @click.prevent="registerMaterial">
                <span v-if="loading">Cadastrando...</span>
                <span v-else>Cadastrar</span>
              </b-button>
            </form>
          </div>
        </b-modal>
        <b-modal id="modalUpdate" :hide-footer="true" ref="modalUpdate" title="Atualizar Material">
          <div class="col-12">
            <form>
              <input type="text" hidden v-model="formData.id" name="id" class="form-control" >
              <div class="mb-3">
                <label class="form-label">Nome:</label>
                <b-form-input type="text" v-model="formData.name" name="name" :state="error.name.state" placeholder="Nome do material"></b-form-input>
                <b-form-invalid-feedback >{{error.name.message}}</b-form-invalid-feedback>
              </div>
              <div class="mb-3">
                <label class="form-label">Descrição:</label>
                <b-form-input type="text" v-model="formData.description" name="description" :state="error.description.state" placeholder="Descrição do material"></b-form-input>
                <b-form-invalid-feedback >{{error.description.message}}</b-form-invalid-feedback>
              </div>
              <div class="mb-3">
                <label class="form-label">Marca:</label>
                <b-form-input type="text" v-model="formData.brand" name="brand" :state="error.brand.state" placeholder="Marca do material"></b-form-input>
                <b-form-invalid-feedback >{{error.brand.message}}</b-form-invalid-feedback>
              </div>
              <div class="mb-3">
                <label class="form-label">Quantidade:</label>
                <b-form-input type="text" v-model="formData.quantity" name="quantity" :state="error.quantity.state" placeholder="Quantidade do material"></b-form-input>
                <b-form-invalid-feedback >{{error.quantity.message}}</b-form-invalid-feedback>
              </div>
              <b-button squared class="addMaterial btn-block"
                :disabled="loading"
                @click.prevent="updateMaterial">
                <span v-if="loading">Atualizando...</span>
                <span v-else>Atualizar</span>
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
      },
      error: {
        message: null,
          name: {
            state: null,
            message: null,
          },
          brand: {
            state: null,
            message: null,
          },
          description: {
            state: null,
            message: null,
          },
          quantity: {
            state: null,
            message: null,
          },
      },
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
        'getIdMaterials',
        'postMaterials',
        'deleteMaterials',
        'updateMaterials',
    ]),

    resetForm(){
      this.formData.name = null
      this.formData.description = null
      this.formData.brand = null
      this.formData.quantity = null
    },

    validaFrom(){
      if(!this.formData.name){
        this.error.name.state = false;
        this.error.name.message = "Informe o nome!"
        return false;
      }else{
        this.error.name.state = null
        this.error.name.message = null
      }
      if(!this.formData.description){
        this.error.description.state = false;
        this.error.description.message = "Informe a descrição!"
        return false;
      }else{
        this.error.description.state = null
        this.error.description.message = null
      }
      if(!this.formData.brand){
        this.error.brand.state = false;
        this.error.brand.message = "Informe uma marca!"
        return false;
      }else{
        this.error.brand.state = null
        this.error.brand.message = null
      }
      if(!this.formData.quantity){
        this.error.quantity.state = false;
        this.error.quantity.message = "Informe a quantidade!"
        return false;
      }else{
        this.error.quantity.state = null
        this.error.quantity.message = null
      }
    },

    registerMaterial(){
      if(this.validaFrom() == false){
        return
      }
      this.loading = true
      this.postMaterials(this.formData)
        .then(response => {
          this.$refs['modalRegister'].hide()
          this.resetForm()
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
    },

    modalUpdate(material){
      this.getIdMaterials(material.id)
      .then(response => {
          this.$refs['modalUpdate'].show()
          this.formData = response.data
        })
    },

    updateMaterial(){
      if(this.validaFrom() == false){
        return
      }
      this.loading = true
      this.updateMaterials(this.formData)
        .then(response => {
          this.$refs['modalUpdate'].hide()
          this.getMaterials()
          this.$vToastify.success("Material atualizado!", "Sucesso! ")
        })
        .catch(error => this.$vToastify.error("Falha ao atualizar material", "Erro! "))
        .finally(() => this.loading = false)
    },
  }
}
</script>

<style lang="scss" scoped>
.iconsApp{
  margin: 0 10px;
  cursor: pointer;
}
.addMaterial{
  background-color: #ff6100;
  border: 1px solid #ff6100;

  &:hover {
    background-color: #e65b06;
    border: 1px solid #e65b06
  }
}
.btn-block{
  width: 100%;
}
</style>
