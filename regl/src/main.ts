import createREGL from "regl";
import frag from "./shaders/frag.glsl";
import vert from "./shaders/vert.glsl";

const regl = createREGL();

const draw = regl({
   frag,
   vert,
   attributes: {
      position: [
         [0, 0, 0],
         [1, 0, 0],
         [1, 1, 0],
         [0, 1, 0],
      ],
   },
   elements: [
      [0, 1, 2],
      [0, 2, 3],
   ],
   uniforms: {
      time: ({ time }) => time,
      // or
      // time: regl.prop('time'),
   },
});

regl.frame(({ time }) => {
   // provide custom uniform values at each frame
   draw({ time });
});
