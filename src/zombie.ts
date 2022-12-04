export class Zombie extends Entity {
  public zombieHp;
  constructor(model: GLTFShape, transform: Transform , zombieHp ) {
    super()
    this.addComponent(model)
    this.addComponent(transform)
    this.zombieHp = zombieHp
    this.addComponent(new Animator())
    this.addComponent(
      new OnPointerDown(
        (e) => {},
        { button: ActionButton.POINTER, hoverText: "Shoot" }
      )
    )
    
    this.getComponent(Animator).addClip(
      new AnimationState('WALK', { looping: true })
    )
    this.getComponent(Animator).addClip(
      new AnimationState('HIT', { looping: true })
    )
    this.getComponent(Animator).addClip(
      new AnimationState('ATK', { looping: false })
    )
    this.getComponent(Animator).getClip('WALK').play()
    engine.addEntity(this)
  }

  hurt(){
    this.getComponent(Animator).getClip('HIT').play(false)
  }

  attack() {
    this.getComponent(Animator).getClip('ATK').play(false)
    return true
  }

  walk() {
    this.getComponent(Animator).getClip('WALK').play(false)
  }
}