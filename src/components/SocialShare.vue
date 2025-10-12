<template>
  <div class="social-share">
    <v-btn
      v-for="network in networks"
      :key="network.name"
      :href="network.url"
      target="_blank"
      rel="noopener noreferrer"
      :color="network.color"
      :icon="network.icon"
      size="small"
      class="ma-1"
      @click="trackShare(network.name)"
    >
    </v-btn>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  hashtags: {
    type: String,
    default: ''
  }
})

const networks = computed(() => {
  const encodedUrl = encodeURIComponent(props.url)
  const encodedTitle = encodeURIComponent(props.title)
  const encodedDescription = encodeURIComponent(props.description)

  return [
    {
      name: 'X (Twitter)',
      icon: 'mdi-twitter',
      color: '#000000',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${props.hashtags ? `&hashtags=${props.hashtags}` : ''}`
    },
    {
      name: 'Facebook',
      icon: 'mdi-facebook',
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      name: 'LINE',
      icon: 'mdi-chat',
      color: '#06C755',
      url: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`
    },
    {
      name: 'LinkedIn',
      icon: 'mdi-linkedin',
      color: '#0A66C2',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    },
    {
      name: 'Reddit',
      icon: 'mdi-reddit',
      color: '#FF4500',
      url: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
    },
    {
      name: 'Email',
      icon: 'mdi-email',
      color: '#777777',
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
    }
  ]
})

const trackShare = (network) => {
  console.log(`Shared on ${network}`)
  // Add analytics tracking here if needed
}
</script>

<style scoped>
.social-share {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}
</style>
