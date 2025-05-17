<template>
	<div>
		<div class="fullWidthDiv">
			<span>Pokémon interactive maps</span>
		</div>
    <template v-for="region in regions">
      <div class="full direction-banner" @click="Goto(region.address)" v-bind:key="region.name">
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
			<div class="fullWidthDiv kalos">
				<span>Kalos</span>
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
				address: 'kanto',
				preview: require('../../assets/Pokemon/Maps/previews/KantoPreview.png'),
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
				address: 'johto',
				preview: require('../../assets/Pokemon/Maps/previews/JohtoPreview.png'),
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
			},
			{
				name: "Hoenn",
				address: 'hoenn',
				preview: require('../../assets/Pokemon/Maps/previews/HoennPreview.png'),
				class:"hoenn",
				games:[
					{
						name:"R",
						class:"ruby"
					},
					{
						name:"S",
						class:"sapphire"
					},
					{
						name:"E",
						class:"emerald"
					}
				]
			},
			{
				name: "Kanto Remakes",
				address: 'kanto3',
				preview: require('../../assets/Pokemon/Maps/previews/Kanto3Preview.png'),
				class: "kanto3",
				games:[
					{
            name:"FR",
            class:"firered"
          },
          {
            name:"LG",
            class:"leafgreen"
          }
				]
			},
			{
				name: "Sinnoh",
				address: 'sinnoh',
				preview: require('../../assets/Pokemon/Maps/previews/SinnohPreview.png'),
				class: "sinnoh",
				games:[
					{
						name:"D",
						class:"diamond"
					},
					{
						name:"P",
						class:"pearl"
					},
					{
						name:"Pt",
						class:"platinum"
					}
				]
			},
			{
				name: "Johto Remakes",
				address: 'johto4',
				preview: require('../../assets/Pokemon/Maps/previews/Johto4Preview.png'),
				class: "johto",
				games:[
					{
						name:"HG",
						class:"heartgold"
					},
					{
						name:"SS",
						class:"soulsilver"
					}
				]
			},
			{
				name: "Unova",
				address: 'unova',
				preview: require('../../assets/Pokemon/Maps/previews/UnovaPreview.png'),
				class: "unova",
				games:[
					{
						name:"B",
						class:"black"
					},
					{
						name:"W",
						class:"white"
					}
				]
			},
			{
				name: "Unova Again",
				address: 'unova2',
				preview: require('../../assets/Pokemon/Maps/previews/Unova2Preview.png'),
				class: "unova2",
				games:[
					{
						name:"B2",
						class:"black2"
					},
					{
						name:"W2",
						class:"white2"
					}
				]
			}
		]
	}),
	methods: {
		Goto: function(destination) {
			window.location.href = "/pokemon/" + destination;
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
	min-height: 9rem;
	font-size: 4rem;
	text-align: center;
}
.direction-banner {
  user-select: none;
  cursor: pointer;
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
.hoenn {
	background-color: #103986;
}
.hoenn:hover {
	background-color: #123f91;
}
.kanto3 {
	background-color: #579152;
}
.kanto3:hover {
	background-color: #6c9468;
}
.sinnoh {
	background-color: #1d7e91;
}
.sinnoh:hover {
	background-color: #2999af;
}
.unova {
	background-color: #464646;
}
.unova:hover {
	background-color: #5a5a5a;
}
.unova2 {
	background-color: #c5c5c5;
	color: #5a5a5a;
}
.unova2:hover {
	background-color: #b1b1b1;
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
.gameIndicator.ruby {
  --gameColor: #db332a;
}
.gameIndicator.sapphire {
  --gameColor: #045aff;
}
.gameIndicator.emerald {
  --gameColor: #6ed926;
}
.gameIndicator.firered {
  --gameColor: #e83d3d;
}
.gameIndicator.leafgreen {
  --gameColor: #57d94c;
}
.gameIndicator.pearl {
	--gameColor: #ba80bf;
}
.gameIndicator.diamond {
	--gameColor: #8093bf;
}
.gameIndicator.platinum {
	--gameColor: #6f6f6f;
}
.gameIndicator.heartgold {
	--gameColor: #ccc916;
}
.gameIndicator.soulsilver {
	--gameColor: #bcbcbc;
}
.gameIndicator.black, .gameIndicator.black2 {
	--gameColor: #464646;
}
.gameIndicator.white, .gameIndicator.white2 {
	--gameColor: #c5c5c5;
}
</style>
