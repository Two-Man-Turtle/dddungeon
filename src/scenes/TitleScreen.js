import Phaser from "phaser"

class TitleScreen extends Phaser.Scene {
    constructor() {
        super('titleScreen')
    }

    create() {
        // Music
        this.sound.play("titleMusic", {
            loop: true
        })

        // Play Button
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * .90, "playButton").setDepth(1)

        playButton.setInteractive();
        playButton.on('pointerdown', ()=> {
            console.log("clicked")
        })

        // Logo
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "logo").setDepth(1)

        // Background Image
        this.add.image(0, -100, "title_bg").setOrigin(0);
    }
}

export default TitleScreen