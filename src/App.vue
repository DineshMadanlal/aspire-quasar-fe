<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  // Meta tags for SEO purpose
  meta() {
    return {
      title: 'All-in-one Finance For Growing Businesses | Aspire',
      meta: {
        title: {
          name: 'title',
          content: 'All-in-one Finance For Growing Businesses | Aspire',
        },
        ogTitle: {
          name: 'og:title',
          content: 'All-in-one Finance For Growing Businesses | Aspire',
        },
        twitterTitle: {
          name: 'twitter:title',
          content: 'All-in-one Finance For Growing Businesses |  Aspire',
        },
        description: {
          name: 'description',
          content: 'Made For startups and SMEs. Save time and money with business accounts, borderless payments, corporate cards, expense management, all in one.',
        },
        ogDescription: {
          name: 'og:description',
          content: 'Made For startups and SMEs. Save time and money with business accounts, borderless payments, corporate cards, expense management, all in one.',
        },
        twitterDescription: {
          name: 'twitter:description',
          content: 'Made For startups and SMEs. Save time and money with business accounts, borderless payments, corporate cards, expense management, all in one.',
        },
      },
    };
  },
};
</script>
