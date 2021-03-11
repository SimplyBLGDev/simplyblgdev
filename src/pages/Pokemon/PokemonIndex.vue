<template>
	<div>
		<div class="fullWidthDiv">
			<span>Pokémon interactive maps</span>
		</div>
    <template v-for="region in regions">
      <div class="full" @click="Goto(region.address)" v-bind:key="region.name">
        <div style="float:left">
          <img class="mapSpec" :src="region.preview">
        </div>
        <div style="float:right">
          <div class="gamesSpec">
            <div class="gameIndicator" v-for="game in region.games" :key="game.name" :class="[game.class]"><b>{{ game.name }}</b></div>
          </div>
        </div>
        <div class="fullWidthDiv" :class="[region.class]">
          <span>{{ region.name }}</span>
        </div>
      </div>
    </template>

		<div class="full">
			<div style="position: absolute; width: 100%; height: 9rem;display: flex;align-items: center;text-align: center;justify-content: center;background-color: #444444bb;">
				<span style="transform: rotate(20deg); font-size:4rem;">WIP</span>
			</div>
			<div class="fullWidthDiv Johto">
				<span>Kanto remakes</span>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data: () => ({
		regions:[
			{
				name: "Kanto",
        address: 'Kanto',
        preview: require('../../assets/Pokemon/Maps/KantoPreview.png'),
        class:"kanto",
				games:[
					{
            name:"R",
            class:"red"
          },
          {
            name:"B",
            class:"blue"
          },
          {
            name:"Y",
            class:"yellow"
          }
				]
			},
      {
				name: "Johto",
        address: 'Johto',
        preview: require('../../assets/Pokemon/Maps/JohtoPreview.png'),
        class:"johto",
				games:[
					{
            name:"G",
            class:"gold"
          },
          {
            name:"S",
            class:"silver"
          },
          {
            name:"C",
            class:"crystal"
          }
				]
			}
		]
	}),
	methods: {
		Goto: function(destination) {
			window.location.href = "/Pokemon/" + destination;
		}
	}
}

</script>

<style scoped>
.fullWidthDiv {
	display:flex;
	justify-content:center;
	align-items:center;
	width: 100%;
	height: 9rem;
	font-size: 4rem;
	text-align: center;
}
.full {
	width:100%;
	height:9rem;
	float: right;
	margin-top:1rem;
	margin-bottom:1rem;
}
.mapSpec {
	position:absolute;
	height: 9rem;
}
.gamesSpec {
	position: absolute;
	margin-left: calc(-12vw - 10rem);
	width: calc(12vw + 10rem);
	height: 9rem;
	display: flex;
	flex-direction: column;
}
.kanto {
	background-color: #5c5c5c;
}
.kanto:hover {
	background-color: #757575;
}
.johto {
	background-color: #5555b9;
}
.johto:hover {
	background-color: #6b6bb6;
}
.gameIndicator {
	padding-right: 1.5rem;
  color:whitesmoke;
  display:flex;
  justify-content:flex-end;
  align-items:center;
  height: 100%;
  --gameColor: #000000;
  background: linear-gradient(90deg, rgba(255,255,255,0) 20%, var(--gameColor) 90%, var(--gameColor) 100%);
}
.gameIndicator:hover {
  background: linear-gradient(90deg, rgba(255,255,255,0) 5%, var(--gameColor) 90%, var(--gameColor) 100%);
}
.gameIndicator.red {
  --gameColor: #eb4034;
}
.gameIndicator.blue {
	--gameColor: #3434eb;
}
.gameIndicator.yellow {
	--gameColor: #e0c032;
}
.gameIndicator.gold {
  --gameColor: #f0ca0d;
}
.gameIndicator.silver {
  --gameColor: #a5bfd8;
}
.gameIndicator.crystal {
  --gameColor: #74c6df;
}
</style>
