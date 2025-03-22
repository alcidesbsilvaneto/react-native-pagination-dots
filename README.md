# React Native Pagination Dots

[![npm version](https://img.shields.io/npm/v/react-native-pagination-dots.svg)](https://www.npmjs.com/package/react-native-pagination-dots)
[![license](https://img.shields.io/npm/l/react-native-pagination-dots.svg)](https://github.com/yourusername/react-native-pagination-dots/blob/master/LICENSE)

A highly customizable, animated pagination dots component for React Native applications. Perfect for carousels, onboarding flows, and any content requiring pagination indicators.

## Features

- 🎨 Fully customizable dot appearance (size, color, shape)
- ✨ Smooth animations with configurable parameters
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
import React, { useState } from 'react';
import { View } from 'react-native';
import PaginationDots from 'react-native-pagination-dots';

const MyCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalDots = 5;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Your carousel/slider component here */}
      
      <PaginationDots
        totalDots={totalDots}
        activeIndex={activeIndex}
      />
    </View>
  );
};

export default MyCarousel;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `totalDots` | `number` | `required` | Total number of pagination dots to display |
| `activeIndex` | `number` | `required` | Index of the currently active dot (0-based) |
| `dotSize` | `number` | `10` | Size of the inactive dots (width and height) |
| `activeDotWidth` | `number` | `20` | Width of the active dot |
| `dotSpacing` | `number` | `8` | Horizontal spacing between dots |
| `dotColor` | `string` | `"#C4C4C4"` | Color of inactive dots |
| `activeDotColor` | `string` | `"#0099FF"` | Color of active dot |
| `dotStyle` | `ViewStyle` | `{}` | Additional style for dots |
| `containerStyle` | `ViewStyle` | `{}` | Style for the container view |
| `dotBorderRadius` | `number` | `5` | Border radius of the dots (for rounded corners) |
| `animationDuration` | `number` | `300` | Duration of the animation in milliseconds |
| `animationEasing` | `(value: number) => number` | `Easing.spring` | Easing function for the animation |
| `renderDot` | `(params: DotRenderProps) => ReactNode` | `undefined` | Custom render function for dots |

### DotRenderProps

When providing a custom dot rendering function, you'll receive the following parameters:

```typescript
interface DotRenderProps {
  index: number;
  isActive: boolean;
  animatedStyle: any; // Animated style object
}
```

## Advanced Examples

### Custom Styling

```jsx
import PaginationDots from 'react-native-pagination-dots';

// Custom styling example
<PaginationDots
  totalDots={5}
  activeIndex={currentIndex}
  dotSize={12}
  activeDotWidth={30}
  dotSpacing={10}
  dotColor="#FF9900"
  activeDotColor="#FF0066"
  dotBorderRadius={6}
  containerStyle={{ marginVertical: 20 }}
/>
```

### Custom Animation

```jsx
import { Easing } from 'react-native-reanimated';
import PaginationDots from 'react-native-pagination-dots';

// Custom animation example
<PaginationDots
  totalDots={5}
  activeIndex={currentIndex}
  animationDuration={500}
  animationEasing={Easing.bezier(0.25, 0.1, 0.25, 1)}
/>
```

### Custom Dot Component

```jsx
import PaginationDots from 'react-native-pagination-dots';

// Custom dot rendering
<PaginationDots
  totalDots={5}
  activeIndex={currentIndex}
  renderDot={({ index, isActive, animatedStyle }) => (
    <View
      style={[
        {
          width: isActive ? 30 : 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: isActive ? '#FF0066' : '#DDDDDD',
          margin: 4,
          transform: [{ scale: isActive ? 1.2 : 1 }]
        },
        animatedStyle
      ]}
    >
      {isActive && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: 'white', position: 'absolute', top: 3, left: 13 }} />}
    </View>
  )}
/>
```

## License

MIT © [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

