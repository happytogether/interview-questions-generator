export default function RandomBg() {

  const randomBg = ["equilateral-triangles-bg","triangle-bg", "dot-bg", "wave-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg","paper-bg", "diagonal-bg", "radial-bg2","rainbow-bg"]; // do not include radial-bg in not square shape
  return randomBg[Math.floor(Math.random()*13)]

}
