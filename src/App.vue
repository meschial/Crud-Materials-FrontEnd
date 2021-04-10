<template>
  <div id="app">
    <NavBarComponent />
      <main>
        <div class="container">
          <router-view/>
        </div>
      </main>
    <NavFooterComponent />
  </div>
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent'
import NavFooterComponent from '@/components/NavFooterComponent'
export default {
    name: 'DashboardComponent',
    components:{
      NavBarComponent,
      NavFooterComponent
    },
}
</script>
