@tool
extends Node2D

@export var internalName = ''
@export var regionName = ''
@export var games = PackedStringArray()
@export var generation = 0
@export var maxDexIx = 0
@export var enableTimeHUD = false
@export var baseLocation = ''
@export var baseLocationID = 0
@export var offset = Vector2(0, 0)
@export var map = preload("res://PokemonMapRegioneer/Map/Kanto3_1.png")
@export_multiline var location_ids : String : get = get_loc, set = set_loc # (String, MULTILINE)

func getCurrentLocations():
	return get_children()

func set_loc(value):
	print("set")
	var i = 0
	var lines = value.split('\n')
	for location in getCurrentLocations():
		location.location_id = int(lines[i])
		i += 1

func get_loc():
	var text = ''
	for location in getCurrentLocations():
		text += str(location.location_id) + '\n'
	
	return text
