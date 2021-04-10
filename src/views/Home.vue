<template>
  <div class="home mt-3">
    <div class="row">
      <div class="col-12">
        <div class="row mt-3">
          <div class="col-6">
            <h2 class="textHome">Materiais De Construção <b class="orange">Constr Up</b></h2>
          </div>
          <div class="col-6">
            <button class="addMaterial" @click.prevent="modalRegister"><b-icon class="iconsAdd" icon="plus"></b-icon> Adicionar Material</button>
          </div>
        </div>
        <table class="table table-sm">
          <thead class="table-dark">
            <tr>
              <th width="2%">ID</th>
              <th width="23%">Nome</th>
              <th class="desc" width="20%">Descrição</th>
              <th width="20%">Marca</th>
              <th width="10%">QDT</th>
              <th class="desc" width="15%">Adicionado</th>
              <th width="10%">Funções</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(material, index) in materials.items" :key="index">
              <th scope="row">{{ material.id }}</th>
              <td>{{ material.name }}</td>
              <td class="desc">{{ material.description }}</td>
              <td>{{ material.brand }}</td>
              <td>{{ material.quantity }}</td>
              <td class="desc">{{ material.created_at }}</td>
              <td v-if="material.name">
                <b-icon class="iconsApp" icon="pencil-fill" variant="success" @click.prevent="modalUpdate(material)" v-b-popover.hover.left="'Editar'"></b-icon>
                <b-icon class="iconsApp" icon="trash" variant="danger" @click.prevent="destroyMaterial(material)" v-b-popover.hover.right="'Excluir'"></b-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-3">
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
                <b-form-input type="number" v-model="formData.quantity" name="quantity" :state="error.quantity.state" placeholder="Quantidade do material"></b-form-input>
                <b-form-invalid-feedback >{{error.quantity.message}}</b-form-invalid-feedback>
              </div>
              <button class="addMaterial btn-block" 
                :disabled="loading"
                @click.prevent="registerMaterial">
                <span v-if="loading">Cadastrando...</span>
                <span v-else>Cadastrar</span>
              </button>
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
                <b-form-input type="number" v-model="formData.quantity" name="quantity" :state="error.quantity.state" placeholder="Quantidade do material"></b-form-input>
                <b-form-invalid-feedback >{{error.quantity.message}}</b-form-invalid-feedback>
              </div>
              <div class="mb-3">
                <label class="form-label">Adicionado:</label>
                <b-form-input type="text" disabled v-model="formData.created_at" name="date"></b-form-input>
              </div>
              <button class="addMaterial btn-block"
                :disabled="loading"
                @click.prevent="updateMaterial">
                <span v-if="loading">Atualizando...</span>
                <span v-else>Atualizar</span>
              </button>
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

    errorReset() {
      this.error = {
        message: null,
        name: {
          state: null,
          message: null,
        },
        description: {
          state: null,
          message: null,
        },
        brand: {
          state: null,
          message: null,
        },
        quantity: {
          state: null,
          message: null,
        },
      }
    },

    validaFrom(){
      if(!this.formData.name){
        this.error.name.state = false;
        this.error.name.message = "Informe o nome!"
        return false;
      }
      if(!this.formData.description){
        this.error.description.state = false;
        this.error.description.message = "Informe a descrição!"
        return false;
      }
      if(!this.formData.brand){
        this.error.brand.state = false;
        this.error.brand.message = "Informe uma marca!"
        return false;
      }
      if(!this.formData.quantity){
        this.error.quantity.state = false;
        this.error.quantity.message = "Informe a quantidade!"
        return false;
      }
    },

    registerMaterial(){
      this.errorReset()
      if(this.validaFrom() == false){
        return
      }
      this.loading = true
      this.postMaterials(this.formData)
        .then(response => {
          this.$refs['modalRegister'].hide()
          this.resetForm()
          this.getMaterials()
          if(response.data == 201){
            this.$vToastify.success("Material adicionado!", "Sucesso! ")
          }else{
            this.$vToastify.error("Não foi possível criar o material!", "Erro! ")
          }
          
        })
        .catch(error => this.$vToastify.error("Falha ao cadastrar material", "Erro! "))
        .finally(() => this.loading = false)
    },

    destroyMaterial(material){
      this.deleteMaterials(material.id)
        .then(response => {
            this.getMaterials()
            if(response.data == 202){
              this.$vToastify.success("Material excluido!", "Sucesso! ")
            }else{
              this.$vToastify.error("Não foi possível excluir o material!", "Erro! ")
            }
          })
        .catch(error => this.$vToastify.error("Falha ao excluir material", "Erro! "))
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
          if(response.data == 202){
              this.$vToastify.success("Material editado!", "Sucesso! ")
            }else{
              this.$vToastify.error("Não foi possível editar o material!", "Erro! ")
            }
        })
        .catch(error => this.$vToastify.error("Falha ao atualizar material", "Erro! "))
        .finally(() => this.loading = false)
    },

    modalUpdate(material){
      this.getIdMaterials(material.id)
      .then(response => {
          this.errorReset()
          this.$refs['modalUpdate'].show()
          this.formData = response.data
        })
    },

    modalRegister(){
      this.$refs['modalRegister'].show()
      this.errorReset()
      this.resetForm()
    },
  }
}
</script>

<style lang="scss" scoped>
.textHome{
  font-size: 30px;
  font-weight: bold;

  .orange{
    color: #ff6100;
  }
}

.addMaterial{
  background-color: #ff6100;
  border: 1px solid #ff6100;
  color: #fff;
  padding: 8px 10px;
  font-weight: 600;
  border-radius: 3px;
  float: right;

  &:hover {
    background-color: #e65b06;
    border: 1px solid #e65b06;
    transition: background-color 0.35s ease-in-out, border-color 0.35s ease-in-out;
  }
  
  .iconsAdd{
    font-size: 21px;
  }
}

.iconsApp{
  margin: 0 10px;
  cursor: pointer;
}

.btn-block{
  width: 100%;
}
</style>
