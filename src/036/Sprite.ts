import Texture from './Texture';
import Frame from './Frame';
import { Vec2 } from '@phaserjs/math-vec2';
import Scene from 'Scene';
import Vertex from 'Vertex';

export default class Sprite
{
    readonly scene: Scene;

    visible: boolean = true;
    texture: Texture = null;
    frame: Frame = null;

    vertices: Vertex[] = [ new Vertex(), new Vertex(), new Vertex(), new Vertex() ];

    private _size: Vec2 = new Vec2();
    private _position: Vec2 = new Vec2();
    private _scale: Vec2 = new Vec2(1, 1);
    private _skew: Vec2 = new Vec2();
    private _origin: Vec2 = new Vec2(0.5, 0.5);
    private _rotation: number = 0;

    private _alpha: number = 1;
    private _tint: number = 0xffffff;

    private _a: number = 1;
    private _b: number = 0;
    private _c: number = 0;
    private _d: number = 1;
    private _tx: number = 0;
    private _ty: number = 0;

    constructor (scene: Scene, x: number, y: number, texture: string, frame?: string | number)
    {
        this.scene = scene;

        this.setTexture(texture, frame);

        this._position.set(x, y);

        //  Transform.update:
        this._tx = x;
        this._ty = y;
    }

    setTexture (key: string | Texture, frame?: string | number)
    {
        if (key instanceof Texture)
        {
            this.texture = key;
        }
        else
        {
            this.texture = this.scene.textures.get(key);
        }

        return this.setFrame(frame);
    }

    setFrame (key?: string | number)
    {
        this.frame = this.texture.get(key);

        this._size.set(this.frame.width, this.frame.height);

        return this;
    }

    setPosition (x: number, y: number)
    {
        this._position.set(x, y);

        return this;
    }

    setScale (scaleX: number, scaleY: number = scaleX)
    {
        this._scale.set(scaleX, scaleY);

        return this.updateCache();
    }

    setSkew (skewX: number, skewY: number)
    {
        this._skew.set(skewX, skewY);

        return this.updateCache();
    }

    setOrigin (originX: number, originY: number = originX)
    {
        this._origin.set(originX, originY);

        return this;
    }

    setRotation (rotation: number)
    {
        this._rotation = rotation;

        return this.updateCache();
    }

    setAlpha (topLeft: number = 1, topRight: number = topLeft, bottomLeft: number = topLeft, bottomRight: number = topLeft)
    {
        const vertices = this.vertices;

        vertices[0].alpha = topLeft;
        vertices[1].alpha = topRight;
        vertices[2].alpha = bottomLeft;
        vertices[3].alpha = bottomRight;

        return this;
    }

    setTint (topLeft: number = 0xffffff, topRight: number = topLeft, bottomLeft: number = topLeft, bottomRight: number = topLeft)
    {
        const vertices = this.vertices;

        vertices[0].color = topLeft;
        vertices[1].color = topRight;
        vertices[2].color = bottomLeft;
        vertices[3].color = bottomRight;

        return this;
    }

    update ()
    {
        //  Transform.update:

        this._tx = this.x;
        this._ty = this.y;

        //  Update Vertices:

        const w: number = this._size.x;
        const h: number = this._size.y;

        const x0: number = -(this._origin.x * w);
        const x1: number = x0 + w;
        const y0: number = -(this._origin.y * h);
        const y1: number = y0 + h;

        const { _a, _b, _c, _d, _tx, _ty } = this;

        //  Cache the calculations to avoid 8 getX/Y function calls:

        const x0a: number = x0 * _a;
        const x0b: number = x0 * _b;
        const y0c: number = y0 * _c;
        const y0d: number = y0 * _d;

        const x1a: number = x1 * _a;
        const x1b: number = x1 * _b;
        const y1c: number = y1 * _c;
        const y1d: number = y1 * _d;

        const vertices = this.vertices;

        //  top left
        vertices[0].x = x0a + y0c + _tx;
        vertices[0].y = x0b + y0d + _ty;

        //  top right
        vertices[1].x = x1a + y0c + _tx;
        vertices[1].y = x1b + y0d + _ty;

        //  bottom left
        vertices[2].x = x0a + y1c + _tx;
        vertices[2].y = x0b + y1d + _ty;

        //  bottom right
        vertices[3].x = x1a + y1c + _tx;
        vertices[3].y = x1b + y1d + _ty;
    }

    private updateCache ()
    {
        const { _rotation, _skew, _scale } = this;

        this._a = Math.cos(_rotation + _skew.y) * _scale.x;
        this._b = Math.sin(_rotation + _skew.y) * _scale.x;
        this._c = -Math.sin(_rotation - _skew.x) * _scale.y;
        this._d = Math.cos(_rotation - _skew.x) * _scale.y;

        return this;
    }

    set x (value: number)
    {
        this._position.x = value;
    }

    get x (): number
    {
        return this._position.x;
    }

    set y (value: number)
    {
        this._position.y = value;
    }

    get y (): number
    {
        return this._position.y;
    }

    set rotation (value: number)
    {
        this._rotation = value;

        this.updateCache();
    }

    get rotation (): number
    {
        return this._rotation;
    }

    set scaleX (value: number)
    {
        this._scale.x = value;

        this.updateCache();
    }

    get scaleX (): number
    {
        return this._scale.x;
    }

    set scaleY (value: number)
    {
        this._scale.y = value;

        this.updateCache();
    }

    get scaleY (): number
    {
        return this._scale.y;
    }

    set skewX (value: number)
    {
        this._skew.x = value;

        this.updateCache();
    }

    get skewX (): number
    {
        return this._skew.x;
    }

    set skewY (value: number)
    {
        this._skew.y = value;

        this.updateCache();
    }

    get skewY (): number
    {
        return this._skew.y;
    }

    get alpha (): number
    {
        return this._alpha;
    }

    set alpha (value: number)
    {
        this._alpha = value;

        this.setAlpha(value);
    }

    get tint (): number
    {
        return this._tint;
    }

    set tint (value: number)
    {
        this._tint = value;

        this.setTint(value);
    }

}