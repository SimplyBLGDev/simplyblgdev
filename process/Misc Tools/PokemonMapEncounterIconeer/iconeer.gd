tool
extends TileMap

export var activate = false setget activate
export var pRegion = ''

func activate(value):
	$RichTextLabel.text = ""
	for tile in tile_set.get_tiles_ids():
		var title = tile_set.tile_get_name(tile)
		var region = tile_set.tile_get_region(tile)
		if title == 'fish':
			$RichTextLabel.text += '.' + pRegion + '>.encounterIcon.old-rod, '
			$RichTextLabel.text += '.' + pRegion + '>.encounterIcon.good-rod, '
			$RichTextLabel.text += '.' + pRegion + '>.encounterIcon.super-rod {\n'
		elif title == 'grass':
			$RichTextLabel.text += '.' + pRegion + '.grass>.encounterIcon.walk {\n'
		else:
			$RichTextLabel.text += '.' + pRegion + '>.encounterIcon.' + title + ' {\n'
		$RichTextLabel.text += '\twidth: ' + str(int(region.size.x)) + 'px;\n'
		$RichTextLabel.text += '\theight: ' + str(int(region.size.y)) + 'px;\n'
		$RichTextLabel.text += '\t--x-pos: -' + str(int(region.position.x)) + 'px;\n'
		if region.position.y != 0:
			$RichTextLabel.text += '\t--y-pos: -' + str(int(region.position.y)) + 'px;\n'
		$RichTextLabel.text += '}\n'
