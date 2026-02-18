import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { TextStyle, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

export function Card({ children, style, className }: CardProps) {
  const cardColor = useColor('card');
  const foregroundColor = useColor('foreground');

  return (
    <View
      className={className}
      style={[
        {
          width: '100%',
          backgroundColor: cardColor,
          borderRadius: BORDER_RADIUS,
          padding: 18,
          shadowColor: foregroundColor,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

export function CardHeader({ children, style, className }: CardHeaderProps) {
  return <View className={className} style={[{ marginBottom: 8 }, style]}>{children}</View>;
}

interface CardTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
  className?: string;
}

export function CardTitle({ children, style, className }: CardTitleProps) {
  return (
    <Text
      className={className}
      variant='title'
      style={[
        {
          marginBottom: 4,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
  className?: string;
}

export function CardDescription({ children, style, className }: CardDescriptionProps) {
  return (
    <Text className={className} variant='caption' style={[style]}>
      {children}
    </Text>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

export function CardContent({ children, style, className }: CardContentProps) {
  return <View className={className} style={[style]}>{children}</View>;
}

interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

export function CardFooter({ children, style, className }: CardFooterProps) {
  return (
    <View
      className={className}
      style={[
        {
          marginTop: 16,
          flexDirection: 'row',
          gap: 8,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
