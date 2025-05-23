declare global {
    
    type StyleType =
        | "backgroundColor"
        | "backgroundImage"
        | "backgroundOverlay"
        | "textColor"
        | "height"
        | "layout"
        | "waveOverlay";
    
    type StyleElement =
        | BackgroundColorElement
        | BackgroundImageElement
        | TextColorElement
        | HeightElement
        | LayoutElement;

    interface BasestyleElement {
        kind: "style";
        value: string;
    }

    interface BackgroundColorElement extends BasestyleElement {
        type: "backgroundColor";
    }

    interface BackgroundImageElement extends BasestyleElement {
        type: "backgroundImage";
    }

    interface TextColorElement extends BasestyleElement {
        type: "textColor";
    }

    interface HeightElement extends BasestyleElement {
        type: "height";
    }

    interface LayoutElement extends BasestyleElement {
        type: "layout";
    }
    interface WaveOverlayElement extends BasestyleElement {
        type: "waveOverlay";
    }

    interface BackgroundOverlayElement extends BasestyleElement {
        type: "backgroundOverlay";
    }
}

export {}; 