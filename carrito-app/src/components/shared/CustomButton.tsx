import { Pressable, PressableProps, Text } from 'react-native';

interface Props extends PressableProps {
  children: string;
  variant?: 'contained' | 'text-only';
  className?: string;
}

const CustomButton = ({ children, variant = 'contained', className = '', ...rest }: Props) => {
  if (variant === 'text-only') {
    return (
      <Pressable className={`p-3 active:opacity-50 ${className}`} {...rest}>
        <Text className="text-center text-black underline">{children}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable className={`p-3 bg-black active:opacity-70 ${className}`} {...rest}>
      <Text className="text-center text-white">{children}</Text>
    </Pressable>
  );
};

export default CustomButton;
