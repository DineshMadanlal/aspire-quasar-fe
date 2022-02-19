<template>
  <q-page class="cards-page">
    <BankCard />
  </q-page>
</template>

<script>
export default {
  name: 'CardsPage',
  components: {
    BankCard: () => import('components/BankCard'),
  },
};
</script>

<style lang="scss" scoped>
</style>
