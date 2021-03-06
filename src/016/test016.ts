import { WebGL2Renderer } from '@phaserjs/renderer-webgl2';
import { ImageFile } from '@phaserjs/loader-filetypes';

const vs = `#version 300 es

layout(location=0) in vec2 inPosition;
layout(location=1) in vec2 inUV;

out vec2 uv;
out vec2 pos;

void main() {
    uv = inUV;
    pos = inPosition;
    gl_Position = vec4(inPosition, 1.0, 1.0);
}
`;

const fs = `#version 300 es
precision highp float;

in vec2 uv;
in vec2 pos;

uniform sampler2D tex;

out vec4 fragColor;

void main() {
    // fragColor = texture(tex, uv);
    // fragColor = vec4(0.5, 1.0, 0.0, 1.0);
    fragColor = vec4((pos.x * 0.5 + 0.5), (pos.y * 0.5 + 0.5), 0.2, 1.0);
}
`;

let app = new WebGL2Renderer(document.getElementById('game') as HTMLCanvasElement);

app.setClearColor(0.2, 0.2, 0.2, 1);

let program = app.createProgram(vs, fs);

//  512 per row
//  512 * 128 = 65536
//  512 * 256 = 131072
//  512 * 512 = 262144

const row = 512;
const max = row * 512;

console.log(max, 'sprites');

let width = 2;
let height = 2;

const UV0 = { x: 0, y: 0 };
const UV1 = { x: 0, y: 1 };
const UV2 = { x: 1, y: 1 };
const UV3 = { x: 1, y: 0 };

const data = [];
const ibo = [];

let offset = 0;
let x = 0;
let y = 0;

for (let i = 0; i < max; i++)
{
    // let x = Math.abs(Math.random() * (app.width - width));
    // let y = Math.abs(Math.random() * (app.height - height));
    
    let TL = app.getXY(x, y);
    let TR = app.getXY(x + width, y);
    let BL = app.getXY(x, y + height);
    let BR = app.getXY(x + width, y + height);

    data.push(
        TL.x, TL.y,
        UV0.x, UV0.y,

        BL.x, BL.y,
        UV1.x, UV1.y,

        BR.x, BR.y,
        UV2.x, UV2.y,

        BR.x, BR.y,
        UV2.x, UV2.y,

        TR.x, TR.y,
        UV3.x, UV3.y,

        TL.x, TL.y,
        UV0.x, UV0.y
    );

    // ibo.push(
    //     offset, offset + 1, offset + 2, offset + 2, offset + 3, offset
    // );

    offset += 4;

    x += width;

    if (x === (app.width))
    {
        x = 0;
        y += height;
    }
}

const size = 4;

//  Interleaved Buffer Test + Index Buffer

let buffer = app.createInterleavedBuffer(size * 4, new Float32Array(data));

// let indices = app.createIndexBuffer(app.gl.UNSIGNED_SHORT, 3, new Uint32Array(ibo));

let vertexArray = app.createVertexArray();

vertexArray.vertexAttributeBuffer(0, buffer, {
    type: app.gl.FLOAT,
    size: 2,
    offset: 0,
    stride: size * 4
});

vertexArray.vertexAttributeBuffer(1, buffer, {
    type: app.gl.FLOAT,
    size: 2,
    offset: size * 2,
    stride: size * 4
});

// vertexArray.indexBuffer(indices);

ImageFile('stone', '../assets/2x2.png').load().then((file) => {

    let texture = app.createTexture2D(file.data, width, height, { flipY: false });

    let drawCall = app.createDrawCall(program, vertexArray).texture('tex', texture);

    console.log(vertexArray);
    console.log(drawCall);

    function render ()
    {
        app.clear();
        
        // for (let i = 0; i < max / batchSize; i++)
        // {
            // drawCall.drawRanges([ i * (batchSize - 1), batchSize ]);
            // drawCall.draw();
        // }

        // drawCall.drawRanges([ 0, (512 * 256) * 6 ]);
        drawCall.draw();

        // drawCall.drawRanges([ (512 * 256) * 6, (512 * 256) * 6 ]);
        // drawCall.draw();

        requestAnimationFrame(render);
    }

    render();

});
