import { Clock, Object3D, Vector3 } from 'three'

function rotate(object: Object3D, clock: Clock, radiansPerSecond: number = Math.PI * 2) {
  const rotationAngle = clock.getElapsedTime() * radiansPerSecond
  object.rotation.y = rotationAngle
  object.rotation.z = rotationAngle/1.2
}

function bounce(
  object: Object3D,
  clock: Clock,
  bounceSpeed: number = 1.5,
  amplitude: number = 0.4,
  yLowerBound: number = 0.5
) {
  const elapsed = clock.getElapsedTime()
  const yPos = Math.abs(Math.sin(elapsed * bounceSpeed) * amplitude)
  object.position.y = yPos + yLowerBound + 2
}

function minimize(
  originalScale: Vector3,
    object: Object3D,
    clock: Clock,
    bounceSpeed: number = 1.5,
    amplitude: number = 0.4,
    yLowerBound: number = 0.5
  ) {

    const elapsed = clock.getElapsedTime();
    const yPos = (Math.sin(elapsed * bounceSpeed) * amplitude);
    
    object.scale.setX( originalScale.x/1.02 + ( yPos/2 ) );
    object.scale.setZ( originalScale.z/1.02 + ( yPos  /2) );


  }

export { bounce, minimize, rotate }

