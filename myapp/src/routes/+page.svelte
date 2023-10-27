<script lang="ts">
  import { useChat } from "ai/svelte";
  import { writable } from "svelte/store";

  const { messages, handleSubmit, input } = useChat({
    api: "/chat",
  });

  let mode: "chat" | "login" | "register" = "login"; // start with the login screen
  let username = "";
  let password = "";

  function handleLogin() {
    if (username && password) {
      // Logic for authenticating user (e.g., call an API endpoint)
      mode = "chat";
    }
  }

  function showRegister() {
    mode = "register";
  }

  function handleRegister() {
    if (username && password) {
      // Logic for registering a new user (e.g., call an API endpoint)
      mode = "login";
    }
  }

  function handleLogout() {
    mode = "login";
    username = "";
    password = "";
  }
</script>

{#if mode === "login"}
  <div class="login">
    <h2>Login</h2>
    <input bind:value={username} placeholder="Username" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={handleLogin}>Login</button>
    <button on:click={showRegister}>Register</button>
  </div>
{:else if mode === "register"}
  <div class="register">
    <h2>Register</h2>
    <input bind:value={username} placeholder="Username" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={handleRegister}>Register</button>
  </div>
{:else}
  <ul>
    {#each $messages as message}
      <li>{message.role} says... {message.content}</li>
    {/each}
  </ul>
  <form on:submit={handleSubmit}>
    <input bind:value={$input} />
    <button type="submit">Send</button>
  </form>
  <button on:click={handleLogout}>Logout</button>
  <!-- Logout button -->
{/if}

<style>
  /* Add some basic styling */
  .login,
  .register {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 5px;
  }
</style>
