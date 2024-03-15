precision mediump float;
uniform vec3 u_reverseLightDirection;
uniform sampler2D uSampler;
varying vec3 v_normal;
varying highp vec2 vTextureCoord;

void main(){
    vec3 normal=normalize(v_normal);
    vec4 textureColor=texture2D(uSampler,vTextureCoord);
    float light=dot(normal,u_reverseLightDirection);
    gl_FragColor=vec4(light*textureColor.rgb,1);
}