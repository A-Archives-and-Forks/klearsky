<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { getOAuthClient } from "@/composables/oauth-client"
import { state } from "@/composables/main-state"

const router = useRouter()

onMounted(async () => {
  state.loaderDisplay = true
  try {
    const client = await getOAuthClient()
    if (client instanceof Error) {
      state.openErrorPopup(client, "OAuthCallbackView/onMounted")
      await router.push({ name: "home" })
      state.loaderDisplay = false
      return
    }
    const params = new URLSearchParams(window.location.search)
    const oauthSession = await client.callback(params)
    state.atp.oauthSession = oauthSession
    state.atp.currentAuthType = "oauth"
    await router.push({ name: "home" })
    location.reload()
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    state.openErrorPopup(err, "OAuthCallbackView/onMounted")
    await router.push({ name: "home" })
    state.loaderDisplay = false
  }
})
</script>

<template>
  <div class="oauth-callback-view">
    <p>Processing OAuth login...</p>
  </div>
</template>

<style lang="scss" scoped>
.oauth-callback-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-size: 1.25rem;
}
</style>
