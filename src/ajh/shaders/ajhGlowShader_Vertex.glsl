// var vertexShader = [

      // 'varying float intensity;',
      // 'uniform vec3 lightSourcePos;',
      // 'uniform vec3 camPos;',

      // // M_model: transform from model (local) coordinates to world coordinates
      // // M_view: tramsform from world to camera coordinates (looking from -z to 0,0,0)
      // // M_proj: transform to clip space; distant obj will appear smaller, obj out of boundary will be clipped
      // // pos_view = M_project x M_view x M_model
      // 'void main() {',
      //   'vec3 vNormal = normalize( normalMatrix * normal );',
      //   'vec4 viewLightPos   =  modelViewMatrix * vec4(lightSourcePos, 1.0);', // pos of light source
      //   'vec4 viewCamPos  = viewMatrix * vec4(camPos, 1.0);',
      //   'vec4 vViewPosition4   =  modelViewMatrix * vec4(position, 1.0);',
      //   'vec3 camPosToVertexDir =  normalize(viewCamPos.xyz - vViewPosition4.xyz);',
      //   'vec3 lightDir = normalize(viewLightPos.xyz - vViewPosition4.xyz) ;',
      //   'float lightsourceIntensity = clamp(dot(lightDir, vNormal) + 1.0, 0.0, 1.0);', //lightsource facing surface has higher intensity
      //   'intensity = pow( 0.7 - dot(vNormal, camPosToVertexDir), 12.0 ) * lightsourceIntensity;',//intensity is highest at faces orthogonal to cam pos-vertex direction
      //   'gl_Position = projectionMatrix * vViewPosition4;',
      //   'vec3 vPosition = gl_Position.xyz;',
      // '}'
 //   ].join('\n')



      varying float intensity;
      uniform vec3 lightSourcePos;
      uniform vec3 camPos;

      uniform mat4 normalMatrix;

      // M_model: transform from model (local) coordinates to world coordinates
      // M_view: tramsform from world to camera coordinates (looking from -z to 0,0,0)
      // M_proj: transform to clip space; distant obj will appear smaller, obj out of boundary will be clipped
      // pos_view = M_project x M_view x M_model

      void main() {
        vec3 vNormal = normalize( normalMatrix * normal );
        vec4 viewLightPos   =  modelViewMatrix * vec4(lightSourcePos, 1.0); // pos of light source
        vec4 viewCamPos  = viewMatrix * vec4(camPos, 1.0);
        vec4 vViewPosition4   =  modelViewMatrix * vec4(position, 1.0);
        vec3 camPosToVertexDir =  normalize(viewCamPos.xyz - vViewPosition4.xyz);
        vec3 lightDir = normalize(viewLightPos.xyz - vViewPosition4.xyz) ;
        float lightsourceIntensity = clamp(dot(lightDir, vNormal) + 1.0, 0.0, 1.0); //lightsource facing surface has higher intensity
        intensity = pow( 0.7 - dot(vNormal, camPosToVertexDir), 12.0 ) * lightsourceIntensity;//intensity is highest at faces orthogonal to cam pos-vertex direction
        gl_Position = projectionMatrix * vViewPosition4;
        vec3 vPosition = gl_Position.xyz;
      }