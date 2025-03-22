# React Native Pagination Dots

[![npm version](https://img.shields.io/npm/v/react-native-pagination-dots.svg)](https://www.npmjs.com/package/react-native-pagination-dots)
[![license](https://img.shields.io/npm/l/rn-flexible-dots.svg)](https://github.com/alcidesbsilvaneto/rn-flexible-dots/blob/main/LICENSE)

A highly customizable, animated pagination dots component for React Native applications. Perfect for carousels, onboarding flows, and any content requiring pagination indicators.

## Features

- 🎨 Fully customizable dot appearance (size, color, shape)
- ✨ Multiple animation types: width, fade, scale, slide, or combo
- 📦 Support for custom dot components
- 📱 Works on iOS and Android
- 🔧 Written in TypeScript with complete type definitions
## Installation

```bash
# Using npm
npm install react-native-pagination-dots

# Using yarn
yarn add react-native-pagination-dots
```

## Basic Usage

```jsx
import React, { useState } from "react";
import { View } from "react-native";
import PaginationDots from "react-native-pagination-dots";

const MyCarousel = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const totalDots = 5;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Your carousel/slider component here */}

      <PaginationDots totalDots={totalDots} activeDotIndex={activeDotIndex} />
    </View>
  );
};

export default MyCarousel;
```

## Props

| Prop                | Type                                    | Default         | Description                                     |
| ------------------- | --------------------------------------- | --------------- | ----------------------------------------------- |
| `totalDots`         | `number`                                | `required`      | Total number of pagination dots to display      |
| `activeDotIndex`    | `number`                                | `required`      | Zero-based index of the active dot             |
| `dotColor`          | `string`                                | `"#0E7AFE"`     | Color for dots (deprecated - use activeDotColor and inactiveDotColor instead) |
| `activeDotColor`    | `string`                                | `undefined`     | Color for the active dot (takes precedence over dotColor) |
| `inactiveDotColor`  | `string`                                | `undefined`     | Color for inactive dots (defaults to activeDotColor with reduced opacity if only activeDotColor is set) |
| `dotHeight`         | `number`                                | `8`             | Height for dots                                |
| `inactiveDotWidth`  | `number`                                | `8`             | Width for inactive dots                        |
| `activeDotWidth`    | `number`                                | `24`            | Width for the active dot                       |
| `dotBorderRadius`   | `number`                                | `dotHeight/2`   | Border radius of the dots (for rounded corners) |
| `dotSpacing`        | `number`                                | `6`             | Spacing between dots                           |
| `animationDuration` | `number`                                | `300`           | Duration of the animation in milliseconds       |
| `animationType`     | `"width" \| "fade" \| "scale" \| "slide" \| "combo"` | `"width"` | Type of animation to use                  |
| `animationEasing`   | `EasingFunction`                        | `Easing.ease`   | Animation easing function                        |
| `useNativeDriver`   | `boolean`                               | `false`         | Use native driver for animations (note: some properties can't animate with native driver) |
| `containerStyle`    | `StyleProp<ViewStyle>`                  | `{}`            | Container style overrides                       |
| `dotStyle`          | `StyleProp<ViewStyle>`                  | `{}`            | Dot style overrides                            |
| `renderDot`         | `(params: DotRenderProps) => ReactNode` | `undefined`     | Custom render function for dots                 |

### DotRenderProps

When providing a custom dot rendering function, you'll receive the following parameters:

```typescript
interface DotRenderProps {
  animatedValue: Animated.Value;
  index: number;
  isActive: boolean;
  animatedStyles: any; // Animated styles object
}
```

## Animation Types

The `animationType` prop allows you to choose from several different animation styles:

### width

The default animation type. The active dot expands in width while inactive dots shrink, creating a simple yet effective indicator.

### fade

Inactive dots fade to a lower opacity while the active dot maintains full opacity, creating a subtle visual distinction.

### scale

The active dot scales up in size while inactive dots scale down, creating a dynamic size difference between active and inactive dots.

### slide

Dots slide horizontally to reposition themselves, with the active dot moving to the center of attention. This creates a more dynamic, flowing indicator.

### combo

Combines multiple animation types for a rich, complex animation. The active dot will simultaneously change width, scale, and opacity for maximum visual impact.

## Advanced Examples
### Custom Styling

```jsx
import PaginationDots from "react-native-pagination-dots";

// Custom styling example
<PaginationDots
  totalDots={5}
  activeDotIndex={currentIndex}
  dotHeight={12}
  inactiveDotWidth={12}
  activeDotWidth={30}
  dotSpacing={10}
  activeDotColor="#FF0066"
  inactiveDotColor="#FF9900"
  dotBorderRadius={6}
  containerStyle={{ marginVertical: 20 }}
/>;
```

### Custom Animation

```jsx
import { Easing } from "react-native";
import PaginationDots from "react-native-pagination-dots";

// Custom animation example
<PaginationDots
  totalDots={5}
  activeDotIndex={currentIndex}
  animationType="combo"
  animationDuration={500}
  animationEasing={Easing.bezier(0.25, 0.1, 0.25, 1)}
  useNativeDriver={true}
/>;
```

### Custom Dot Component

```jsx
import PaginationDots from "react-native-pagination-dots";
import { View, Animated } from "react-native";

// Custom dot rendering
<PaginationDots
  totalDots={5}
  activeDotIndex={currentIndex}
  renderDot={({ index, isActive, animatedStyles, animatedValue }) => (
    <Animated.View
      key={`dot-${index}`}
      style={[
        {
          width: isActive ? 30 : 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: isActive ? "#FF0066" : "#DDDDDD",
          margin: 4,
          transform: [{ scale: isActive ? 1.2 : 1 }],
        },
        animatedStyles,
      ]}
    >
      {isActive && (
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: "white",
            position: "absolute",
            top: 3,
            left: 13,
          }}
        />
      )}
    </View>
  )}
/>;
```

## License

MIT © [Alcides Bezerra]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
