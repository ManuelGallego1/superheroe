import { Image } from 'expo-image';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 28) / 2;

interface Props { hero: any; onPress: () => void; }

export default function HeroCard({ hero, onPress }: Props) {
  const alignment = hero.biography?.alignment;
  const borderColor =
    alignment === 'good' ? COLORS.good :
      alignment === 'bad' ? COLORS.bad :
        COLORS.neutral;

  return (
    <TouchableOpacity style={[styles.card, { borderColor }]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {hero.image?.url ? (
          <Image
            source={{ uri: hero.image.url }}
            style={styles.image}
            contentFit="cover"
            transition={1000}
          />
        ) : (
          <View style={[styles.image, { backgroundColor: COLORS.surfaceLight }]} />
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{hero.name}</Text>
        <Text style={styles.publisher} numberOfLines={1}>
          {hero.biography?.publisher || 'Unknown'}
        </Text>
        <View style={[styles.alignDot, { backgroundColor: borderColor }]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    margin: 4,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    borderWidth: 2,
  },
  imageContainer: { width: '100%', height: CARD_WIDTH * 1.25, backgroundColor: COLORS.surfaceLight },
  image: { width: '100%', height: '100%' },
  info: { padding: 10 },
  name: { color: COLORS.text, fontWeight: 'bold', fontSize: 13 },
  publisher: { color: COLORS.textMuted, fontSize: 11, marginTop: 2 },
  alignDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
});
