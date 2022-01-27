import Phaser from 'phaser'

class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }

    preload() {
        // Map
        this.load.image('tiles', 'dist/assets/dungeon_tiles.png')
        this.load.tilemapTiledJSON('dungeon', 'src/assets/dungeon-01.json')

        // Player
        this.load.atlas('knight', 'src/assets/knight.png', 'src/assets/knight.json')

        // Chort
        this.load.atlas('chort', 'src/assets/chort.png', 'src/assets/chort.json')

        // TitleScreen
        this.load.image('logo', 'src/assets/logo.png')
        this.load.image('title_bg', 'src/assets/titlescreen.png')
        this.load.image('playButton', 'src/assets/play_button.png')
        this.load.audio('titleMusic', 'src/assets/title-screen-music.mp3')

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