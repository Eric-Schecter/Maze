import { WebGLRenderer } from "three";

export const handleRenderer = (target:HTMLDivElement,width:number,height:number) =>{
  const renderer = new WebGLRenderer();
  renderer.setSize(width,height);
  renderer.setClearColor(0x333333, 1);
  target.appendChild(renderer.domElement);
  return renderer;
}