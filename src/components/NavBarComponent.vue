<template>
  <div>
    <b-navbar class="navbar" type="dark">
      <div class="container">
        <img class="logo" src="@/assets/logo.png" alt="ConstrUp">  
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

  span{
    color: #000;
    font-size: 25px;
    font-weight: 800;
    .orange{
      color: #ff6100;
    }
  }
  .logo{
    width: 200px;
    
  }
}
</style>