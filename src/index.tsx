import React, { useRef, useEffect, useMemo, useCallback } from "react";
import { View, Animated, StyleSheet, ViewStyle, Easing } from "react-native";

/**
 * Props for the PaginationDots component
 */
export interface PaginationDotsProps {
  /**
   * Total number of dots to display
   */
  totalDots: number;
  
  /**
   * Zero-based index of the active dot
   */
  activeDotIndex: number;
  
  /**
   * Container style overrides
   */
  containerStyle?: ViewStyle;
  
  /**
   * Dot style overrides
   */
  dotStyle?: ViewStyle;
  
  /**
   * Color for dots (defaults to #0E7AFE)
   */
  dotColor?: string;
  
  /**
   * Height for dots (defaults to 8)
   */
  dotHeight?: number;
  
  /**
   * Width for inactive dots (defaults to 8)
   */
  inactiveDotWidth?: number;
  
  /**
   * Width for active dot (defaults to 24)
   */
  activeDotWidth?: number;
  
  /**
   * Border radius for dots (defaults to half of dot height)
   */
  dotBorderRadius?: number;
  
  /**
   * Spacing between dots (defaults to 6)
   */
  dotSpacing?: number;
  
  /**
   * Animation duration in milliseconds (defaults to 300)
   */
  animationDuration?: number;
  
  /**
   * Animation easing function (defaults to Easing.ease)
   */
  animationEasing?: Animated.EasingFunction;
  
  /**
   * Use native driver for animations (defaults to false)
   * Note: Some properties can't animate with native driver
   */
  useNativeDriver?: boolean;
  
  /**
   * Custom render function for dots
   * Receives the animated value, index, and whether the dot is active
   */
  renderDot?: (params: {
    animatedValue: Animated.Value;
    index: number;
    isActive: boolean;
    width: Animated.AnimatedInterpolation;
  }) => React.ReactNode;
}

/**
 * PaginationDots component
 * 
 * A customizable pagination dots component for React Native.
 * Displays a row of dots with the active dot having a different appearance.
 * Supports customization of appearance, animation, and rendering.
 * 
 * @example
 * ```tsx
 * <PaginationDots
 *   totalDots={5}
 *   activeDotIndex={currentPage}
 *   dotColor="#ff0000"
 *   activeDotWidth={30}
 * />
 * ```
 */
const PaginationDots: React.FC<PaginationDotsProps> = ({
  totalDots,
  activeDotIndex,
  containerStyle,
  dotStyle,
  dotColor = "#0E7AFE",
  dotHeight = 8,
  inactiveDotWidth = 8,
  activeDotWidth = 24,
  dotBorderRadius,
  dotSpacing = 6,
  animationDuration = 300,
  animationEasing = Easing.ease,
  useNativeDriver = false,
  renderDot,
}) => {
  // Create ref for animated values
  const animatedValues = useRef<Animated.Value[]>([]);
  
  // Calculate actual border radius - default to half the dot height (circular dots)
  const actualBorderRadius = dotBorderRadius ?? dotHeight / 2;
  
  // Handle changes in totalDots by resetting animated values when needed
  useEffect(() => {
    // Initialize or resize animated values array when totalDots changes
    if (animatedValues.current.length !== totalDots) {
      animatedValues.current = Array(totalDots)
        .fill(0)
        .map((_, i) => new Animated.Value(i === activeDotIndex ? 1 : 0));
    }
  }, [totalDots, activeDotIndex]);
  
  // Create animations when active index changes
  useEffect(() => {
    // Ensure we have the correct number of animated values
    if (animatedValues.current.length !== totalDots) {
      return;
    }
    
    // Animate all dots
    const animations = animatedValues.current.map((animatedValue, index) => {
      return Animated.timing(animatedValue, {
        toValue: index === activeDotIndex ? 1 : 0,
        duration: animationDuration,
        easing: animationEasing,
        useNativeDriver,
      });
    });
    
    // Run all animations in parallel
    Animated.parallel(animations).start();
  }, [totalDots, activeDotIndex, animationDuration, animationEasing, useNativeDriver]);
  
  // Memoized dot styles to prevent unnecessary rerenders
  const dotBaseStyle = useMemo(() => ({
    height: dotHeight,
    borderRadius: actualBorderRadius,
    backgroundColor: dotColor,
    marginHorizontal: dotSpacing / 2,
  }), [dotHeight, actualBorderRadius, dotColor, dotSpacing]);
  
  // Default dot renderer
  const defaultRenderDot = useCallback(({
    animatedValue,
    index,
    isActive,
    width,
  }: {
    animatedValue: Animated.Value;
    index: number;
    isActive: boolean;
    width: Animated.AnimatedInterpolation;
  }) => (
    <Animated.View
      key={index}
      style={[
        dotBaseStyle,
        dotStyle,
        { width },
      ]}
      accessibilityRole="image"
      accessibilityLabel={isActive ? `Page ${index + 1}, current page` : `Page ${index + 1}`}
    />
  ), [dotBaseStyle, dotStyle]);
  
  return (
    <View style={[styles.container, containerStyle]}>
      {Array(totalDots).fill(0).map((_, index) => {
        const animatedValue = animatedValues.current[index] || new Animated.Value(index === activeDotIndex ? 1 : 0);
        
        // Interpolate width based on animated value
        const width = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [inactiveDotWidth, activeDotWidth],
        });
        
        const isActive = index === activeDotIndex;
        
        // Use custom renderer if provided, otherwise use default
        return renderDot 
          ? renderDot({ animatedValue, index, isActive, width })
          : defaultRenderDot({ animatedValue, index, isActive, width });
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default React.memo(PaginationDots);
