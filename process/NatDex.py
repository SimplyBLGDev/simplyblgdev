from traceback import format_exception


NATDEX = {
    1: 'BULBASAUR',
    2: 'IVYSAUR',
    3: 'VENUSAUR',
    4: 'CHARMANDER',
    5: 'CHARMELEON',
    6: 'CHARIZARD',
    7: 'SQUIRTLE',
    8: 'WARTORTLE',
    9: 'BLASTOISE',
    10: 'CATERPIE',
    11: 'METAPOD',
    12: 'BUTTERFREE',
    13: 'WEEDLE',
    14: 'KAKUNA',
    15: 'BEEDRILL',
    16: 'PIDGEY',
    17: 'PIDGEOTTO',
    18: 'PIDGEOT',
    19: 'RATTATA',
    20: 'RATICATE',
    21: 'SPEAROW',
    22: 'FEAROW',
    23: 'EKANS',
    24: 'ARBOK',
    25: 'PIKACHU',
    26: 'RAICHU',
    27: 'SANDSHREW',
    28: 'SANDSLASH',
    29: 'NIDORAN_F',
    30: 'NIDORINA',
    31: 'NIDOQUEEN',
    32: 'NIDORAN_M',
    33: 'NIDORINO',
    34: 'NIDOKING',
    35: 'CLEFAIRY',
    36: 'CLEFABLE',
    37: 'VULPIX',
    38: 'NINETALES',
    39: 'JIGGLYPUFF',
    40: 'WIGGLYTUFF',
    41: 'ZUBAT',
    42: 'GOLBAT',
    43: 'ODDISH',
    44: 'GLOOM',
    45: 'VILEPLUME',
    46: 'PARAS',
    47: 'PARASECT',
    48: 'VENONAT',
    49: 'VENOMOTH',
    50: 'DIGLETT',
    51: 'DUGTRIO',
    52: 'MEOWTH',
    53: 'PERSIAN',
    54: 'PSYDUCK',
    55: 'GOLDUCK',
    56: 'MANKEY',
    57: 'PRIMEAPE',
    58: 'GROWLITHE',
    59: 'ARCANINE',
    60: 'POLIWAG',
    61: 'POLIWHIRL',
    62: 'POLIWRATH',
    63: 'ABRA',
    64: 'KADABRA',
    65: 'ALAKAZAM',
    66: 'MACHOP',
    67: 'MACHOKE',
    68: 'MACHAMP',
    69: 'BELLSPROUT',
    70: 'WEEPINBELL',
    71: 'VICTREEBEL',
    72: 'TENTACOOL',
    73: 'TENTACRUEL',
    74: 'GEODUDE',
    75: 'GRAVELER',
    76: 'GOLEM',
    77: 'PONYTA',
    78: 'RAPIDASH',
    79: 'SLOWPOKE',
    80: 'SLOWBRO',
    81: 'MAGNEMITE',
    82: 'MAGNETON',
    83: 'FARFETCHD',
    84: 'DODUO',
    85: 'DODRIO',
    86: 'SEEL',
    87: 'DEWGONG',
    88: 'GRIMER',
    89: 'MUK',
    90: 'SHELLDER',
    91: 'CLOYSTER',
    92: 'GASTLY',
    93: 'HAUNTER',
    94: 'GENGAR',
    95: 'ONIX',
    96: 'DROWZEE',
    97: 'HYPNO',
    98: 'KRABBY',
    99: 'KINGLER',
    100: 'VOLTORB',
    101: 'ELECTRODE',
    102: 'EXEGGCUTE',
    103: 'EXEGGUTOR',
    104: 'CUBONE',
    105: 'MAROWAK',
    106: 'HITMONLEE',
    107: 'HITMONCHAN',
    108: 'LICKITUNG',
    109: 'KOFFING',
    110: 'WEEZING',
    111: 'RHYHORN',
    112: 'RHYDON',
    113: 'CHANSEY',
    114: 'TANGELA',
    115: 'KANGASKHAN',
    116: 'HORSEA',
    117: 'SEADRA',
    118: 'GOLDEEN',
    119: 'SEAKING',
    120: 'STARYU',
    121: 'STARMIE',
    122: 'MR_MIME',
    123: 'SCYTHER',
    124: 'JYNX',
    125: 'ELECTABUZZ',
    126: 'MAGMAR',
    127: 'PINSIR',
    128: 'TAUROS',
    129: 'MAGIKARP',
    130: 'GYARADOS',
    131: 'LAPRAS',
    132: 'DITTO',
    133: 'EEVEE',
    134: 'VAPOREON',
    135: 'JOLTEON',
    136: 'FLAREON',
    137: 'PORYGON',
    138: 'OMANYTE',
    139: 'OMASTAR',
    140: 'KABUTO',
    141: 'KABUTOPS',
    142: 'AERODACTYL',
    143: 'SNORLAX',
    144: 'ARTICUNO',
    145: 'ZAPDOS',
    146: 'MOLTRES',
    147: 'DRATINI',
    148: 'DRAGONAIR',
    149: 'DRAGONITE',
    150: 'MEWTWO',
    151: 'MEW',
    152: 'CHIKORITA',
    153: 'BAYLEEF',
    154: 'MEGANIUM',
    155: 'CYNDAQUIL',
    156: 'QUILAVA',
    157: 'TYPHLOSION',
    158: 'TOTODILE',
    159: 'CROCONAW',
    160: 'FERALIGATR',
    161: 'SENTRET',
    162: 'FURRET',
    163: 'HOOTHOOT',
    164: 'NOCTOWL',
    165: 'LEDYBA',
    166: 'LEDIAN',
    167: 'SPINARAK',
    168: 'ARIADOS',
    169: 'CROBAT',
    170: 'CHINCHOU',
    171: 'LANTURN',
    172: 'PICHU',
    173: 'CLEFFA',
    174: 'IGGLYBUFF',
    175: 'TOGEPI',
    176: 'TOGETIC',
    177: 'NATU',
    178: 'XATU',
    179: 'MAREEP',
    180: 'FLAAFFY',
    181: 'AMPHAROS',
    182: 'BELLOSSOM',
    183: 'MARILL',
    184: 'AZUMARILL',
    185: 'SUDOWOODO',
    186: 'POLITOED',
    187: 'HOPPIP',
    188: 'SKIPLOOM',
    189: 'JUMPLUFF',
    190: 'AIPOM',
    191: 'SUNKERN',
    192: 'SUNFLORA',
    193: 'YANMA',
    194: 'WOOPER',
    195: 'QUAGSIRE',
    196: 'ESPEON',
    197: 'UMBREON',
    198: 'MURKROW',
    199: 'SLOWKING',
    200: 'MISDREAVUS',
    201: 'UNOWN',
    202: 'WOBBUFFET',
    203: 'GIRAFARIG',
    204: 'PINECO',
    205: 'FORRETRESS',
    206: 'DUNSPARCE',
    207: 'GLIGAR',
    208: 'STEELIX',
    209: 'SNUBBULL',
    210: 'GRANBULL',
    211: 'QWILFISH',
    212: 'SCIZOR',
    213: 'SHUCKLE',
    214: 'HERACROSS',
    215: 'SNEASEL',
    216: 'TEDDIURSA',
    217: 'URSARING',
    218: 'SLUGMA',
    219: 'MAGCARGO',
    220: 'SWINUB',
    221: 'PILOSWINE',
    222: 'CORSOLA',
    223: 'REMORAID',
    224: 'OCTILLERY',
    225: 'DELIBIRD',
    226: 'MANTINE',
    227: 'SKARMORY',
    228: 'HOUNDOUR',
    229: 'HOUNDOOM',
    230: 'KINGDRA',
    231: 'PHANPY',
    232: 'DONPHAN',
    233: 'PORYGON2',
    234: 'STANTLER',
    235: 'SMEARGLE',
    236: 'TYROGUE',
    237: 'HITMONTOP',
    238: 'SMOOCHUM',
    239: 'ELEKID',
    240: 'MAGBY',
    241: 'MILTANK',
    242: 'BLISSEY',
    243: 'RAIKOU',
    244: 'ENTEI',
    245: 'SUICUNE',
    246: 'LARVITAR',
    247: 'PUPITAR',
    248: 'TYRANITAR',
    249: 'LUGIA',
    250: 'HO_OH',
    251: 'CELEBI',
    252: 'TREECKO',
    253: 'GROVYLE',
    254: 'SCEPTILE',
    255: 'TORCHIC',
    256: 'COMBUSKEN',
    257: 'BLAZIKEN',
    258: 'MUDKIP',
    259: 'MARSHTOMP',
    260: 'SWAMPERT',
    261: 'POOCHYENA',
    262: 'MIGHTYENA',
    263: 'ZIGZAGOON',
    264: 'LINOONE',
    265: 'WURMPLE',
    266: 'SILCOON',
    267: 'BEAUTIFLY',
    268: 'CASCOON',
    269: 'DUSTOX',
    270: 'LOTAD',
    271: 'LOMBRE',
    272: 'LUDICOLO',
    273: 'SEEDOT',
    274: 'NUZLEAF',
    275: 'SHIFTRY',
    276: 'TAILLOW',
    277: 'SWELLOW',
    278: 'WINGULL',
    279: 'PELIPPER',
    280: 'RALTS',
    281: 'KIRLIA',
    282: 'GARDEVOIR',
    283: 'SURSKIT',
    284: 'MASQUERAIN',
    285: 'SHROOMISH',
    286: 'BRELOOM',
    287: 'SLAKOTH',
    288: 'VIGOROTH',
    289: 'SLAKING',
    290: 'NINCADA',
    291: 'NINJASK',
    292: 'SHEDINJA',
    293: 'WHISMUR',
    294: 'LOUDRED',
    295: 'EXPLOUD',
    296: 'MAKUHITA',
    297: 'HARIYAMA',
    298: 'AZURILL',
    299: 'NOSEPASS',
    300: 'SKITTY',
    301: 'DELCATTY',
    302: 'SABLEYE',
    303: 'MAWILE',
    304: 'ARON',
    305: 'LAIRON',
    306: 'AGGRON',
    307: 'MEDITITE',
    308: 'MEDICHAM',
    309: 'ELECTRIKE',
    310: 'MANECTRIC',
    311: 'PLUSLE',
    312: 'MINUN',
    313: 'VOLBEAT',
    314: 'ILLUMISE',
    315: 'ROSELIA',
    316: 'GULPIN',
    317: 'SWALOT',
    318: 'CARVANHA',
    319: 'SHARPEDO',
    320: 'WAILMER',
    321: 'WAILORD',
    322: 'NUMEL',
    323: 'CAMERUPT',
    324: 'TORKOAL',
    325: 'SPOINK',
    326: 'GRUMPIG',
    327: 'SPINDA',
    328: 'TRAPINCH',
    329: 'VIBRAVA',
    330: 'FLYGON',
    331: 'CACNEA',
    332: 'CACTURNE',
    333: 'SWABLU',
    334: 'ALTARIA',
    335: 'ZANGOOSE',
    336: 'SEVIPER',
    337: 'LUNATONE',
    338: 'SOLROCK',
    339: 'BARBOACH',
    340: 'WHISCASH',
    341: 'CORPHISH',
    342: 'CRAWDAUNT',
    343: 'BALTOY',
    344: 'CLAYDOL',
    345: 'LILEEP',
    346: 'CRADILY',
    347: 'ANORITH',
    348: 'ARMALDO',
    349: 'FEEBAS',
    350: 'MILOTIC',
    351: 'CASTFORM',
    352: 'KECLEON',
    353: 'SHUPPET',
    354: 'BANETTE',
    355: 'DUSKULL',
    356: 'DUSCLOPS',
    357: 'TROPIUS',
    358: 'CHIMECHO',
    359: 'ABSOL',
    360: 'WYNAUT',
    361: 'SNORUNT',
    362: 'GLALIE',
    363: 'SPHEAL',
    364: 'SEALEO',
    365: 'WALREIN',
    366: 'CLAMPERL',
    367: 'HUNTAIL',
    368: 'GOREBYSS',
    369: 'RELICANTH',
    370: 'LUVDISC',
    371: 'BAGON',
    372: 'SHELGON',
    373: 'SALAMENCE',
    374: 'BELDUM',
    375: 'METANG',
    376: 'METAGROSS',
    377: 'REGIROCK',
    378: 'REGICE',
    379: 'REGISTEEL',
    380: 'LATIAS',
    381: 'LATIOS',
    382: 'KYOGRE',
    383: 'GROUDON',
    384: 'RAYQUAZA',
    385: 'JIRACHI',
    386: 'DEOXYS_NORMAL',
    387: 'TURTWIG',
    388: 'GROTLE',
    389: 'TORTERRA',
    390: 'CHIMCHAR',
    391: 'MONFERNO',
    392: 'INFERNAPE',
    393: 'PIPLUP',
    394: 'PRINPLUP',
    395: 'EMPOLEON',
    396: 'STARLY',
    397: 'STARAVIA',
    398: 'STARAPTOR',
    399: 'BIDOOF',
    400: 'BIBAREL',
    401: 'KRICKETOT',
    402: 'KRICKETUNE',
    403: 'SHINX',
    404: 'LUXIO',
    405: 'LUXRAY',
    406: 'BUDEW',
    407: 'ROSERADE',
    408: 'CRANIDOS',
    409: 'RAMPARDOS',
    410: 'SHIELDON',
    411: 'BASTIODON',
    412: 'BURMY',
    413: 'WORMADAM_PLANT',
    414: 'MOTHIM',
    415: 'COMBEE',
    416: 'VESPIQUEN',
    417: 'PACHIRISU',
    418: 'BUIZEL',
    419: 'FLOATZEL',
    420: 'CHERUBI',
    421: 'CHERRIM',
    422: 'SHELLOS',
    423: 'GASTRODON',
    424: 'AMBIPOM',
    425: 'DRIFLOON',
    426: 'DRIFBLIM',
    427: 'BUNEARY',
    428: 'LOPUNNY',
    429: 'MISMAGIUS',
    430: 'HONCHKROW',
    431: 'GLAMEOW',
    432: 'PURUGLY',
    433: 'CHINGLING',
    434: 'STUNKY',
    435: 'SKUNTANK',
    436: 'BRONZOR',
    437: 'BRONZONG',
    438: 'BONSLY',
    439: 'MIME_JR',
    440: 'HAPPINY',
    441: 'CHATOT',
    442: 'SPIRITOMB',
    443: 'GIBLE',
    444: 'GABITE',
    445: 'GARCHOMP',
    446: 'MUNCHLAX',
    447: 'RIOLU',
    448: 'LUCARIO',
    449: 'HIPPOPOTAS',
    450: 'HIPPOWDON',
    451: 'SKORUPI',
    452: 'DRAPION',
    453: 'CROAGUNK',
    454: 'TOXICROAK',
    455: 'CARNIVINE',
    456: 'FINNEON',
    457: 'LUMINEON',
    458: 'MANTYKE',
    459: 'SNOVER',
    460: 'ABOMASNOW',
    461: 'WEAVILE',
    462: 'MAGNEZONE',
    463: 'LICKILICKY',
    464: 'RHYPERIOR',
    465: 'TANGROWTH',
    466: 'ELECTIVIRE',
    467: 'MAGMORTAR',
    468: 'TOGEKISS',
    469: 'YANMEGA',
    470: 'LEAFEON',
    471: 'GLACEON',
    472: 'GLISCOR',
    473: 'MAMOSWINE',
    474: 'PORYGON_Z',
    475: 'GALLADE',
    476: 'PROBOPASS',
    477: 'DUSKNOIR',
    478: 'FROSLASS',
    479: 'ROTOM',
    480: 'UXIE',
    481: 'MESPRIT',
    482: 'AZELF',
    483: 'DIALGA',
    484: 'PALKIA',
    485: 'HEATRAN',
    486: 'REGIGIGAS',
    487: 'GIRATINA_ALTERED',
    488: 'CRESSELIA',
    489: 'PHIONE',
    490: 'MANAPHY',
    491: 'DARKRAI',
    492: 'SHAYMIN_LAND',
    493: 'ARCEUS',
    494: 'VICTINI',
    495: 'SNIVY',
    496: 'SERVINE',
    497: 'SERPERIOR',
    498: 'TEPIG',
    499: 'PIGNITE',
    500: 'EMBOAR',
    501: 'OSHAWOTT',
    502: 'DEWOTT',
    503: 'SAMUROTT',
    504: 'PATRAT',
    505: 'WATCHOG',
    506: 'LILLIPUP',
    507: 'HERDIER',
    508: 'STOUTLAND',
    509: 'PURRLOIN',
    510: 'LIEPARD',
    511: 'PANSAGE',
    512: 'SIMISAGE',
    513: 'PANSEAR',
    514: 'SIMISEAR',
    515: 'PANPOUR',
    516: 'SIMIPOUR',
    517: 'MUNNA',
    518: 'MUSHARNA',
    519: 'PIDOVE',
    520: 'TRANQUILL',
    521: 'UNFEZANT',
    522: 'BLITZLE',
    523: 'ZEBSTRIKA',
    524: 'ROGGENROLA',
    525: 'BOLDORE',
    526: 'GIGALITH',
    527: 'WOOBAT',
    528: 'SWOOBAT',
    529: 'DRILBUR',
    530: 'EXCADRILL',
    531: 'AUDINO',
    532: 'TIMBURR',
    533: 'GURDURR',
    534: 'CONKELDURR',
    535: 'TYMPOLE',
    536: 'PALPITOAD',
    537: 'SEISMITOAD',
    538: 'THROH',
    539: 'SAWK',
    540: 'SEWADDLE',
    541: 'SWADLOON',
    542: 'LEAVANNY',
    543: 'VENIPEDE',
    544: 'WHIRLIPEDE',
    545: 'SCOLIPEDE',
    546: 'COTTONEE',
    547: 'WHIMSICOTT',
    548: 'PETILIL',
    549: 'LILLIGANT',
    550: 'BASCULIN_RED_STRIPED',
    551: 'SANDILE',
    552: 'KROKOROK',
    553: 'KROOKODILE',
    554: 'DARUMAKA',
    555: 'DARMANITAN_STANDARD',
    556: 'MARACTUS',
    557: 'DWEBBLE',
    558: 'CRUSTLE',
    559: 'SCRAGGY',
    560: 'SCRAFTY',
    561: 'SIGILYPH',
    562: 'YAMASK',
    563: 'COFAGRIGUS',
    564: 'TIRTOUGA',
    565: 'CARRACOSTA',
    566: 'ARCHEN',
    567: 'ARCHEOPS',
    568: 'TRUBBISH',
    569: 'GARBODOR',
    570: 'ZORUA',
    571: 'ZOROARK',
    572: 'MINCCINO',
    573: 'CINCCINO',
    574: 'GOTHITA',
    575: 'GOTHORITA',
    576: 'GOTHITELLE',
    577: 'SOLOSIS',
    578: 'DUOSION',
    579: 'REUNICLUS',
    580: 'DUCKLETT',
    581: 'SWANNA',
    582: 'VANILLITE',
    583: 'VANILLISH',
    584: 'VANILLUXE',
    585: 'DEERLING',
    586: 'SAWSBUCK',
    587: 'EMOLGA',
    588: 'KARRABLAST',
    589: 'ESCAVALIER',
    590: 'FOONGUS',
    591: 'AMOONGUSS',
    592: 'FRILLISH',
    593: 'JELLICENT',
    594: 'ALOMOMOLA',
    595: 'JOLTIK',
    596: 'GALVANTULA',
    597: 'FERROSEED',
    598: 'FERROTHORN',
    599: 'KLINK',
    600: 'KLANG',
    601: 'KLINKLANG',
    602: 'TYNAMO',
    603: 'EELEKTRIK',
    604: 'EELEKTROSS',
    605: 'ELGYEM',
    606: 'BEHEEYEM',
    607: 'LITWICK',
    608: 'LAMPENT',
    609: 'CHANDELURE',
    610: 'AXEW',
    611: 'FRAXURE',
    612: 'HAXORUS',
    613: 'CUBCHOO',
    614: 'BEARTIC',
    615: 'CRYOGONAL',
    616: 'SHELMET',
    617: 'ACCELGOR',
    618: 'STUNFISK',
    619: 'MIENFOO',
    620: 'MIENSHAO',
    621: 'DRUDDIGON',
    622: 'GOLETT',
    623: 'GOLURK',
    624: 'PAWNIARD',
    625: 'BISHARP',
    626: 'BOUFFALANT',
    627: 'RUFFLET',
    628: 'BRAVIARY',
    629: 'VULLABY',
    630: 'MANDIBUZZ',
    631: 'HEATMOR',
    632: 'DURANT',
    633: 'DEINO',
    634: 'ZWEILOUS',
    635: 'HYDREIGON',
    636: 'LARVESTA',
    637: 'VOLCARONA',
    638: 'COBALION',
    639: 'TERRAKION',
    640: 'VIRIZION',
    641: 'TORNADUS_INCARNATE',
    642: 'THUNDURUS_INCARNATE',
    643: 'RESHIRAM',
    644: 'ZEKROM',
    645: 'LANDORUS_INCARNATE',
    646: 'KYUREM',
    647: 'KELDEO_ORDINARY',
    648: 'MELOETTA_ARIA',
    649: 'GENESECT',
    650: 'CHESPIN',
    651: 'QUILLADIN',
    652: 'CHESNAUGHT',
    653: 'FENNEKIN',
    654: 'BRAIXEN',
    655: 'DELPHOX',
    656: 'FROAKIE',
    657: 'FROGADIER',
    658: 'GRENINJA',
    659: 'BUNNELBY',
    660: 'DIGGERSBY',
    661: 'FLETCHLING',
    662: 'FLETCHINDER',
    663: 'TALONFLAME',
    664: 'SCATTERBUG',
    665: 'SPEWPA',
    666: 'VIVILLON',
    667: 'LITLEO',
    668: 'PYROAR',
    669: 'FLABEBE',
    670: 'FLOETTE',
    671: 'FLORGES',
    672: 'SKIDDO',
    673: 'GOGOAT',
    674: 'PANCHAM',
    675: 'PANGORO',
    676: 'FURFROU',
    677: 'ESPURR',
    678: 'MEOWSTIC_MALE',
    679: 'HONEDGE',
    680: 'DOUBLADE',
    681: 'AEGISLASH_SHIELD',
    682: 'SPRITZEE',
    683: 'AROMATISSE',
    684: 'SWIRLIX',
    685: 'SLURPUFF',
    686: 'INKAY',
    687: 'MALAMAR',
    688: 'BINACLE',
    689: 'BARBARACLE',
    690: 'SKRELP',
    691: 'DRAGALGE',
    692: 'CLAUNCHER',
    693: 'CLAWITZER',
    694: 'HELIOPTILE',
    695: 'HELIOLISK',
    696: 'TYRUNT',
    697: 'TYRANTRUM',
    698: 'AMAURA',
    699: 'AURORUS',
    700: 'SYLVEON',
    701: 'HAWLUCHA',
    702: 'DEDENNE',
    703: 'CARBINK',
    704: 'GOOMY',
    705: 'SLIGGOO',
    706: 'GOODRA',
    707: 'KLEFKI',
    708: 'PHANTUMP',
    709: 'TREVENANT',
    710: 'PUMPKABOO_AVERAGE',
    711: 'GOURGEIST_AVERAGE',
    712: 'BERGMITE',
    713: 'AVALUGG',
    714: 'NOIBAT',
    715: 'NOIVERN',
    716: 'XERNEAS',
    717: 'YVELTAL',
    718: 'ZYGARDE_50',
    719: 'DIANCIE',
    720: 'HOOPA',
    721: 'VOLCANION',
    722: 'ROWLET',
    723: 'DARTRIX',
    724: 'DECIDUEYE',
    725: 'LITTEN',
    726: 'TORRACAT',
    727: 'INCINEROAR',
    728: 'POPPLIO',
    729: 'BRIONNE',
    730: 'PRIMARINA',
    731: 'PIKIPEK',
    732: 'TRUMBEAK',
    733: 'TOUCANNON',
    734: 'YUNGOOS',
    735: 'GUMSHOOS',
    736: 'GRUBBIN',
    737: 'CHARJABUG',
    738: 'VIKAVOLT',
    739: 'CRABRAWLER',
    740: 'CRABOMINABLE',
    741: 'ORICORIO_BAILE',
    742: 'CUTIEFLY',
    743: 'RIBOMBEE',
    744: 'ROCKRUFF',
    745: 'LYCANROC_MIDDAY',
    746: 'WISHIWASHI_SOLO',
    747: 'MAREANIE',
    748: 'TOXAPEX',
    749: 'MUDBRAY',
    750: 'MUDSDALE',
    751: 'DEWPIDER',
    752: 'ARAQUANID',
    753: 'FOMANTIS',
    754: 'LURANTIS',
    755: 'MORELULL',
    756: 'SHIINOTIC',
    757: 'SALANDIT',
    758: 'SALAZZLE',
    759: 'STUFFUL',
    760: 'BEWEAR',
    761: 'BOUNSWEET',
    762: 'STEENEE',
    763: 'TSAREENA',
    764: 'COMFEY',
    765: 'ORANGURU',
    766: 'PASSIMIAN',
    767: 'WIMPOD',
    768: 'GOLISOPOD',
    769: 'SANDYGAST',
    770: 'PALOSSAND',
    771: 'PYUKUMUKU',
    772: 'TYPE_NULL',
    773: 'SILVALLY',
    774: 'MINIOR_RED_METEOR',
    775: 'KOMALA',
    776: 'TURTONATOR',
    777: 'TOGEDEMARU',
    778: 'MIMIKYU_DISGUISED',
    779: 'BRUXISH',
    780: 'DRAMPA',
    781: 'DHELMISE',
    782: 'JANGMO_O',
    783: 'HAKAMO_O',
    784: 'KOMMO_O',
    785: 'TAPU_KOKO',
    786: 'TAPU_LELE',
    787: 'TAPU_BULU',
    788: 'TAPU_FINI',
    789: 'COSMOG',
    790: 'COSMOEM',
    791: 'SOLGALEO',
    792: 'LUNALA',
    793: 'NIHILEGO',
    794: 'BUZZWOLE',
    795: 'PHEROMOSA',
    796: 'XURKITREE',
    797: 'CELESTEELA',
    798: 'KARTANA',
    799: 'GUZZLORD',
    800: 'NECROZMA',
    801: 'MAGEARNA',
    802: 'MARSHADOW',
    803: 'POIPOLE',
    804: 'NAGANADEL',
    805: 'STAKATAKA',
    806: 'BLACEPHALON',
    807: 'ZERAORA',
    808: 'MELTAN',
    809: 'MELMETAL',
    810: 'GROOKEY',
    811: 'THWACKEY',
    812: 'RILLABOOM',
    813: 'SCORBUNNY',
    814: 'RABOOT',
    815: 'CINDERACE',
    816: 'SOBBLE',
    817: 'DRIZZILE',
    818: 'INTELEON',
    819: 'SKWOVET',
    820: 'GREEDENT',
    821: 'ROOKIDEE',
    822: 'CORVISQUIRE',
    823: 'CORVIKNIGHT',
    824: 'BLIPBUG',
    825: 'DOTTLER',
    826: 'ORBEETLE',
    827: 'NICKIT',
    828: 'THIEVUL',
    829: 'GOSSIFLEUR',
    830: 'ELDEGOSS',
    831: 'WOOLOO',
    832: 'DUBWOOL',
    833: 'CHEWTLE',
    834: 'DREDNAW',
    835: 'YAMPER',
    836: 'BOLTUND',
    837: 'ROLYCOLY',
    838: 'CARKOL',
    839: 'COALOSSAL',
    840: 'APPLIN',
    841: 'FLAPPLE',
    842: 'APPLETUN',
    843: 'SILICOBRA',
    844: 'SANDACONDA',
    845: 'CRAMORANT',
    846: 'ARROKUDA',
    847: 'BARRASKEWDA',
    848: 'TOXEL',
    849: 'TOXTRICITY_AMPED',
    850: 'SIZZLIPEDE',
    851: 'CENTISKORCH',
    852: 'CLOBBOPUS',
    853: 'GRAPPLOCT',
    854: 'SINISTEA',
    855: 'POLTEAGEIST',
    856: 'HATENNA',
    857: 'HATTREM',
    858: 'HATTERENE',
    859: 'IMPIDIMP',
    860: 'MORGREM',
    861: 'GRIMMSNARL',
    862: 'OBSTAGOON',
    863: 'PERRSERKER',
    864: 'CURSOLA',
    865: 'SIRFETCHD',
    866: 'MR_RIME',
    867: 'RUNERIGUS',
    868: 'MILCERY',
    869: 'ALCREMIE',
    870: 'FALINKS',
    871: 'PINCURCHIN',
    872: 'SNOM',
    873: 'FROSMOTH',
    874: 'STONJOURNER',
    875: 'EISCUE_ICE',
    876: 'INDEEDEE_MALE',
    877: 'MORPEKO_FULL_BELLY',
    878: 'CUFANT',
    879: 'COPPERAJAH',
    880: 'DRACOZOLT',
    881: 'ARCTOZOLT',
    882: 'DRACOVISH',
    883: 'ARCTOVISH',
    884: 'DURALUDON',
    885: 'DREEPY',
    886: 'DRAKLOAK',
    887: 'DRAGAPULT',
    888: 'ZACIAN',
    889: 'ZAMAZENTA',
    890: 'ETERNATUS',
    891: 'KUBFU',
    892: 'URSHIFU_SINGLE_STRIKE',
    893: 'ZARUDE',
    894: 'REGIELEKI',
    895: 'REGIDRAGO',
    896: 'GLASTRIER',
    897: 'SPECTRIER',
    898: 'CALYREX',
    899: 'WYRDEER',
    900: 'KLEAVOR',
    901: 'URSALUNA',
    902: 'BASCULEGION_MALE',
    903: 'SNEASLER',
    904: 'OVERQWIL',
    905: 'ENAMORUS_INCARNATE',
    10001: 'DEOXYS_ATTACK',
    10002: 'DEOXYS_DEFENSE',
    10003: 'DEOXYS_SPEED',
    10004: 'WORMADAM_SANDY',
    10005: 'WORMADAM_TRASH',
    10006: 'SHAYMIN_SKY',
    10007: 'GIRATINA_ORIGIN',
    10008: 'ROTOM_HEAT',
    10009: 'ROTOM_WASH',
    10010: 'ROTOM_FROST',
    10011: 'ROTOM_FAN',
    10012: 'ROTOM_MOW',
    10013: 'CASTFORM_SUNNY',
    10014: 'CASTFORM_RAINY',
    10015: 'CASTFORM_SNOWY',
    10016: 'BASCULIN_BLUE_STRIPED',
    10017: 'DARMANITAN_ZEN',
    10018: 'MELOETTA_PIROUETTE',
    10019: 'TORNADUS_THERIAN',
    10020: 'THUNDURUS_THERIAN',
    10021: 'LANDORUS_THERIAN',
    10022: 'KYUREM_BLACK',
    10023: 'KYUREM_WHITE',
    10024: 'KELDEO_RESOLUTE',
    10025: 'MEOWSTIC_FEMALE',
    10026: 'AEGISLASH_BLADE',
    10027: 'PUMPKABOO_SMALL',
    10028: 'PUMPKABOO_LARGE',
    10029: 'PUMPKABOO_SUPER',
    10030: 'GOURGEIST_SMALL',
    10031: 'GOURGEIST_LARGE',
    10032: 'GOURGEIST_SUPER',
    10033: 'VENUSAUR_MEGA',
    10034: 'CHARIZARD_MEGA_X',
    10035: 'CHARIZARD_MEGA_Y',
    10036: 'BLASTOISE_MEGA',
    10037: 'ALAKAZAM_MEGA',
    10038: 'GENGAR_MEGA',
    10039: 'KANGASKHAN_MEGA',
    10040: 'PINSIR_MEGA',
    10041: 'GYARADOS_MEGA',
    10042: 'AERODACTYL_MEGA',
    10043: 'MEWTWO_MEGA_X',
    10044: 'MEWTWO_MEGA_Y',
    10045: 'AMPHAROS_MEGA',
    10046: 'SCIZOR_MEGA',
    10047: 'HERACROSS_MEGA',
    10048: 'HOUNDOOM_MEGA',
    10049: 'TYRANITAR_MEGA',
    10050: 'BLAZIKEN_MEGA',
    10051: 'GARDEVOIR_MEGA',
    10052: 'MAWILE_MEGA',
    10053: 'AGGRON_MEGA',
    10054: 'MEDICHAM_MEGA',
    10055: 'MANECTRIC_MEGA',
    10056: 'BANETTE_MEGA',
    10057: 'ABSOL_MEGA',
    10058: 'GARCHOMP_MEGA',
    10059: 'LUCARIO_MEGA',
    10060: 'ABOMASNOW_MEGA',
    10061: 'FLOETTE_ETERNAL',
    10062: 'LATIAS_MEGA',
    10063: 'LATIOS_MEGA',
    10064: 'SWAMPERT_MEGA',
    10065: 'SCEPTILE_MEGA',
    10066: 'SABLEYE_MEGA',
    10067: 'ALTARIA_MEGA',
    10068: 'GALLADE_MEGA',
    10069: 'AUDINO_MEGA',
    10070: 'SHARPEDO_MEGA',
    10071: 'SLOWBRO_MEGA',
    10072: 'STEELIX_MEGA',
    10073: 'PIDGEOT_MEGA',
    10074: 'GLALIE_MEGA',
    10075: 'DIANCIE_MEGA',
    10076: 'METAGROSS_MEGA',
    10077: 'KYOGRE_PRIMAL',
    10078: 'GROUDON_PRIMAL',
    10079: 'RAYQUAZA_MEGA',
    10080: 'PIKACHU_ROCK_STAR',
    10081: 'PIKACHU_BELLE',
    10082: 'PIKACHU_POP_STAR',
    10083: 'PIKACHU_PHD',
    10084: 'PIKACHU_LIBRE',
    10085: 'PIKACHU_COSPLAY',
    10086: 'HOOPA_UNBOUND',
    10087: 'CAMERUPT_MEGA',
    10088: 'LOPUNNY_MEGA',
    10089: 'SALAMENCE_MEGA',
    10090: 'BEEDRILL_MEGA',
    10091: 'RATTATA_ALOLA',
    10092: 'RATICATE_ALOLA',
    10093: 'RATICATE_TOTEM_ALOLA',
    10094: 'PIKACHU_ORIGINAL_CAP',
    10095: 'PIKACHU_HOENN_CAP',
    10096: 'PIKACHU_SINNOH_CAP',
    10097: 'PIKACHU_UNOVA_CAP',
    10098: 'PIKACHU_KALOS_CAP',
    10099: 'PIKACHU_ALOLA_CAP',
    10100: 'RAICHU_ALOLA',
    10101: 'SANDSHREW_ALOLA',
    10102: 'SANDSLASH_ALOLA',
    10103: 'VULPIX_ALOLA',
    10104: 'NINETALES_ALOLA',
    10105: 'DIGLETT_ALOLA',
    10106: 'DUGTRIO_ALOLA',
    10107: 'MEOWTH_ALOLA',
    10108: 'PERSIAN_ALOLA',
    10109: 'GEODUDE_ALOLA',
    10110: 'GRAVELER_ALOLA',
    10111: 'GOLEM_ALOLA',
    10112: 'GRIMER_ALOLA',
    10113: 'MUK_ALOLA',
    10114: 'EXEGGUTOR_ALOLA',
    10115: 'MAROWAK_ALOLA',
    10116: 'GRENINJA_BATTLE_BOND',
    10117: 'GRENINJA_ASH',
    10118: 'ZYGARDE_10_POWER_CONSTRUCT',
    10119: 'ZYGARDE_50_POWER_CONSTRUCT',
    10120: 'ZYGARDE_COMPLETE',
    10121: 'GUMSHOOS_TOTEM',
    10122: 'VIKAVOLT_TOTEM',
    10123: 'ORICORIO_POM_POM',
    10124: 'ORICORIO_PAU',
    10125: 'ORICORIO_SENSU',
    10126: 'LYCANROC_MIDNIGHT',
    10127: 'WISHIWASHI_SCHOOL',
    10128: 'LURANTIS_TOTEM',
    10129: 'SALAZZLE_TOTEM',
    10130: 'MINIOR_ORANGE_METEOR',
    10131: 'MINIOR_YELLOW_METEOR',
    10132: 'MINIOR_GREEN_METEOR',
    10133: 'MINIOR_BLUE_METEOR',
    10134: 'MINIOR_INDIGO_METEOR',
    10135: 'MINIOR_VIOLET_METEOR',
    10136: 'MINIOR_RED',
    10137: 'MINIOR_ORANGE',
    10138: 'MINIOR_YELLOW',
    10139: 'MINIOR_GREEN',
    10140: 'MINIOR_BLUE',
    10141: 'MINIOR_INDIGO',
    10142: 'MINIOR_VIOLET',
    10143: 'MIMIKYU_BUSTED',
    10144: 'MIMIKYU_TOTEM_DISGUISED',
    10145: 'MIMIKYU_TOTEM_BUSTED',
    10146: 'KOMMO_O_TOTEM',
    10147: 'MAGEARNA_ORIGINAL',
    10148: 'PIKACHU_PARTNER_CAP',
    10149: 'MAROWAK_TOTEM',
    10150: 'RIBOMBEE_TOTEM',
    10151: 'ROCKRUFF_OWN_TEMPO',
    10152: 'LYCANROC_DUSK',
    10153: 'ARAQUANID_TOTEM',
    10154: 'TOGEDEMARU_TOTEM',
    10155: 'NECROZMA_DUSK',
    10156: 'NECROZMA_DAWN',
    10157: 'NECROZMA_ULTRA',
    10158: 'PIKACHU_STARTER',
    10159: 'EEVEE_STARTER',
    10160: 'PIKACHU_WORLD_CAP',
    10161: 'MEOWTH_GALAR',
    10162: 'PONYTA_GALAR',
    10163: 'RAPIDASH_GALAR',
    10164: 'SLOWPOKE_GALAR',
    10165: 'SLOWBRO_GALAR',
    10166: 'FARFETCHD_GALAR',
    10167: 'WEEZING_GALAR',
    10168: 'MR_MIME_GALAR',
    10169: 'ARTICUNO_GALAR',
    10170: 'ZAPDOS_GALAR',
    10171: 'MOLTRES_GALAR',
    10172: 'SLOWKING_GALAR',
    10173: 'CORSOLA_GALAR',
    10174: 'ZIGZAGOON_GALAR',
    10175: 'LINOONE_GALAR',
    10176: 'DARUMAKA_GALAR',
    10177: 'DARMANITAN_GALAR_STANDARD',
    10178: 'DARMANITAN_GALAR_ZEN',
    10179: 'YAMASK_GALAR',
    10180: 'STUNFISK_GALAR',
    10181: 'ZYGARDE_10',
    10182: 'CRAMORANT_GULPING',
    10183: 'CRAMORANT_GORGING',
    10184: 'TOXTRICITY_LOW_KEY',
    10185: 'EISCUE_NOICE',
    10186: 'INDEEDEE_FEMALE',
    10187: 'MORPEKO_HANGRY',
    10188: 'ZACIAN_CROWNED',
    10189: 'ZAMAZENTA_CROWNED',
    10190: 'ETERNATUS_ETERNAMAX',
    10191: 'URSHIFU_RAPID_STRIKE',
    10192: 'ZARUDE_DADA',
    10193: 'CALYREX_ICE',
    10194: 'CALYREX_SHADOW',
    10195: 'VENUSAUR_GMAX',
    10196: 'CHARIZARD_GMAX',
    10197: 'BLASTOISE_GMAX',
    10198: 'BUTTERFREE_GMAX',
    10199: 'PIKACHU_GMAX',
    10200: 'MEOWTH_GMAX',
    10201: 'MACHAMP_GMAX',
    10202: 'GENGAR_GMAX',
    10203: 'KINGLER_GMAX',
    10204: 'LAPRAS_GMAX',
    10205: 'EEVEE_GMAX',
    10206: 'SNORLAX_GMAX',
    10207: 'GARBODOR_GMAX',
    10208: 'MELMETAL_GMAX',
    10209: 'RILLABOOM_GMAX',
    10210: 'CINDERACE_GMAX',
    10211: 'INTELEON_GMAX',
    10212: 'CORVIKNIGHT_GMAX',
    10213: 'ORBEETLE_GMAX',
    10214: 'DREDNAW_GMAX',
    10215: 'COALOSSAL_GMAX',
    10216: 'FLAPPLE_GMAX',
    10217: 'APPLETUN_GMAX',
    10218: 'SANDACONDA_GMAX',
    10219: 'TOXTRICITY_AMPED_GMAX',
    10220: 'CENTISKORCH_GMAX',
    10221: 'HATTERENE_GMAX',
    10222: 'GRIMMSNARL_GMAX',
    10223: 'ALCREMIE_GMAX',
    10224: 'COPPERAJAH_GMAX',
    10225: 'DURALUDON_GMAX',
    10226: 'URSHIFU_SINGLE_STRIKE_GMAX',
    10227: 'URSHIFU_RAPID_STRIKE_GMAX',
    10228: 'TOXTRICITY_LOW_KEY_GMAX',
    10229: 'GROWLITHE_HISUI',
    10230: 'ARCANINE_HISUI',
    10231: 'VOLTORB_HISUI',
    10232: 'ELECTRODE_HISUI',
    10233: 'TYPHLOSION_HISUI',
    10234: 'QWILFISH_HISUI',
    10235: 'SNEASEL_HISUI',
    10236: 'SAMUROTT_HISUI',
    10237: 'LILLIGANT_HISUI',
    10238: 'ZORUA_HISUI',
    10239: 'ZOROARK_HISUI',
    10240: 'BRAVIARY_HISUI',
    10241: 'SLIGGOO_HISUI',
    10242: 'GOODRA_HISUI',
    10243: 'AVALUGG_HISUI',
    10244: 'DECIDUEYE_HISUI',
    10245: 'DIALGA_ORIGIN',
    10246: 'PALKIA_ORIGIN',
    10247: 'BASCULIN_WHITE_STRIPED',
    10248: 'BASCULEGION_FEMALE',
    10249: 'ENAMORUS_THERIAN',
    10250: 'SHELLOS_EAST_SEA',
    10251: 'BURMY_PLANT_CLOAK',
    10252: 'BURMY_SANDY_CLOAK',
    10253: 'BURMY_TRASH_CLOAK',
    10254: 'WORMADAM_PLANT_CLOAK',
    10255: 'WORMADAM_SANDY_CLOAK',
    10256: 'WORMADAM_TRASH_CLOAK',
    10257: 'FLABEBE_BLUE_FLOWER',
    10258: 'FLABEBE_WHITE_FLOWER',
    10259: 'FLABEBE_ORANGE_FLOWER',
    10260: 'FLABEBE_YELLOW_FLOWER',
    10261: 'UNOWN_A',
    10262: 'UNOWN_B',
    10263: 'UNOWN_C',
    10264: 'UNOWN_D',
    10265: 'UNOWN_E',
    10266: 'UNOWN_F',
    10267: 'UNOWN_G',
    10268: 'UNOWN_H',
    10269: 'UNOWN_I',
    10270: 'UNOWN_J',
    10271: 'UNOWN_K',
    10272: 'UNOWN_L',
    10273: 'UNOWN_M',
    10274: 'UNOWN_N',
    10275: 'UNOWN_O',
    10276: 'UNOWN_P',
    10277: 'UNOWN_Q',
    10278: 'UNOWN_R',
    10279: 'UNOWN_S',
    10280: 'UNOWN_T',
    10281: 'UNOWN_U',
    10282: 'UNOWN_V',
    10283: 'UNOWN_W',
    10284: 'UNOWN_X',
    10285: 'UNOWN_Y',
    10286: 'UNOWN_Z',
    10287: 'UNOWN_QUESTION_MARK',
    10288: 'UNOWN_EXCLAMATION_MARK'
}

def generateConstantIcons():
    exceptions = {
        'NIDORAN_M': 'Nidoran♂',
        'NIDORAN_F': 'Nidoran♀'
    }
    formExceptions = {
        'GALAR': 'Galarian',
        'HISUI': 'Hisuian',
        'GMAX': 'Gigantamax'
    }

    res = []
    for i in NATDEX:
        name = NATDEX[i]
        if name in exceptions:
            name = exceptions[name]
        else:
            name = name.lower()
            name = name.capitalize()
            formWords = name.split('_')[1:]
            name = name.split('_')[0]

            for i in range(len(formWords)):
                if formWords[i] in formExceptions:
                    formWords[i] = formExceptions[formWords[i]]
                else:
                    formWords[i] = formWords[i].lower.capitalize()
            
            form = ' '.join(formWords)
        
        res.append({
            'name': NATDEX[i].lower(),
            'icon': i
        })
        if form:
            res[-1]['form'] = form
    
    print(res)