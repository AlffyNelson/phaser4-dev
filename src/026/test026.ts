import { WebGL2Renderer } from '@phaserjs/renderer-webgl2';
import { ImageFile } from '@phaserjs/loader-filetypes';
import { Ortho, Matrix4, Translate, RotateX, RotateY, RotateZ, Scale } from '@phaserjs/math-matrix4';
import { LookAt, Multiply, Perspective } from '@phaserjs/math-matrix4-funcs';
import { Vec2 } from '@phaserjs/math-vec2';
import { Vec3 } from '@phaserjs/math-vec3';

function createQuad (x: number, y: number, width: number, height: number)
{
    const TL = new Vec2(x, y);
    const TR = new Vec2(x + width, y);
    const BL = new Vec2(x, y + height);
    const BR = new Vec2(x + width, y + height);

    //  flipped from v3 and it works fine!
    const UVTL = new Vec2(0, 1);
    const UVTR = new Vec2(1, 1);
    const UVBL = new Vec2(0, 0);
    const UVBR = new Vec2(1, 0);

    return {
        position: new Float32Array([
            TL.x, TL.y,
            TR.x, TR.y,
            BL.x, BL.y,
            BL.x, BL.y,
            TR.x, TR.y,
            BR.x, BR.y
        ]),
        uvs: new Float32Array([
            UVTL.x, UVTL.y,
            UVTR.x, UVTR.y,
            UVBL.x, UVBL.y,
            UVBL.x, UVBL.y,
            UVTR.x, UVTR.y,
            UVBR.x, UVBR.y
        ]),
    }
}

const vs = `#version 300 es
precision mediump float;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

layout(location=0) in vec3 aVertexPosition;
layout(location=1) in vec2 aVertexNormal;

// uniform SceneUniforms {
//     mat4 viewProj;
// };

out vec2 outUV;

void main()
{
    outUV = aVertexNormal;

    //  Transformed vertex position
    vec4 vertex = uModelViewMatrix * vec4(aVertexPosition, 1.0);

    //  Final vertex position
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
}
`;

const fs = `#version 300 es
precision highp float;

// layout(std140, column_major) uniform;

// uniform SceneUniforms {
//     mat4 viewProj;
// };

uniform sampler2D tex;

in vec2 outUV;

out vec4 fragColor;

void main() {
    fragColor = texture(tex, outUV);
    // fragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

let app = new WebGL2Renderer(document.getElementById('game') as HTMLCanvasElement);

app.setClearColor(0.2, 0.4, 0, 1);

app.gl.disable(app.gl.CULL_FACE);
app.gl.disable(app.gl.DEPTH_TEST);

let program = app.createProgram(vs, fs);

let quad = createQuad(0, 0, 512, 512);

let positions = app.createVertexBuffer(app.gl.FLOAT, 2, quad.position);
let uvs = app.createVertexBuffer(app.gl.FLOAT, 2, quad.uvs);

let triangleArray = app.createVertexArray().vertexAttributeBuffer(0, positions).vertexAttributeBuffer(1, uvs);

//  WORKING ORTHO:
let projectionMatrix = new Matrix4();
Ortho(projectionMatrix, 0, app.width, app.height, 0, 0, 1000);

//  WORKING PERSPECTIVE (although Scale needs sorting)

/*
let cameraPosition = new Vec3(256, 256, -512);
let lookPosition = new Vec3(256, 256, 0);
let orientation = new Vec3(0, 1, 0);

let viewMatrix = LookAt(cameraPosition, lookPosition, orientation);

let p = Perspective(180, app.width / app.height, 0, 1000);

let projectionMatrix = Multiply(p, viewMatrix);
*/



let modelViewMatrix = new Matrix4();

// console.log(viewProj.getArray());

// let sub = app.createUniformBuffer([
//     app.gl.FLOAT_MAT4
// ]);

// sub.set(0, mvpMatrix.getArray());
// sub.update();

// let modelMatrix = new Matrix4();

let x = 0;
let y = 0;
let z = 0;
let r = 0;
let scaleX = 1;
let scaleY = 1;

//  512 x 512

// let rx = 0;
// let ry = 0;

ImageFile('stone', '../assets/512x512.png').load().then((file) => {

    let t = app.createTexture2D(file.data);

    let drawCall = app.createDrawCall(program, triangleArray)

    drawCall.uniform('uModelViewMatrix', modelViewMatrix.getArray());
    drawCall.uniform('uProjectionMatrix', projectionMatrix.getArray());

    // drawCall.uniformBlock('SceneUniforms', sub);

    drawCall.texture('tex', t);

    function render ()
    {
        modelViewMatrix.identity();

        Translate(modelViewMatrix, x, y, z);
        RotateZ(modelViewMatrix, r);
        Scale(modelViewMatrix, scaleX, scaleY, 1);

        drawCall.uniform('uModelViewMatrix', modelViewMatrix.getArray());

        app.clear();
    
        drawCall.draw();

        requestAnimationFrame(render);
    }

    render();

});
