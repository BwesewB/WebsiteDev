// shaders/fragment.glsl
varying vec2 vUv;

uniform vec2 u_mouse;
uniform float u_intensity;
uniform float u_time;
uniform sampler2D u_texture;

// Function to create a soft circular mask around the mouse
float circle(in vec2 _st, in float _radius, in float _hardness){
    vec2 dist = _st - u_mouse;
    return 1.0 - smoothstep(_radius - (_radius * _hardness),
                         _radius + (_radius * _hardness),
                         dot(dist, dist) * 4.0);
}


void main() {
  // Create a soft circle mask around the mouse position.
  // The radius is controlled by the intensity.
  float mask = circle(vUv, 0.1 * u_intensity, 0.5);

  // Sample our ink blot noise texture, but distort the lookup
  // over time to make the bleed "boil" subtly.
  vec2 distortedUv = vec2(
    vUv.x + sin(u_time + vUv.y * 5.0) * 0.01,
    vUv.y + cos(u_time + vUv.x * 5.0) * 0.01
  );
  vec4 noise = texture2D(u_texture, distortedUv);

  // Combine the mask with the noise.
  // We use smoothstep to create a sharper edge for the bleed.
  float ink = smoothstep(0.4, 0.6, noise.r * mask);

  // The final color is black where the ink is, otherwise transparent.
  // Multiplying by u_intensity ensures it fades out completely.
  gl_FragColor = vec4(vec3(0.0), ink * u_intensity);
}