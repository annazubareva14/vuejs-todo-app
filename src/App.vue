<template>
  <header class="header">
    <img alt="logo" class="header__logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="header__wrapper">
      <nav class="header__nav">
        <router-link to="/" class="header__link" active-class="header__link--active">
          Todo List
        </router-link>
        <router-link to="/statistics" class="header__link" active-class="header__link--active">
          Statistics
        </router-link>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.header {
  line-height: 1.5;
  max-height: 100vh;

  &__logo {
    display: block;
    margin: 0 auto 2rem;
  }

  &__nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
  }

  &__link {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    color: inherit;
    text-decoration: none;
    transition: color 0.25s;

    &:first-of-type {
      border: 0;
    }

    &--active {
      color: #4f46e5;

      &:hover {
        background-color: transparent;
      }
    }
  }

  @media (min-width: 1024px) {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);

    &__logo {
      margin: 0 2rem 0 0;
    }

    &__wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }

    &__nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;
      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
}
</style>
