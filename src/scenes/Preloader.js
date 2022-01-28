import Phaser from 'phaser'

class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }

    preload() {
        // Map
        this.load.image('tiles', 'assets/dungeon_tiles.png')
        this.load.tilemapTiledJSON('dungeon', '/assets/dungeon-01.json')

        // Player
        this.load.atlas('knight', 'assets/knight.png', 'assets/knight.json')

        // Chort
        this.load.atlas('chort', 'assets/chort.png', 'assets/chort.json')

        // TitleScreen
        this.load.image('logo', 'assets/logo.png')
        this.load.image('title_bg', 'assets/titlescreen.png')
        this.load.image('playButton', 'assets/play_button.png')
        this.load.audio('titleMusic', 'assets/title-screen-music.mp3')

        // Loading Bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })
        this.load.on('progress', (percent)=> {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent)
        })

    }

    create() {
        this.scene.start('game')
    }
}

export default Preloader