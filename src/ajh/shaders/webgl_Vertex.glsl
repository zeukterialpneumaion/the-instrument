attribute vec4 a_position;
attribute vec3 a_normal;
attribute vec2 aTextureCoord;
uniform mat4 u_cameraMatrix;
varying vec3 v_normal;
varying highp vec2 vTextureCoord;

void main(){
    gl_Position=u_cameraMatrix*a_position;
    v_normal=a_normal;
    vTextureCoord=aTextureCoord;
}