

/* TO UPDATE/ADD SCRIPTS

* for each game in the map, the key must match the 'value' of the option tag that selects that game
*/

function Script(name,code,description){
    this.name = name
    this.code = code
    this.description = description
}



function preloadedScripts(){

    this.zoom = new Script('zoom',`6100 6200 A000 D125 7104 1206`,"Zoom description"),
    
    this.fighters = new Script('fighters',fightersCode,'fighters description'),
    
    this.invaders = new Script('invaders',invadersCode,'invaders description'),

    this.pong = new Script('pong',pongCode,'pong description'),

    this.external = new Script('external','','no external file loaded')

}

var fightersCode = `14d3 8020 70d8 a824 5aff 5a78 48dc f4fc
a8b8 e078 48de f56f 304a ddb7 ffbe 750e
e0b0 d020 c0c0 c0c0 c0c0 c0c0 e080 e020
e0e0 a0e0 8080 e0a0 e0a0 a0e0 8080 80e0
e080 e080 e0e0 80e0 8080 e040 4040 e0e0
8080 a0e0 a0a0 e0a0 a0e0 4040 4040 e0a0
c0a0 a0a0 a0e0 20e0 e0a0 a0a0 e0a0 a0a0
a0e0 8080 8080 e0a0 a0a0 a040 ff0a 44a0
ff10 1028 286c 6cba aa18 245a 7ee7 5a6d
0067 0064 01a2 2460 0061 00d0 1871 0831
2012 9b60 3e61 00d0 1871 0831 2012 a7a2
036e 1e61 1bde 14a2 076c 1c6b 01dc b4a2
1860 0961 0dd0 17a2 2060 1561 0fd0 14a2
0b60 1d61 0dd0 18a2 2060 2761 0fd0 14a2
1360 2f61 0fd0 1500 ee60 0561 05a2 2cd0
1570 04a2 31d0 1570 04a2 36d0 1570 04a2
3bd0 1570 04a2 40d0 1560 0561 0fa2 45d0
1570 04a2 4ad0 1570 04a2 4fd0 1570 04a2
54d0 1570 04a2 59d0 1570 04a2 40d0 1570
04a2 5ed0 1570 04a2 2cd0 1570 0f71 ffa2
81d0 1870 0371 fda2 02d0 1170 f871 f7a2
89d0 16a2 7c60 0061 18d0 1570 0830 4013
59f2 0a42 0500 e000 e000 ee81 e062 1b60
07e0 a171 ff60 09e0 a171 0141 0161 0241
3a61 39a2 03de 248e 10de 2400 ee60 08e0
9e00 ee6d 0160 07e0 a16d 0260 09e0 a16d
0389 e079 0268 1aa2 02d9 8100 eea2 02d9
8178 ff4d 0279 ff4d 0379 0149 026d 0349
3c6d 0248 006d 004d 0000 eed9 814f 0000
ee6d 0099 6000 ee98 506d 0000 ee71 ff00
ee71 0100 ee71 0200 ee71 fe00 ee71 ff00
ee82 4400 ee80 0000 ee24 2b00 eec0 1cb3
dd81 c082 b023 fd41 0161 0241 3761 3641
0061 0241 3861 3642 0164 0142 0864 ffa2
07dc b48c 108b 20dc b400 ee37 0000 ee67
01c0 0340 0167 0240 0267 0386 c076 0385
b075 05a2 02d6 5100 eea2 02d6 5175 0147
0276 ff47 0376 0146 0267 0346 3c67 0245
2067 0047 0000 eed6 514f 0000 ee67 0000
ee00 e060 1a61 09a2 63d0 1570 04a2 68d0
1570 04a2 6dd0 1560 1861 11a2 72d0 1570
04a2 68d0 1570 04a2 2cd0 1570 04a2 40d0
1500 ee00 e060 1261 0ca2 77d0 1570 04a2
4ad0 1570 04a2 3bd0 1570 04a2 59d0 1570
04a2 68d0 1570 04a2 5ed0 1570 04a2 63d0
1500 ee22 e922 8f23 6b3f 0014 7124 013f
0014 a34d 0023 8d3d 0023 ad37 0024 4914
d700 ee`

