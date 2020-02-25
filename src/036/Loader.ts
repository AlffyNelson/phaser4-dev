import File from './File';
import Game from 'Game';
import Texture from 'Texture';

export default class Loader
{
    game: Game;

    baseURL: string = '';
    path: string = '';
    crossOrigin: string | undefined = undefined;

    maxParallelDownloads: number = 32;

    isLoading: boolean = false;

    queue: File[];
    inflight: Map<string, File>;

    onComplete: Function;

    constructor (game: Game)
    {
        this.game = game;

        this.reset();
    }

    reset ()
    {
        this.isLoading = false;
        this.queue = [];
        this.inflight = new Map();
    }

    start (onComplete: Function)
    {
        if (this.isLoading)
        {
            return;
        }

        // console.log('Loader.start', this.totalFilesToLoad());

        if (this.queue.length > 0)
        {
            this.isLoading = true;

            this.onComplete = onComplete;

            this.nextFile();
        }
        else
        {
            onComplete();
        }
    }

    nextFile ()
    {
        // let total: number = this.inflight.size;

        let total = this.queue.length;

        if (total)
        {
            //  One at a time ...
            let file = this.queue.shift();

            this.inflight.set(file.url, file);

            // console.log('Loader.nextFile', file.key, file.url);

            file.loadHandler(file);
        }
        else if (this.inflight.size === 0)
        {
            this.stop();
        }
    }

    stop ()
    {
        this.isLoading = false;

        this.onComplete();
    }

    fileComplete (file: File)
    {
        this.inflight.delete(file.url);

        this.nextFile();
    }

    fileError (file: File)
    {
        this.inflight.delete(file.url);

        this.nextFile();
    }

    totalFilesToLoad (): number
    {
        return this.queue.length + this.inflight.size;
    }

    image (key: string, url?: string)
    {
        let file = new File(key, this.getURL(key, url, '.png'), (file: File) => this.imageTagLoader(file));

        this.queue.push(file);

        return this;
    }

    imageTagLoader (file: File)
    {
        // console.log('Loader.imageTagLoader', file.key);
        // console.log(this);

        file.data = new Image();

        if (this.crossOrigin)
        {
            file.data.crossOrigin = this.crossOrigin;
        }

        file.data.onload = () => {

            // console.log('File.data.onload', file.key);

            file.data.onload = null;
            file.data.onerror = null;
            file.hasLoaded = true;

            this.game.textures.set(file.key, new Texture(file.key, file.data));

            this.fileComplete(file);

        };

        file.data.onerror = () => {

            // console.log('File.data.onerror', file.key);

            file.data.onload = null;
            file.data.onerror = null;
            file.hasLoaded = true;

            this.fileError(file);

        };

        file.data.src = file.url;

        //  Image is cached / available immediately
        if (file.data.complete && file.data.width && file.data.height)
        {
            file.data.onload = null;
            file.data.onerror = null;
            file.hasLoaded = true;

            this.game.textures.set(file.key, new Texture(file.key, file.data));

            this.fileComplete(file);
        }
    }

    getURL (key: string, url: string, extension: string)
    {
        if (!url)
        {
            url = key + extension;
        }

        return this.baseURL + this.path + url;
    }

    setBaseURL (url: string)
    {
        if (url !== '' && url.substr(-1) !== '/')
        {
            url = url.concat('/');
        }

        this.baseURL = url;

        return this;
    }

    setPath (path: string)
    {
        if (path !== '' && path.substr(-1) !== '/')
        {
            path = path.concat('/');
        }

        this.path = path;

        return this;
    }

    setCORS (crossOrigin)
    {
        this.crossOrigin = crossOrigin;

        return this;
    }

}
