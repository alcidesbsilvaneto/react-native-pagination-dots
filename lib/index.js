"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const PaginationDots = ({ totalDots, activeDotIndex, containerStyle, dotStyle, dotColor = "#0E7AFE", activeDotColor, inactiveDotColor, dotHeight = 8, inactiveDotWidth = 8, activeDotWidth = 24, dotBorderRadius, dotSpacing = 6, animationDuration = 300, animationEasing = react_native_1.Easing.ease, useNativeDriver = false, animationType = "width", renderDot, }) => {
    // Create ref for animated values (one per dot)
    const animatedValues = (0, react_1.useRef)([]);
    // Default border radius: half the dot height (for circular dots)
    const actualBorderRadius = dotBorderRadius !== null && dotBorderRadius !== void 0 ? dotBorderRadius : dotHeight / 2;
    // Determine active and inactive colors
    const finalActiveDotColor = (0, react_1.useMemo)(() => activeDotColor || dotColor, [activeDotColor, dotColor]);
    const finalInactiveDotColor = (0, react_1.useMemo)(() => inactiveDotColor ||
        (activeDotColor ? `${finalActiveDotColor}80` : dotColor), [inactiveDotColor, activeDotColor, finalActiveDotColor, dotColor]);
    // Initialize (or update) animated values when totalDots changes
    (0, react_1.useEffect)(() => {
        if (animatedValues.current.length !== totalDots) {
            animatedValues.current = Array(totalDots)
                .fill(0)
                .map((_, i) => new react_native_1.Animated.Value(i === activeDotIndex ? 1 : 0));
        }
    }, [totalDots, activeDotIndex]);
    // Animate dots when the active index changes
    (0, react_1.useEffect)(() => {
        if (animatedValues.current.length !== totalDots)
            return;
        const animations = animatedValues.current.map((animatedValue, index) => react_native_1.Animated.timing(animatedValue, {
            toValue: index === activeDotIndex ? 1 : 0,
            duration: animationDuration,
            easing: animationEasing,
            useNativeDriver,
        }));
        react_native_1.Animated.parallel(animations).start();
    }, [
        totalDots,
        activeDotIndex,
        animationDuration,
        animationEasing,
        useNativeDriver,
    ]);
    // Return animated styles based on the animation type
    const getAnimatedStyles = (0, react_1.useCallback)((animatedValue, isActive) => {
        const styles = {};
        switch (animationType) {
            case "width":
                styles.width = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [inactiveDotWidth, activeDotWidth],
                });
                styles.backgroundColor = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [finalInactiveDotColor, finalActiveDotColor],
                });
                break;
            case "fade":
                styles.width = isActive ? activeDotWidth : inactiveDotWidth;
                styles.opacity = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                });
                styles.backgroundColor = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [finalInactiveDotColor, finalActiveDotColor],
                });
                break;
            case "scale": {
                const scaleValue = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.3],
                });
                styles.width = isActive ? activeDotWidth : inactiveDotWidth;
                styles.transform = [{ scale: scaleValue }];
                styles.backgroundColor = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [finalInactiveDotColor, finalActiveDotColor],
                });
                break;
            }
            case "slide": {
                const translateY = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -5],
                });
                styles.width = isActive ? activeDotWidth : inactiveDotWidth;
                styles.transform = [{ translateY }];
                styles.backgroundColor = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [finalInactiveDotColor, finalActiveDotColor],
                });
                break;
            }
            case "combo": {
                const comboScale = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                });
                const comboTranslateY = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -3],
                });
                styles.width = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [inactiveDotWidth, activeDotWidth],
                });
                styles.opacity = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.7, 1],
                });
                styles.transform = [
                    { scale: comboScale },
                    { translateY: comboTranslateY },
                ];
                styles.backgroundColor = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [finalInactiveDotColor, finalActiveDotColor],
                });
                break;
            }
            default:
                styles.width = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [inactiveDotWidth, activeDotWidth],
                });
                styles.backgroundColor = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [finalInactiveDotColor, finalActiveDotColor],
                });
        }
        return styles;
    }, [
        animationType,
        inactiveDotWidth,
        activeDotWidth,
        finalInactiveDotColor,
        finalActiveDotColor,
    ]);
    // Default renderer for a dot
    const defaultRenderDot = (0, react_1.useCallback)(({ index, isActive, animatedStyles, }) => (react_1.default.createElement(react_native_1.Animated.View, { key: `dot-${index}`, style: [
            {
                height: dotHeight,
                borderRadius: actualBorderRadius,
                marginHorizontal: dotSpacing / 2,
            },
            dotStyle,
            animatedStyles,
        ], accessibilityRole: "image", accessibilityLabel: isActive ? `Page ${index + 1}, current page` : `Page ${index + 1}` })), [dotHeight, actualBorderRadius, dotSpacing, dotStyle]);
    // Generate the dots array, using a custom renderer if provided
    const dots = (0, react_1.useMemo)(() => {
        return Array(totalDots)
            .fill(0)
            .map((_, index) => {
            const animatedValue = animatedValues.current[index] ||
                new react_native_1.Animated.Value(index === activeDotIndex ? 1 : 0);
            const isActive = index === activeDotIndex;
            const animatedStyles = getAnimatedStyles(animatedValue, isActive);
            return renderDot
                ? renderDot({ animatedValue, index, isActive, animatedStyles })
                : defaultRenderDot({
                    animatedValue,
                    index,
                    isActive,
                    animatedStyles,
                });
        });
    }, [
        totalDots,
        activeDotIndex,
        getAnimatedStyles,
        renderDot,
        defaultRenderDot,
    ]);
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, containerStyle] }, dots));
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
});
exports.default = react_1.default.memo(PaginationDots);
//# sourceMappingURL=index.js.map