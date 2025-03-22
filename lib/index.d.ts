import React from "react";
import { Animated, ViewStyle, StyleProp, EasingFunction } from "react-native";
export type AnimationType = "width" | "fade" | "scale" | "slide" | "combo";
export interface PaginationDotsProps {
    /** Total number of dots to display */
    totalDots: number;
    /** Zero-based index of the active dot */
    activeDotIndex: number;
    /**
     * Color for dots (defaults to #0E7AFE)
     * @deprecated Use activeDotColor and inactiveDotColor for more control
     */
    dotColor?: string;
    /**
     * Color for the active dot (takes precedence over dotColor).
     * When only activeDotColor is set, inactiveDotColor defaults to activeDotColor with reduced opacity.
     */
    activeDotColor?: string;
    /** Color for inactive dots */
    inactiveDotColor?: string;
    /** Height for dots (defaults to 8) */
    dotHeight?: number;
    /** Width for inactive dots (defaults to 8) */
    inactiveDotWidth?: number;
    /** Width for active dot (defaults to 24) */
    activeDotWidth?: number;
    /** Border radius for dots (defaults to half of dot height) */
    dotBorderRadius?: number;
    /** Spacing between dots (defaults to 6) */
    dotSpacing?: number;
    /** Animation duration in milliseconds (defaults to 300) */
    animationDuration?: number;
    /**
     * Type of animation to use:
     * - 'width': animate dot width (default)
     * - 'fade': animate dot opacity
     * - 'scale': animate dot size
     * - 'slide': animate dot position
     * - 'combo': combine multiple animation effects
     */
    animationType?: AnimationType;
    /** Animation easing function (defaults to Easing.ease) */
    animationEasing?: EasingFunction;
    /**
     * Use native driver for animations (defaults to false)
     * Note: Some properties can't animate with native driver.
     */
    useNativeDriver?: boolean;
    /** Container style overrides */
    containerStyle?: StyleProp<ViewStyle>;
    /** Dot style overrides */
    dotStyle?: StyleProp<ViewStyle>;
    /**
     * Custom render function for dots.
     * Receives the animated value, index, and animatedStyles calculated for the dot.
     */
    renderDot?: (params: {
        animatedValue: Animated.Value;
        index: number;
        isActive: boolean;
        animatedStyles: any;
    }) => React.ReactNode;
}
declare const _default: React.MemoExoticComponent<({ totalDots, activeDotIndex, containerStyle, dotStyle, dotColor, activeDotColor, inactiveDotColor, dotHeight, inactiveDotWidth, activeDotWidth, dotBorderRadius, dotSpacing, animationDuration, animationEasing, useNativeDriver, animationType, renderDot, }: PaginationDotsProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>>;
export default _default;
