import { Pressable, PressableProps, Text, View } from 'react-native';

interface Props extends PressableProps {
  children: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'contained' | 'text-only';
  className?: string;
}

const bgColors = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
};

const textColors = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
};

const CustomButton = ({
  children,
  color = 'primary',
  variant = 'contained',
  className,
  onPress,
  onLongPress,
  ...rest
}: Props) => {
  if (variant === 'text-only') {
    return (
      <Pressable
        className={`p-3 active:opacity-70 ${className}`}
        onPress={onPress}
        onLongPress={onLongPress}
        {...rest}
      >
        <Text className={`text-center font-work-medium ${textColors[color]}`}>
          {children}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      className={`p-3 rounded-md active:opacity-90 ${bgColors[color]} ${className}`}
      onPress={onPress}
      onLongPress={onLongPress}
      {...rest}
    >
      <Text className="text-white text-center font-work-medium">{children}</Text>
    </Pressable>
  );
};

export default CustomButton;
