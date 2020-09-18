<template>
	<div>
		<div class="fullWidthDiv">
			<span>Pokémon interactive maps</span>
		</div>
		<div class="full">
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
	</div>
</template>

<script>

export default {

}

</script>

<style>
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
.gamesSpec {
	position: absolute;
	margin-left: -14rem;
	width: 14rem;
	height: 9rem;
	display: flex;
	flex-direction: column;
}
.Kanto {
	background-color: #8a8a8a;
}
.gameIndicator {
	padding-right: 1.5rem;
  text-align: right;
  vertical-align: middle;
  color:whitesmoke;
}
.gameIndicator.red {
  background: linear-gradient(90deg, transparent 0%, #eb4034 100%);
}
.gameIndicator.blue {
	background: linear-gradient(90deg, transparent 0%, #3434eb 100%);
}
.gameIndicator.yellow {
	background: linear-gradient(90deg, transparent 0%, #e0c032 100%);
}
</style>
