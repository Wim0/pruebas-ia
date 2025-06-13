<template>
  <div id="app-container">
    <header>
      <div class="logo">
        <svg width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16.75 2a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 .75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75zM3.75 2a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75v-3.5A.75.75 0 0 0 7.25 2zm13 13a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 .75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75zM3.75 15a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75zM16 8.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75M8.5 16a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 8.5 16m-6-7.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 2.5 8.5m7.5-6a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 10 2.5m-1.5 12a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75m7.5-6a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75m-6 7.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75M8.5 2.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 8.5 2.5m6 6a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75m-6 6a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 8.5 15"></path>
        </svg>
        <span>Asistente IA</span>
      </div>
      <div class="user-controls">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <OrganizationSwitcher />
          <UserButton afterSignOutUrl="/login" />
        </SignedIn>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
/* 
* ---------------------------------------------------------------- 
* ARCHIVO: apps/web/src/App.vue 
* ---------------------------------------------------------------- * Propósito:
El componente raíz de la aplicación. Define el layout principal * con una cabecera y un área de
contenido donde se renderizarán las vistas. */
import { RouterView } from "vue-router";
import { SignedIn, SignedOut, SignInButton, UserButton, OrganizationSwitcher } from "@clerk/vue";
</script>
