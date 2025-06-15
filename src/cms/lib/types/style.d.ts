declare global {
    
    type StyleType =
        | "background"
        | "overlay"
        | "size"
        | "text";
    
    type StyleElement =
        | BackgroundStyleElement
        | OverlayStyleElement
        | SizeStyleElement
        | TextStyleElement;

    interface BasestyleElement {
        kind: "style";
        value: string;
    }

    interface BackgroundStyleElement extends BasestyleElement {
        type: "background";
        backgroundColor?: string;
        backgroundImage?: string;
    }

    interface OverlayStyleElement extends BasestyleElement {
        type: "overlay";
        overlayOpacity?: string;
        overlayColor?: string;
        overlayPattern?: string;
        overlayPatternHeight?: string;
    }

    interface SizeStyleElement extends BasestyleElement {
        type: "size";
        width?: string;
        height?: string;
    }

    interface TextStyleElement extends BasestyleElement {
        type: "text";
        textColor?: string;
        fontSize?: string;
        fontWeight?: string;
        textAlign?: "left" | "center" | "right";
    }
}

export {}; 