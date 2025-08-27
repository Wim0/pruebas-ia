<template>
  <div class="home-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1>AuditEase para implementación ISO 27001</h1>
        <p class="subtitle">
          Simplifica el proceso de documentación y cumplimiento con ayuda de Inteligencia Artificial
        </p>
        <div class="auth-buttons">
          <SignInButton mode="modal" afterSignInUrl="/dashboard" class="login-button">
            Iniciar Sesión
          </SignInButton>
        </div>
      </div>
      <div class="hero-image">
        <svg width="250" height="250" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16.75 2a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 .75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75zM3.75 2a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75v-3.5A.75.75 0 0 0 7.25 2zm13 13a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 .75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75zm-13 0a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75z" />
        </svg>
      </div>
    </div>

    <div class="features-section">
      <h2>Características</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
            </svg>
          </div>
          <h3>Carga de documentos</h3>
          <p>
            Sube tus documentos existentes para entrenar a la IA con el contexto específico de tu
            organización.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
          </div>
          <h3>Plantillas inteligentes</h3>
          <p>
            Genera documentación ISO 27001 basada en estándares internacionales y el contexto de tu
            empresa.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
          </div>
          <h3>Dashboard de progreso</h3>
          <p>Visualiza y gestiona el avance de tu implementación de seguridad de la información.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SignInButton, useAuth } from "@clerk/vue";
import { onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";

const { isSignedIn } = useAuth();
const router = useRouter();

// Redirección automática si el usuario ya está autenticado
watchEffect(() => {
  if (isSignedIn.value) {
    router.push("/dashboard");
  }
});

// También verificamos al montar el componente
onMounted(() => {
  if (isSignedIn.value) {
    router.push("/dashboard");
  }
});
</script>

<style scoped>
/* Tus estilos actuales permanecen iguales */
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4rem;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary-color);
  opacity: 0.8;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, var(--primary-color), #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

.login-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}

.features-section {
  margin-bottom: 3rem;
}

.features-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2.5rem;
  color: var(--text-primary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
  animation: fadeIn 1s ease forwards;
  opacity: 0;
}

.feature-card:nth-child(1) {
  animation-delay: 0.1s;
}

.feature-card:nth-child(2) {
  animation-delay: 0.3s;
}

.feature-card:nth-child(3) {
  animation-delay: 0.5s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
}

.feature-icon {
  background-color: rgba(45, 140, 255, 0.1);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--primary-color);
}

.feature-card h3 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: var(--text-primary);
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }

  .hero-content {
    margin-bottom: 2rem;
  }

  .hero-image {
    max-width: 80%;
  }

  .auth-buttons {
    justify-content: center;
  }
}
</style>
