Play = function(game) {   
};

Play.prototype = {
    
    init : function(level, vidas, gems, score) {      
        this.level = level;
        this.vidasJogador = vidas;
        this.gems = gems;
        this.score = score;
        this.time = 300;
    },
    
    create : function() {     
        game.physics.startSystem(Phaser.Physics.ARCADE);              
        this.criarCenario();
        this.criarJogador();
        this.teclado = game.input.keyboard.createCursorKeys();
        var style = { font: "bold 28px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
        this.icon = this.game.add.sprite(5, 10, "player");
        this.icon.fixedToCamera = true;        
        this.livesText = game.add.text(45, 10, " X " + this.vidasJogador, style);
        this.livesText.fixedToCamera = true;
        this.blueGemIcon = this.game.add.sprite(140, 15, "gem");
        this.blueGemIcon.fixedToCamera = true;
        this.blueGemText = game.add.text(160, 10, " X " + this.gems, style);
        this.blueGemText.fixedToCamera = true;
        this.timeIcon = this.game.add.sprite(260, 10, "watch");        
        this.timeIcon.fixedToCamera = true;
        this.timeText = game.add.text(320, 10, this.time, style);
        this.timeText.fixedToCamera = true;
        this.moneyIcon = this.game.add.sprite(400, 10, "money");        
        this.moneyIcon.fixedToCamera = true;
        this.text = game.add.text(455, 10, this.score, style);
        this.text.fixedToCamera = true;
        game.time.events.loop(Phaser.Timer.SECOND, this.atualizarTempo, this);        
    },
    
    update : function() {        
        game.physics.arcade.collide(this.player, this.blocks);
        game.physics.arcade.overlap(this.player, this.itens, this.pegaItem, null, this);
        game.physics.arcade.overlap(this.player, this.inimigos, this.collideEnemies, null, this);
        game.physics.arcade.collide(this.player, this.spikes, this.collideSpikes, null, this);
        game.physics.arcade.collide(this.player, this.key, this.nextLevel, null, this);
        game.physics.arcade.collide(this.player, this.elevadores);        
        this.verificarTeclas();        
        this.verificarBuracos();        
        this.moveEnemies();        
    },
    
    criarCenario : function() {
        
        for(let i = 0; i < 5; i++) {
            let level = 1;
            if(this.level == 2) {
                level = 2;
            }
            if(this.level == 3) {
                level = 3;
            }
            if(this.level == 4) {
                level = 4;
            }
            this.game.add.image(i * 640, 0, `background${level}`);
            this.game.add.image(i * 640, 0, `parallax${level}`);
        }        
        if(this.level == 1) {            
            this.mapa = game.add.tilemap('Map');
        }
        else if(this.level == 2) {
            this.mapa = game.add.tilemap('Map2');
        }
        else if(this.level == 3) {
            this.mapa = game.add.tilemap('Map3');
        }
        else if(this.level == 4) {
            this.mapa = game.add.tilemap('Map4');
        }
        
        this.mapa.addTilesetImage('Tileset');        
        this.spikes = this.mapa.createLayer('Spikes');
        this.blocks = this.mapa.createLayer('Blocks');
        this.scenary = this.mapa.createLayer('Scenary');        
        game.world.setBounds(0, 0, this.mapa.width * 640, this.mapa.height);        
        this.mapa.setCollisionBetween(0, 1055, true, 'Blocks');
        this.mapa.setCollisionBetween(0, 1055, true, 'Spikes');        
        
        this.itens = game.add.group();
        this.itens.enableBody = true;
        this.mapa.createFromObjects('Itens', 'item', 'gem', 0, true, false, this.itens);
        this.itens.forEach(function(item) {
            game.add.tween(item).to( { alpha: 0.2 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        });
        
        this.inimigos = game.add.group();
        this.inimigos.enableBody = true;
        this.mapa.createFromObjects('Enemies', 'enemy', 'enemyFlying', 0, true, false, this.inimigos);
        this.inimigos.forEach(function(inimigo) {
            inimigo.animations.add('flying', [0, 1, 2]);
            inimigo.animations.play('flying', 10, true);
            inimigo.flyingUp = false;
        });

        this.elevadores = game.add.group();
        this.elevadores.enableBody = true;
        this.mapa.createFromObjects('Elevators', 'elevator', 'elevatorFlying', 0, true, false, this.elevadores);
        this.elevadores.forEach(function(elevador) {
            elevador.flyingUp = false;
            elevador.body.immovable = true;
        });
    },
    
    criarJogador() {
        
        this.player = game.add.sprite(100, game.height - 250, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        this.player.vidas = this.vidas;
        this.player.atingido = false;
        this.player.level = this.level;
        
        this.player.animations.add('paraDireita', [1, 2, 0]);
        this.player.animations.add('paraEsquerda', [1, 2, 0]);
        
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        this.player.body.gravity.y = 950;
        
        game.camera.follow(this.player);

        this.key = game.add.sprite(2455, 288, 'key');
        game.physics.arcade.enable(this.key);
        
    },
    
    verificarTeclas : function() {
        
        this.player.body.velocity.x = 0;
        
        if(this.teclado.right.isDown) {
            this.player.body.velocity.x = 230;            
            if(this.player.body.onFloor() || this.player.body.touching.down) {
                this.player.animations.play('paraDireita', 7, false);
            }
        }
        else if(this.teclado.left.isDown) {
            if(this.player.world.x > 1) {
                this.player.body.velocity.x = -230;                
                if(this.player.body.onFloor() || this.player.body.touching.down) {
                    this.player.animations.play('paraEsquerda', 7, false);
                }
            }
        }
        else if((this.teclado.up.isDown) && this.player.body.onFloor()) {            
            this.player.body.velocity.y = -500;
            this.player.animations.stop();            
            if(this.player.animations.currentAnim.name == 'paraDireita') {                
            }
            else {                
            }
        }
        else if((this.teclado.up.isDown)) {
            if(this.player.body.touching.down) {
                this.player.body.velocity.y = -500;
                this.player.animations.stop();       
            }
        }
                
    },
    
    verificarBuracos : function() {        
        if(this.player.world.y > 640) {
            this.vidasJogador--;            
            game.camera.reset();
            game.camera.follow(this.player);
            this.livesText.setText(" X " + this.vidasJogador);
            if(this.vidasJogador > 0) {
                this.player.body.x = 100;
                this.player.body.y = game.height - 250;
                this.time = 300;
            }
            else {
                game.state.start('GameOver', true, false, this.gems, this.score);
            }
        }        
    },

    pegaItem: function(player, item) {
        this.score+= 100;
        this.gems++;
        item.destroy();        
        this.text.setText(this.score);
        this.blueGemText.setText(" X " + this.gems);
    },

    collideEnemies: function(player, enemy) {
        this.vidasJogador--;
        this.livesText.setText(" X " + this.vidasJogador);
        if(this.vidasJogador > 0) {
            this.player.body.x = 100;
            this.player.body.y = game.height - 250;
            this.time = 300;
        }
        else {
            game.state.start('GameOver', true, false, this.gems, this.score);
        }
    },

    collideSpikes: function() {
        this.vidasJogador--;
        this.livesText.setText(" X " + this.vidasJogador);
        if(this.vidasJogador > 0) {
            this.player.body.x = 100;
            this.player.body.y = game.height - 250;
            this.time = 300;
        }
        else {
            game.state.start('GameOver', true, false, this.gems, this.score);
        }
    },

    moveEnemies: function() {
        this.inimigos.forEach(function(inimigo) {
            if(inimigo.flyingUp) {
                inimigo.body.velocity.y = -50;
            }
            else {
                inimigo.body.velocity.y = 50;
            }
            if(inimigo.body.y > this.game.height) {
                inimigo.flyingUp = true;    
            }
            else if(inimigo.body.y < 0) {
                inimigo.flyingUp = false;
            }
        });   
        
        this.elevadores.forEach(function(elevador) {
            if(elevador.flyingUp) {
                elevador.body.velocity.y = -50;
            }
            else {
                elevador.body.velocity.y = 50;
            }
            if(elevador.body.y > this.game.height) {
                elevador.flyingUp = true;    
            }
            else if(elevador.body.y < 0) {
                elevador.flyingUp = false;
            }
        });    
    },

    atualizarTempo: function() {
        this.time--;
        this.timeText.setText(this.time);
        if(this.time === 0) {
            this.vidasJogador--;
            if(this.vidasJogador > 0) {
                this.player.body.x = 100;
                this.player.body.y = game.height - 250;
                this.time = 300;
            }
            else {
                game.state.start('GameOver', true, false, this.gems, this.score);
            }
        }
    },

    nextLevel: function(player, key) {
        key.destroy();
        this.score += this.time;
        this.score += this.vidasJogador * 200;
        if(this.level == 1) {
            this.level = 2;
            game.state.start("Play", true, false, this.level, this.vidasJogador, this.gems, this.score);
        }
        else if(this.level == 2) {
            this.level = 3;
            game.state.start("Play", true, false, this.level, this.vidasJogador, this.gems, this.score);
        }
        else if(this.level == 3) {
            this.level = 4;
            game.state.start("Play", true, false, this.level, this.vidasJogador, this.gems, this.score);
        }
        else if(this.level == 4) {
            game.state.start("GameOver", true, false, this.gems, this.score);
        }
    }
        
};