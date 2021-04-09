<template>
  <div id="app">

    <NavBarComponent />

    <main>
      <div class="container">
        <router-view/>
      </div>
    </main>

  </div>
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent'
export default {
    name: 'DashboardComponent',
    components:{
      NavBarComponent
    },
}
</script>
