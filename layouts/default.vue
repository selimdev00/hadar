<template>
  <div class="flex min-h-screen flex-col bg-bg text-ink">
    <a href="#main" class="skip-link">Skip to content</a>

    <AppHeader />

    <main id="main" tabindex="-1" class="flex-1 focus:outline-none">
      <slot />
    </main>

    <Footer />
  </div>
</template>
