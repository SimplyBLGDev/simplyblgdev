<template>
	<div>
		<div class="fullWidthDiv">
			<span>Pokémon interactive maps</span>
		</div>
		<div class="full" @click="Goto('Kanto')">
			<div style="float:left">
				<img class="mapSpec" src='../../assets/Pokemon/Maps/KantoPreview.png'>
			</div>
			<div style="float:right">
				<div class="gamesSpec">
					<table style="width: 100%; height: 100%">
						<tbody>
							<tr>
								<td class="gameIndicator red"><b>R</b></td>
							</tr>
							<tr>
								<td class="gameIndicator blue"><b>B</b></td>
							</tr>
							<tr>
								<td class="gameIndicator yellow"><b>Y</b></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="fullWidthDiv Kanto">
				<span>Kanto</span>
			</div>
		</div>

		<div class="full">
			<div style="position: absolute; width: 100%; height: 9rem;display: flex;align-items: center;text-align: center;justify-content: center;background-color: #444444bb;">
				<span style="transform: rotate(20deg); font-size:4rem;">WIP</span>
			</div>
			<div class="fullWidthDiv Johto">
				<span>Johto</span>
			</div>
		</div>
	</div>
</template>

<script>

export default {
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
	margin-top:2rem;
	margin-bottom:2rem;
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
.Kanto {
	background-color: #5c5c5c;
}
.Kanto:hover {
	background-color: #757575;
}
.Johto {
	background-color: #2c83bd;
}
.Johto:hover {
	background-color: #3393d3;
}
.gameIndicator {
	padding-right: 1.5rem;
  text-align: right;
  vertical-align: middle;
  color:whitesmoke;
}
.gameIndicator.red {
  background: linear-gradient(90deg, rgba(255,255,255,0) 20%, rgba(235,64,52,1) 90%, rgba(235,64,52,1) 100%);
}
.gameIndicator.blue {
	background: linear-gradient(90deg, rgba(255,255,255,0) 20%, rgba(52,52,235,1) 90%, rgba(52,52,235,1) 100%);
}
.gameIndicator.yellow {
	background: linear-gradient(90deg, rgba(255,255,255,0) 20%, rgba(224,192,50,1) 90%, rgba(224,192,50,1) 100%);
}
.gameIndicator.red:hover {
  background: linear-gradient(90deg, rgba(255,255,255,0) 5%, rgba(235,64,52,1) 90%, rgba(235,64,52,1) 100%);
}
.gameIndicator.blue:hover {
	background: linear-gradient(90deg, rgba(255,255,255,0) 5%, rgba(52,52,235,1) 90%, rgba(52,52,235,1) 100%);
}
.gameIndicator.yellow:hover {
	background: linear-gradient(90deg, rgba(255,255,255,0) 5%, rgba(224,192,50,1) 90%, rgba(224,192,50,1) 100%);
}
</style>
