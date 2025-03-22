import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  ReactElement,
} from "react";
import {
  View,
  Animated,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Easing,
  EasingFunction,
} from "react-native";

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

const PaginationDots = ({
  totalDots,
  activeDotIndex,
  containerStyle,
  dotStyle,
  dotColor = "#0E7AFE",
  activeDotColor,
  inactiveDotColor,
  dotHeight = 8,
  inactiveDotWidth = 8,
  activeDotWidth = 24,
  dotBorderRadius,
  dotSpacing = 6,
  animationDuration = 300,
  animationEasing = Easing.ease,
  useNativeDriver = false,
  animationType = "width",
  renderDot,
}: PaginationDotsProps): ReactElement => {
  // Create ref for animated values (one per dot)
  const animatedValues = useRef<Animated.Value[]>([]);

  // Default border radius: half the dot height (for circular dots)
  const actualBorderRadius = dotBorderRadius ?? dotHeight / 2;

  // Determine active and inactive colors
  const finalActiveDotColor = useMemo(
    () => activeDotColor || dotColor,
    [activeDotColor, dotColor],
  );
  const finalInactiveDotColor = useMemo(
    () =>
      inactiveDotColor ||
      (activeDotColor ? `${finalActiveDotColor}80` : dotColor),
    [inactiveDotColor, activeDotColor, finalActiveDotColor, dotColor],
  );

  // Initialize (or update) animated values when totalDots changes
  useEffect(() => {
    if (animatedValues.current.length !== totalDots) {
      animatedValues.current = Array(totalDots)
        .fill(0)
        .map((_, i) => new Animated.Value(i === activeDotIndex ? 1 : 0));
    }
  }, [totalDots, activeDotIndex]);

  // Animate dots when the active index changes
  useEffect(() => {
    if (animatedValues.current.length !== totalDots) return;

    const animations = animatedValues.current.map((animatedValue, index) =>
      Animated.timing(animatedValue, {
        toValue: index === activeDotIndex ? 1 : 0,
        duration: animationDuration,
        easing: animationEasing,
        useNativeDriver,
      }),
    );
    Animated.parallel(animations).start();
  }, [
    totalDots,
    activeDotIndex,
    animationDuration,
    animationEasing,
    useNativeDriver,
  ]);

  // Return animated styles based on the animation type
  const getAnimatedStyles = useCallback(
    (animatedValue: Animated.Value, isActive: boolean) => {
      const styles: any = {};

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
    },
    [
      animationType,
      inactiveDotWidth,
      activeDotWidth,
      finalInactiveDotColor,
      finalActiveDotColor,
    ],
  );

  // Default renderer for a dot
  const defaultRenderDot = useCallback(
    ({
      index,
      isActive,
      animatedStyles,
    }: {
      animatedValue: Animated.Value;
      index: number;
      isActive: boolean;
      animatedStyles: any;
    }) => (
      <Animated.View
        key={`dot-${index}`}
        style={[
          {
            height: dotHeight,
            borderRadius: actualBorderRadius,
            marginHorizontal: dotSpacing / 2,
          },
          dotStyle,
          animatedStyles,
        ]}
        accessibilityRole="image"
        accessibilityLabel={
          isActive ? `Page ${index + 1}, current page` : `Page ${index + 1}`
        }
      />
    ),
    [dotHeight, actualBorderRadius, dotSpacing, dotStyle],
  );

  // Generate the dots array, using a custom renderer if provided
  const dots = useMemo(() => {
    return Array(totalDots)
      .fill(0)
      .map((_, index) => {
        const animatedValue =
          animatedValues.current[index] ||
          new Animated.Value(index === activeDotIndex ? 1 : 0);
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

  return (
    // @ts-ignore
    <View style={[styles.container, containerStyle]}>{dots}</View> as ReactElement
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default React.memo(PaginationDots);
