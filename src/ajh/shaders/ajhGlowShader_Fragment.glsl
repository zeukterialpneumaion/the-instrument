
//var fragmentShader: [
      // varying float intensity ;,
      // void main() {,
      //   vec3 glow = vec3(0.3, 0.6, 1.0) * intensity*0.3;,
      //   gl_FragColor = vec4( glow, 1.0 ) ;,
      // }
//    ].join(\n)

      varying float intensity ;
      void main() {
        vec3 glow = vec3(0.3, 0.6, 1.0) * intensity*0.3;
        gl_FragColor = vec4( glow, 1.0 ) ;
      }