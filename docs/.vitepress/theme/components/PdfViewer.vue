<!-- docs/.vitepress/components/PdfViewer.vue -->
<template>
  <div class="pdf-viewer">

    <iframe
      v-if="!isMobile"
      :src="src"
      class="pdf-iframe"
    ></iframe>

  <a
      v-else
    :href="src + '#toolbar=0'"
    target="_blank"
    rel="noopener"
    class="pdf-button"
  >
    {{ label }}
  </a>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  src: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: 'Открыть PDF'
  },
  height: {
    type: String,
    default: '800px'
  }
})

const isMobile = ref(false)

onMounted(() => {
  isMobile.value = window.innerWidth < 768
})
</script>

<style scoped>
.pdf-viewer {
  width: 100%;
  margin: 1.5rem 0;
}

.pdf-iframe {
  width: 100%;
  height: 90vh;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.pdf-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
}

.pdf-button:hover {
  background: var(--vp-c-brand-dark);
}
</style>