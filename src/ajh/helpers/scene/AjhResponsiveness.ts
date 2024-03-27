import { WebGLRenderer } from 'three';
import AjhModel from '../../datamodels/AjhModel';

const modelInstance = AjhModel.Instance;

export function resizeRendererToDisplaySize(renderer: WebGLRenderer) {
  const canvas = modelInstance.renderer.domElement
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    renderer.setSize(width, height, false)
  }
  return needResize
}
