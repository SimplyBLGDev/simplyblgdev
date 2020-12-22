<template>
<div>
  <div>
    <div style="background: rgba(0, 0, 0, 0) linear-gradient(95deg, rgb(234, 234, 234) 20%, rgba(24, 26, 27, 0) 60%) repeat scroll 0% 0%;">
      <div style="display:flex; padding-left:10px;">
        <img src="https://cdn.worldvectorlogo.com/logos/utn-2.svg" alt="UTN FRC Logo" style="width:80px;">
        <span class="LogoWords">UTN</span>
      </div>
    </div>
  </div>
  <div style="padding-left:8px; padding-right:8px;">
    <div class="ButtonPanel">
      <button class="PanelButton" onclick="window.location.href='/Graficadora';">Graficadora</button>
      <button class="PanelButton" onclick="alert('Proximamente');">Marco teorico</button>
      <button class="PanelButton" onclick="window.location.href='/Graficadora/Informacion';">Información</button>
    </div>
  </div>
  <router-view></router-view>
</div>
</template>