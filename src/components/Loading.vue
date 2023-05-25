<template>
  <div>
    <!-- loading -->
    <div class="loading-container">
      <div class="loading">
        <div class="loading-dot" />
        <div class="loading-dot" />
        <div class="loading-dot" />
      </div>
    </div>
  </div>
</template>

<style>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-dot {
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: #409eff;
  border-radius: 50%;
  animation: loading 1s ease-in-out infinite;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}
.loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes loading{
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