var invadersCode = `153f 0000 0000 3078 3030 4800 0000 0000
0000 0000 0000 0808 1c1c 1c00 0000 0000
0000 0000 0008 081c 1c1c 0000 0000 0080
003c 4240 4040 3c02 0202 423c 0000 0000
3c42 4242 427c 4040 4040 4000 0000 0018
2442 4242 427e 4242 4242 0000 0000 3c42
4040 4040 4040 4042 3c00 0000 003e 4040
4040 7e40 4040 403e 0000 0000 e040 4040
4040 4040 4040 e000 0000 00c1 a1a1 9191
8989 8585 8383 0000 0000 8282 8282 8282
8244 4428 1000 0000 0030 4844 4242 4242
4244 4830 0000 0000 3c42 4242 427c 6050
4844 4200 0000 3c42 8180 8080 9f91 8142
3c00 0000 0000 8282 8282 8282 8282 8282
7c00 0000 007c 8282 8282 8282 8282 827c
0000 0000 3050 9010 1010 1010 1010 fe00
0000 003c 4282 0204 0810 2040 80fe 0000
0000 7884 0202 0438 0402 0284 7800 0000
2424 0081 423c 0000 0000 0000 0000 0081
a082 b060 07e0 a171 ff60 09e0 a171 0141
0061 0141 3861 37a2 11da bf8a 108b 20a2
11da bf00 ee60 06e0 9e00 ee6e 018c a07c
048d b07d 04a2 2fdc d100 eea2 2fdc d17d
ff4d 006e 004e 0000 eedc d14f 0000 ee6e
0000 eea2 02d8 7a64 0200 eea2 02d6 5a63
0200 ee81 8082 7046 3269 ff46 3277 0541
0769 0141 0777 0541 3269 ff41 3277 0581
94a2 02d8 2a88 1082 70d8 2a00 ee81 6082
5041 0769 0141 0775 0541 3269 ff41 3275
0548 0769 0148 0775 0581 94a2 02d6 2a86
1082 50d6 2a00 eea2 c660 1561 07d0 1f60
1f61 07d0 1fa3 2060 1a61 16d0 1800 ee60
3ef0 15f0 0730 0014 0300 e023 e760 c8f0
15f0 0730 0014 1100 e000 ee60 0a61 02a2
30d0 1f70 08a2 3fd0 1f70 08a2 4ed0 1f70
08a2 5dd0 1f70 08a2 6cd0 1f60 0171 0fa2
7bd0 1f70 0571 00a2 8ad0 1f70 0a71 00a2
99d0 1f70 0871 00a2 4ed0 1f70 0871 00a2
a8d0 1f70 0871 00a2 6cd0 1f70 0871 00a2
b7d0 1f70 0871 00a2 30d0 1ff2 0a42 0700
e000 e000 ee6e 0064 0063 00a2 0268 1867
00d8 7a66 2365 00d6 5a6a 196b 15a2 11da
bf23 2f44 0023 933f 0064 0143 0023 bd3f
0063 0144 0123 8343 0123 8b47 1413 ff45
1413 ff3e 0023 6b4e 0023 5514 a100 ee6e
006f 00a2 0268 1867 00d8 7a66 2365 00d6
5a6a 196b 15a2 11da bf23 2f23 933f 0013
ff23 bd3f 0013 ff45 1413 ff3e 0023 6b4e
0023 5514 e900 ee6e 006f 00a2 0268 1867
00d8 7a66 2365 00d6 5a6a 196b 15a2 11da
bf23 2f23 933f 0013 ff23 bd3f 0013 ff45
1413 ff3e 0023 6b4e 0023 5515 2100 ee24
1b69 0124 8500 e069 0124 cf00 e069 0125
0700 ee`

var pongCode = `132f 8080 8080 8080 8080 8080 8080 8080
8001 0101 0101 0101 0101 0101 0101 0101
8000 0000 0000 0000 0000 0000 0000 003c
4281 8080 809f 9181 423c 0000 0000 2424
0081 423c 0000 0000 0000 0000 0081 e082
d060 01e0 a172 ff60 04e0 a172 0142 0062
0142 1862 17a2 02de d88e 108d 20a2 02de
d800 ee81 6082 7060 03e0 a172 ff60 06e0
a172 0142 0062 0142 1862 17a2 11d6 7886
1087 20a2 11d6 7800 ee00 ee81 4082 3081
a445 0372 ff45 0472 0142 0165 0442 1e65
0341 0065 0045 0078 0145 0012 e941 3f65
0545 057b 0145 0512 e9a2 20d4 3184 1083
20a2 20d4 3100 ee60 1461 03fb 29d0 1560
2761 03f8 29d0 1500 ee00 e060 40f0 18f0
15f0 0730 0012 f113 2f00 eea2 2f60 1561
07d0 1f60 1f61 07d0 1fa2 3e60 1a61 16d0
1800 ee60 3ef0 15f0 0730 0013 1700 e022
fb60 40f0 15f0 0730 0013 2500 e000 ee6e
016d 0c66 3767 0c64 1f63 1065 036a 0122
d7a2 20d4 31a2 02de d8a2 11d6 784b 0513
6548 0513 6522 4d3f 006a 0122 733f 006a
ff22 9b13 4d23 1300 ee`

var preloadedScripts = new preloadedScripts()