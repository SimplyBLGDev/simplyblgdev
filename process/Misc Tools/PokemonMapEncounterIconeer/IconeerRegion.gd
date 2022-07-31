tool
extends Node2D

export var title = ''
export var region = ''
export var malePos = 0
export var url = ''
export(String, MULTILINE) var declaration_CSS = ''
export(String, MULTILINE) var CSS = ''
export(String, MULTILINE) var special_CSS = ''


func _on_IconeerRegion_visibility_changed():
	if get_parent().visible:
		reposition_children()
		generate_CSS()


func reposition_children():
	for child in $males.get_children():
		child.queue_free()
	
	for child in $icons.get_children():
		child.region_rect.size.y += child.region_rect.position.y
		child.region_rect.position.y = 0 # Expand region rect to top
		child.position = child.region_rect.position
		
		var counterpart = Sprite.new()
		counterpart.name = 'counterpart'
		counterpart.centered = false
		counterpart.texture = child.texture
		counterpart.region_enabled = true
		counterpart.region_rect = child.region_rect
		counterpart.region_rect.position.y = malePos
		counterpart.position = counterpart.region_rect.position
		$males.add_child(counterpart)
	
	for special in $specials.get_children():
		special.position = special.region_rect.position


func generate_CSS():
	generate_declaration_CSS()
	generate_regular_CSS()
	generate_special_CSS()


func generate_declaration_CSS():
	declaration_CSS	= ''
	declaration_CSS += '.' + region + '>.encounterIcon {\n'
	declaration_CSS += '\tbackground-image: url(../' + url + '.png);\n'
	declaration_CSS += '}\n'
	declaration_CSS += '.' + region + '.male>.encounterIcon {\n'
	declaration_CSS += '\t--y-pos: -' + str(malePos) + 'px;\n'
	declaration_CSS += '}\n'


func generate_regular_CSS():
	CSS = ''
	CSS += '/* ' + title + ' */\n'
	for icon in $icons.get_children():
		if icon.name == 'grass':
			CSS += '.' + region + '.grass>.encounterIcon.walk {\n'
		elif icon.name == 'fish':
			CSS += '.' + region + '>.encounterIcon.old-rod, .' + region + '>.encounterIcon.good-rod, .' + region + '>.encounterIcon.super-rod {\n'
		else:
			CSS += '.' + region + '>.encounterIcon.' + icon.name + ' {\n'
		CSS += '\twidth: ' + str(icon.region_rect.size.x) + 'px;\n'
		CSS += '\theight: ' + str(icon.region_rect.size.y) + 'px;\n'
		CSS += '\t--x-pos: -' + str(icon.region_rect.position.x) + 'px;\n'
		CSS += '}\n'
	CSS += '\n'


func generate_special_CSS():
	special_CSS = ''
	special_CSS += '/* ' + title + ' Specials */\n'
	for icon in $specials.get_children():
		special_CSS += '.' + region + '>.encounterIcon.only-one.' + icon.name + ' {\n'
		special_CSS += '\twidth: ' + str(icon.region_rect.size.x) + 'px;\n'
		special_CSS += '\theight: ' + str(icon.region_rect.size.y) + 'px;\n'
		special_CSS += '\t--x-pos: -' + str(icon.region_rect.position.x) + 'px;\n'
		special_CSS += '\t--y-pos: -' + str(icon.region_rect.position.y) + 'px;\n'
		special_CSS += '}\n'
	special_CSS += '\n'
