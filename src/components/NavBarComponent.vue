<template>
  <div>
    <b-navbar class="navbar" type="dark">
      <div class="container">
        <router-link to="/">
          <img class="logo" src="@/assets/logo.png" alt="ConstrUp">  
        </router-link>
        <span>Esse é um CRUD de materiais<br> de construção para <b class="orange">Constr Up!</b></span>
      </div>       
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBarComponent',
}
</script>

<style lang="scss" scoped>
.navbar{
  background-color: #f1f1f1;
  padding: 30px 0;

  .logo{
    width: 200px;
    cursor: pointer;
  }

  span{
    color: #000;
    font-size: 25px;
    font-weight: 800;
    
    .orange{
      color: #ff6100;
    }
  }
}
</style>