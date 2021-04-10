<template>
  <nav class="navbar fixed-bottom bg-dark">
    <div class="container">
      <span><b class="orange">Constr Up</b> - Todos os direitos reservados - ©  Copyright 2021</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavFooterComponent'
}
</script>

<style lang="scss" scoped>
.navbar{
  background-color: #f1f1f1;
  padding: 20px 0;

  span{
    color: #fff;
    font-size: 18px;
    font-weight: 800;
    .orange{
      color: #ff6100;
    }
  }
}
</style>