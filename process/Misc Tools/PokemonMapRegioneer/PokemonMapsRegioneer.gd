tool
extends Control

func getCurrentRegion():
	for child in $Polygons.get_children():
		if child.visible:
			return child


func calculate():
	$HBoxContainer/FinalJSON/RichTextLabel.text = calculateFinalJSON()
	$HBoxContainer/LocationList/HBoxContainer/RichTextLabel.text = calculateLocationList()


func getCurrentLocations():
	for child in $Polygons.get_children():
		if child.visible:
			return child.get_children()


func calculateFinalJSON():
	var region = getCurrentRegion()
	var r = {}
	r['name'] = region.internalName
	r['region'] = region.regionName
	r['games'] = region.games
	r['generation'] = region.generation
	r['maxDexIx'] = region.maxDexIx
	r['enableTimeHUD'] = region.enableTimeHUD
	r['baseLocation'] = [
		{
			'name': region.baseLocation,
			'location_id': region.baseLocationID
		}
	]
	r['aliases'] = []
	r['grassMapsLocationIds'] = []
	r['maps'] = []
	for polygon in getCurrentLocations():
		r['maps'].append({
			'name': polygon.name,
			'dimensions': [],
			'location_id': polygon.location_id
		})
		for coord in polygon.get("polygon"):
			r['maps'][-1]['dimensions'].append(coord.x + region.offset.x)
			r['maps'][-1]['dimensions'].append(coord.y + region.offset.y)
		if polygon.is_grass:
			r['grassMapsLocationIds'].append(polygon.location_id)
	
	return JSON.print(r)


func calculateLocationList():
	var text = ""
	for polygon in getCurrentLocations():
		text += polygon.name.to_lower().replace(' ', '-').replace('é', 'e').replace("'", '') + ' '
	
	return text


func _on_Polygons_visibility_changed():
	calculate()


func _on_map_vis():
	for child in $Polygons.get_children():
		if child.visible:
			$TextureRect.texture = child.map
			return
