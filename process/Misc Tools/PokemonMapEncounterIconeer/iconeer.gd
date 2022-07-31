tool
extends Node2D

export(String, MULTILINE) var result = ''


func _on_Iconeer_visibility_changed():
	if visible:
		calculate_result()


func calculate_result():
	result = ''
	result += '.encounterIcon {\n'
	result += '\timage-rendering: pixelated;\n'
	result += '\ttransform: scale(2);\n'
	result += '\tmargin-right: 12px;\n'
	result += '\tborder-radius: 0;\n'
	result += '\t--y-pos: 0px;\n'
	result += '\t--x-pos: 0px;\n'
	result += '\tbackground-position: var(--x-pos) var(--y-pos);\n'
	result += '}\n\n'
	
	for region in get_children():
		result += region.declaration_CSS
	
	result += '\n'
	for region in get_children():
		result += region.CSS
		result += '\n'
	
	result += '/* ------------------------Special------------------------ */'
	
	for region in get_children():
		result += region.special_CSS
		result += '\n'
